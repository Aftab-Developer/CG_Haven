import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import cookie from 'cookie';
import dotenv from 'dotenv';

dotenv.config();


export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
  }

  const signature = req.headers.get('x-patreon-signature');
  const payload = await req.json() ?? await req.text;

  // Verify the signature to ensure it's from Patreon
  const expectedSignature = crypto
    .createHmac('md5', process.env.PATREON_WEBHOOK_SECRET!)
    .update(JSON.stringify(payload))
    .digest('hex');

  if (signature !== expectedSignature) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  if (payload.type === 'members:pledge:create' || payload.type === 'members:pledge:update') {
    const subscriptionId = payload.data.id;

    // Set a cookie for the user
    const response = NextResponse.json({ message: 'Subscription processed' });
    response.headers.set('Set-Cookie', cookie.serialize('subscription', subscriptionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    }));

    return response;
  }

  if (payload.type === 'members:pledge:delete') {
    // Remove the cookie for the user
    const response = NextResponse.json({ message: 'Subscription ended' });
    response.headers.set('Set-Cookie', cookie.serialize('subscription', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: -1, // Expire the cookie immediately
      path: '/',
    }));

    return response;
  }

  return NextResponse.json({ message: 'Invalid event type' }, { status: 400 });
}