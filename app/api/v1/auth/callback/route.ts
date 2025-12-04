import { NextRequest, NextResponse } from 'next/server';

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_AUTH_URL = `${SUPABASE_URL}/auth/v1/callback`;

export async function GET(request: NextRequest) {
  return proxyRequest(request);
}

export async function POST(request: NextRequest) {
  return proxyRequest(request);
}

async function proxyRequest(request: NextRequest) {
  try {
    // Récupérer les query parameters
    const searchParams = request.nextUrl.searchParams;
    const queryString = searchParams.toString();
    const url = queryString 
      ? `${SUPABASE_AUTH_URL}?${queryString}`
      : SUPABASE_AUTH_URL;

    // Récupérer les headers (exclure certains headers sensibles)
    const headers: HeadersInit = {};
    request.headers.forEach((value, key) => {
      // Exclure les headers qui ne doivent pas être transmis
      if (
        !key.toLowerCase().startsWith('x-forwarded-') &&
        !key.toLowerCase().startsWith('x-vercel-') &&
        key.toLowerCase() !== 'host' &&
        key.toLowerCase() !== 'connection'
      ) {
        headers[key] = value;
      }
    });

    // Préparer les options de la requête
    const options: RequestInit = {
      method: request.method,
      headers,
      redirect: 'manual', // Ne pas suivre automatiquement les redirections
    };

    // Ajouter le body pour POST/PUT/PATCH
    if (request.method === 'POST' || request.method === 'PUT' || request.method === 'PATCH') {
      const body = await request.text();
      if (body) {
        options.body = body;
      }
    }

    // Faire la requête vers Supabase
    const response = await fetch(url, options);

    // Gérer les redirections (301, 302, 303, 307, 308)
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get('location');
      if (location) {
        // Si c'est une redirection, rediriger vers cette URL
        return NextResponse.redirect(location, { status: response.status });
      }
    }

    // Récupérer le Content-Type
    const contentType = response.headers.get('content-type') || '';

    // Gérer les réponses JSON
    if (contentType.includes('application/json')) {
      const jsonData = await response.json();
      return NextResponse.json(jsonData, {
        status: response.status,
        headers: {
          ...Object.fromEntries(response.headers.entries()),
        },
      });
    }

    // Gérer les réponses HTML (comme les pages de callback Supabase)
    if (contentType.includes('text/html')) {
      const htmlBody = await response.text();
      return new NextResponse(htmlBody, {
        status: response.status,
        headers: {
          'Content-Type': 'text/html',
          ...Object.fromEntries(
            Array.from(response.headers.entries()).filter(([key]) => 
              !['content-encoding', 'transfer-encoding', 'content-length'].includes(key.toLowerCase())
            )
          ),
        },
      });
    }

    // Pour les autres types de contenu (images, etc.), utiliser arrayBuffer
    const arrayBuffer = await response.arrayBuffer();

    return new NextResponse(arrayBuffer, {
      status: response.status,
      statusText: response.statusText,
      headers: {
        ...Object.fromEntries(
          Array.from(response.headers.entries()).filter(([key]) => 
            !['content-encoding', 'transfer-encoding'].includes(key.toLowerCase())
          )
        ),
      },
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Proxy request failed' },
      { status: 500 }
    );
  }
}

