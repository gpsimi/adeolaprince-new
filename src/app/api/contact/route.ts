import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // TODO: Integrate with your email provider, Zapier, or backend.
    // For now we just log the payload on the server.
    console.log('Contact submission:', data);

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
