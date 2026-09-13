import assert from 'node:assert/strict';
import test from 'node:test';
import { handleLeadRequest } from '../lib/inquiries/endpoint.ts';
import { createLeadSender } from '../lib/inquiries/send-lead.ts';
import { verifyLeadChallenge } from '../lib/inquiries/request-security.ts';

const origin = 'https://example.com';
const payload = () => ({
  kind: 'quote', request_id: crypto.randomUUID(), token: 'valid-test-token', website: '', project: 'lead-intake-workspace',
  values: { name: ' Test Person ', email: 'test@example.com', company: 'Example Business', country: 'Japan', phone: '', service: 'Website', template: 'studio-launch', description: 'A practical website with an enquiry workflow.', budget: 'Need guidance', timeline: 'Flexible' },
});
const request = (body, headers = {}) => new Request(origin+'/api/leads', { method: 'POST', headers: { origin, 'content-type': 'application/json', ...headers }, body: JSON.stringify(body) });
function setup(overrides = {}) {
  const saved = [], logs = [];
  const dependencies = {
    enabled: true, origins: [origin], verify: async () => {},
    resolveTemplate: async () => 'd671da27-0eaa-4268-8cbe-64dc242b93d8', projectExists: async () => true,
    save: async row => { saved.push(row); return { error: null }; }, log: event => logs.push(event), ...overrides,
  };
  return { dependencies, saved, logs };
}

test('valid quote is saved with trusted source and resolved template ID before confirmation', async () => {
  const { dependencies, saved } = setup(); const input = payload();
  const response = await handleLeadRequest(request(input), dependencies);
  assert.equal(response.status, 201); assert.deepEqual(await response.json(), {success:true});
  assert.equal(saved.length,1); assert.equal(saved[0].name,'Test Person');
  assert.equal(saved[0].source,'get-quote'); assert.equal(saved[0].template_id,'d671da27-0eaa-4268-8cbe-64dc242b93d8');
  assert.equal(saved[0].project_slug,'lead-intake-workspace'); assert.equal(saved[0].request_id,input.request_id);
  assert.equal(saved[0].phone,null); assert.ok(!('token' in saved[0])); assert.ok(!('status' in saved[0]));
});

test('server rejects empty required fields, invalid email and long text without writing', async () => {
  for (const [key,value] of Object.entries({name:'',email:'bad-email',company:'',country:'',service:'',description:'x'.repeat(3001),budget:'',timeline:''})) {
    const {dependencies,saved}=setup(); const input=payload(); input.values[key]=value;
    assert.equal((await handleLeadRequest(request(input),dependencies)).status,400,key); assert.equal(saved.length,0,key);
  }
});

test('unavailable database gives understandable error and sanitized diagnostics', async () => {
  const {dependencies,logs}=setup({save:async()=>({error:{code:'08006',message:'SECRET database connection with test@example.com'}})});
  const response=await handleLeadRequest(request(payload()),dependencies);
  assert.equal(response.status,503); assert.match((await response.json()).error,/could not confirm/i);
  assert.equal(logs[0].stage,'database'); assert.equal(logs[0].code,'08006');
  assert.doesNotMatch(JSON.stringify(logs),/SECRET|test@example|valid-test-token/);
});

test('backend network failure does not leak provider error or confirm a save', async () => {
  const {dependencies,logs}=setup({save:async()=>{throw new Error('SECRET network failure')}});
  const response=await handleLeadRequest(request(payload()),dependencies);
  assert.equal(response.status,503); assert.doesNotMatch(await response.text(),/SECRET/);
  assert.equal(logs[0].code,'UPSTREAM_FAILURE');
});

test('unconfigured delivery, invalid origin, oversized body and forged fields fail closed', async () => {
  const {dependencies,saved}=setup();
  assert.equal((await handleLeadRequest(request(payload()),{...dependencies,enabled:false})).status,503);
  assert.equal((await handleLeadRequest(request(payload(),{origin:'https://attacker.example'}),dependencies)).status,403);
  assert.equal((await handleLeadRequest(request({data:'x'.repeat(20000)}),dependencies)).status,413);
  assert.equal((await handleLeadRequest(request({...payload(),status:'qualified',source:'admin'}),dependencies)).status,400);
  assert.equal(saved.length,0);
});

test('invalid template, project, honeypot and rate limit are handled without false confirmation', async () => {
  let context=setup({resolveTemplate:async()=>null});
  assert.equal((await handleLeadRequest(request(payload()),context.dependencies)).status,400);
  context=setup({projectExists:async()=>false});
  assert.equal((await handleLeadRequest(request(payload()),context.dependencies)).status,400);
  context=setup();
  assert.equal((await handleLeadRequest(request({...payload(),website:'bot'}),context.dependencies)).status,400);
  assert.equal(context.saved.length,0);
  context=setup({save:async()=>({error:{code:'P0001',message:'lead_rate_limit'}})});
  const response=await handleLeadRequest(request(payload()),context.dependencies);
  assert.equal(response.status,429); assert.equal(response.headers.get('retry-after'),'3600');
});

test('client coalesces duplicate rapid submits and sends one request', async () => {
  let calls=0, release;
  const gate=new Promise(resolve=>{release=resolve});
  const send=createLeadSender(async()=>{calls++;await gate;return Response.json({success:true},{status:201})});
  const input=payload(); const first=send(input), second=send(input);
  assert.equal(first,second); assert.equal(calls,1); release(); await first;
});

test('client retains retry identity on network failure and never accepts false success', async () => {
  const ids=[]; let calls=0;
  const send=createLeadSender(async(_url,init)=>{ids.push(JSON.parse(init.body).request_id);if(calls++===0)throw new Error('offline');return Response.json({success:true},{status:201})});
  const input=payload(); await assert.rejects(send(input),/connection failed/); await send(input); assert.deepEqual(ids,[input.request_id,input.request_id]);
  await assert.rejects(createLeadSender(async()=>Response.json({error:'Please retry'},{status:503}))(input),/Please retry/);
  await assert.rejects(createLeadSender(async()=>Response.json({success:false}))(input),/could not confirm/);
});

test('Turnstile validates success, hostname and action on the backend', async () => {
  const verify=(result)=>verifyLeadChallenge('test-token','not-a-real-secret',origin,async()=>Response.json(result));
  await verify({success:true,hostname:'example.com',action:'lead'});
  for(const result of [{success:false},{success:true,hostname:'evil.example',action:'lead'},{success:true,hostname:'example.com',action:'other'}]) await assert.rejects(verify(result),/security check/);
});
