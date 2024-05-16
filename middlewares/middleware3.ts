import {
  NextResponse,
  type NextFetchEvent,
  type NextRequest
} from 'next/server'

import { CustomMiddleware } from './chain'

export function withMiddleware3(middleware: CustomMiddleware) {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse
  ) => {
    console.log('-------')
    // Perform whatever logic the second middleware needs to do
    const pathname = request.nextUrl.pathname

    console.log('middleware3 =>', { pathname })
    console.log(
      'middleware3 - request cookies =>',
      request.cookies.get('middleware2')
    )
    console.log(
      'middleware3 - response cookies =>',
      response.cookies.get('vercel')
    )

    // Call the next middleware and pass the request and response
    return middleware(request, event, response)
  }
}
