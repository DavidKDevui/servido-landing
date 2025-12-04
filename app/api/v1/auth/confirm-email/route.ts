import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // TODO: Implémenter la logique de confirmation d'email
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token');
    const type = searchParams.get('type');

    // Placeholder response
    return NextResponse.json(
      {
        message: 'Email confirmation endpoint',
        token: token || null,
        type: type || null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Confirm email error:', error);
    return NextResponse.json(
      { error: 'Failed to process email confirmation' },
      { status: 500 }
    );
  }
}

