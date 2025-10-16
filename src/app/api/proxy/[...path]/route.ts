import { NextResponse } from 'next/server';

const HOP_BY_HOP_HEADERS = new Set([
  'connection',
  'keep-alive',
  'proxy-authenticate',
  'proxy-authorization',
  'te',
  'trailer',
  'transfer-encoding',
  'upgrade',
]);

export async function GET(req: Request) {
  return proxyRequest(req);
}
export async function POST(req: Request) {
  return proxyRequest(req);
}
export async function PUT(req: Request) {
  return proxyRequest(req);
}
export async function PATCH(req: Request) {
  return proxyRequest(req);
}
export async function DELETE(req: Request) {
  return proxyRequest(req);
}

async function proxyRequest(req: Request) {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://plasmida.onrender.com';

    const incomingUrl = new URL(req.url);
    // remove the '/api/proxy' prefix
    const forwardPath = incomingUrl.pathname.replace(/^\/api\/proxy/, '');
    const targetUrl = API_URL.replace(/\/$/, '') + forwardPath + incomingUrl.search;

    // Build headers to forward, but avoid host and hop-by-hop headers
    const outHeaders: Record<string, string> = {};
    req.headers.forEach((value, key) => {
      if (key.toLowerCase() === 'host') return;
      if (HOP_BY_HOP_HEADERS.has(key.toLowerCase())) return;
      outHeaders[key] = value;
    });

    // Perform the fetch to backend
    const backendRes = await fetch(targetUrl, {
      method: req.method,
      headers: outHeaders as any,
      body: req.method === 'GET' || req.method === 'HEAD' ? undefined : req.body,
      redirect: 'manual',
    });

    // Build response headers
    const resHeaders: Record<string, string> = {};
    backendRes.headers.forEach((value, key) => {
      if (HOP_BY_HOP_HEADERS.has(key.toLowerCase())) return;
      resHeaders[key] = value;
    });

    const body = await backendRes.arrayBuffer();

    return new Response(body, {
      status: backendRes.status,
      headers: resHeaders,
    });
  } catch (err) {
    console.error('Proxy error:', err);
    return NextResponse.json({ message: 'Proxy internal error' }, { status: 500 });
  }
}
