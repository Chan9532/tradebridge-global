// Preserve the complete query string from previously shared quote URLs.
export function GET(request: Request) {
  const destination = new URL(request.url);
  destination.pathname = "/get-quote";
  return Response.redirect(destination, 307);
}
