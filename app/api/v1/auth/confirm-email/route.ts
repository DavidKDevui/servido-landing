import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token');
    const type = searchParams.get('type');
    const accessToken = searchParams.get('access_token');

    // Si type=signup et access_token est présent, rediriger vers /confirm-mail
    if (type === 'signup' && accessToken) {
      return NextResponse.redirect(new URL('/confirm-mail', request.url));
    }

    // Si type=signup sans access_token, on redirige quand même (au cas où access_token serait dans le hash côté client)
    if (type === 'signup') {
      return NextResponse.redirect(new URL('/confirm-mail', request.url));
    }

    // Placeholder response pour les autres cas
    return NextResponse.json(
      {
        message: 'Email confirmation endpoint',
        token: token || null,
        type: type || null,
        access_token: accessToken || null,
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

