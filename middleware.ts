import { NextRequest, NextResponse } from 'next/server'

const PASSWORD = '0000'
const COOKIE_NAME = 'assay_auth'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

const loginPage = (redirect: string, error = false) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Assay Labs</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #0f0f0f;
      color: #e8e8e8;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .card {
      background: #1a1a1a;
      border: 1px solid #2a2a2a;
      border-radius: 12px;
      padding: 40px;
      width: 100%;
      max-width: 360px;
    }
    h1 { font-size: 1.25rem; font-weight: 600; margin-bottom: 8px; }
    p { font-size: 0.875rem; color: #888; margin-bottom: 28px; }
    input[type="password"] {
      width: 100%;
      padding: 10px 14px;
      background: #111;
      border: 1px solid ${error ? '#f87171' : '#333'};
      border-radius: 8px;
      color: #e8e8e8;
      font-size: 1rem;
      outline: none;
      margin-bottom: 12px;
      transition: border-color 0.15s;
    }
    input[type="password"]:focus { border-color: #555; }
    button {
      width: 100%;
      padding: 10px 14px;
      background: #e8e8e8;
      color: #0f0f0f;
      border: none;
      border-radius: 8px;
      font-size: 0.9375rem;
      font-weight: 600;
      cursor: pointer;
    }
    button:hover { background: #fff; }
    .error { color: #f87171; font-size: 0.8125rem; margin-top: 10px; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Assay Labs</h1>
    <p>Enter password to continue.</p>
    <form method="POST" action="/__assay_login">
      <input type="password" name="password" placeholder="Password" autofocus />
      <input type="hidden" name="redirect" value="${redirect}" />
      <button type="submit">Continue</button>
    </form>
    ${error ? '<p class="error">Incorrect password.</p>' : ''}
  </div>
</body>
</html>`

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Handle login form POST
  if (pathname === '/__assay_login' && req.method === 'POST') {
    const body = await req.text()
    const params = new URLSearchParams(body)
    const password = params.get('password') ?? ''
    const redirect = params.get('redirect') || '/'

    if (password === PASSWORD) {
      const res = NextResponse.redirect(new URL(redirect, req.url))
      res.cookies.set(COOKIE_NAME, PASSWORD, {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        maxAge: COOKIE_MAX_AGE,
      })
      return res
    }

    return new NextResponse(loginPage(redirect, true), {
      status: 401,
      headers: { 'Content-Type': 'text/html' },
    })
  }

  // Skip Next.js internals
  if (pathname.startsWith('/_next') || pathname.startsWith('/favicon')) {
    return NextResponse.next()
  }

  // Check auth cookie
  const cookie = req.cookies.get(COOKIE_NAME)
  if (cookie?.value === PASSWORD) {
    return NextResponse.next()
  }

  // Show login page
  return new NextResponse(loginPage(pathname), {
    status: 401,
    headers: { 'Content-Type': 'text/html' },
  })
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
