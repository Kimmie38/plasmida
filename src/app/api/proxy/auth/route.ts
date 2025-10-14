import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://plasmida.onrender.com';
    const target = `${API_URL.replace(/\/$/, '')}/api/v1/plasmida/auth/login`;

    const body = await req.text();

    const res = await fetch(target, {
      method: 'POST',
      headers: {
        'Content-Type': req.headers.get('content-type') || 'application/json',
      },
      body,
    });

    const responseText = await res.text();
    const contentType = res.headers.get('content-type') || 'text/plain';

    return new Response(responseText, {
      status: res.status,
      headers: { 'Content-Type': contentType },
    });
  } catch (err) {
    console.error('Proxy error:', err);
    return new Response(JSON.stringify({ message: 'Proxy error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
