import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  // TODO: Validate webhook signature per PayPal docs
  // Process event types as needed
  return NextResponse.json({ status: 'received' });
}
