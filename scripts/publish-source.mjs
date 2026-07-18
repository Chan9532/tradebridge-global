import fs from "node:fs";
import path from "node:path";
import git from "isomorphic-git";
import http from "isomorphic-git/http/node";

const dir = process.cwd();
const url = process.env.SITES_REMOTE_URL;
const token = process.env.SITES_SOURCE_TOKEN;
if (!url || !token) throw new Error("Sites source credentials are required.");

if (!fs.existsSync(path.join(dir, ".git"))) await git.init({ fs, dir, defaultBranch: "main" });
const matrix = await git.statusMatrix({ fs, dir });
for (const [filepath, head, worktree] of matrix) {
  if (worktree === 0) await git.remove({ fs, dir, filepath });
  else if (head !== worktree) await git.add({ fs, dir, filepath });
}
const sha = await git.commit({ fs, dir, message: "Build TradeBridge Global platform", author: { name: "Codex", email: "codex@openai.com" } });
await git.push({ fs, http, dir, url, ref: "main", remoteRef: "main", force: true, httpHeaders: { Authorization: `Bearer ${token}` } });
process.stdout.write(sha);
