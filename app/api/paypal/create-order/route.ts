import { NextRequest, NextResponse } from 'next/server';

const PAYPAL_API = process.env.PAYPAL_ENV === 'live'
  ? 'https://api-m.paypal.com'
  : 'https://api-m.sandbox.paypal.com';

async function getAccessToken() {
  const auth = Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`).toString('base64');
  const res = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });
  const data = await res.json();
  return data.access_token;
}

export async function POST(req: NextRequest) {
  try {
    const { amount, description, custom_id } = await req.json();
    if (!amount || !description || !custom_id) {
      return NextResponse.json({ error: 'Missing required fields: amount, description, or custom_id.' }, { status: 400 });
    }
    if (!process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_SECRET) {
      return NextResponse.json({ error: 'PayPal credentials are not set in environment variables.' }, { status: 500 });
    }
    const accessToken = await getAccessToken();
    const orderRes = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: amount,
            },
            description,
            custom_id,
          },
        ],
      }),
    });
    if (!orderRes.ok) {
      const text = await orderRes.text();
      return NextResponse.json({ error: 'PayPal API error', details: text }, { status: orderRes.status });
    }
    const order = await orderRes.json();
    return NextResponse.json(order);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Unknown error in create-order API.' }, { status: 500 });
  }
}

// Define PRICE and print or receive them as parameters
const createOrder = async (data: any, actions: any) => {
  const PRICE = data?.price ?? 10.00; // fallback to 10.00 if not provided
  const print = data?.print ?? { title: '', id: '' }; // fallback if not provided

  const res = await fetch('/api/paypal/create-order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      amount: PRICE.toFixed(2),
      description: print.title,
      custom_id: print.id.toString(),
    }),
  });
  const order = await res.json();
  return order.id; // PayPal expects just the order ID string
};
