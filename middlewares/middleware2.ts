import {
  NextResponse,
  type NextFetchEvent,
  type NextRequest
} from 'next/server'

import { CustomMiddleware } from './chain'

export function withMiddleware2(middleware: CustomMiddleware) {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse
  ) => {
    console.log('-------')
    // Perform whatever logic the second middleware needs to do
    const pathname = request.nextUrl.pathname
    request.cookies.set('middleware2', 'true')

    console.log('middleware2 =>', { pathname })

    console.log(
      'middleware2 - request cookies =>',
      request.cookies.get('middleware1')
    )
    console.log(
      'middleware2 - response cookies =>',
      response.cookies.get('vercel')
    )

    const url = request.nextUrl.clone()
    url.pathname = '/dest'

    const redirectResponse = NextResponse.redirect(
      new URL('/something', request.url),
      {
        headers: response.headers
      }
    )

    // Call the next middleware and pass the request and response
    return middleware(request, event, redirectResponse)
  }
}
