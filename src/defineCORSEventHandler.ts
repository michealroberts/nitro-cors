/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/nitro-cors
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import {
  type EventHandler,
  type EventHandlerRequest,
  type EventHandlerResponse,
  type H3CorsOptions,
  getHeaders,
  setHeader,
  defineEventHandler,
  isCorsOriginAllowed
} from 'h3'

import { useCORS } from './internals/utils'

/*****************************************************************************************************************/

export const defineCORSEventHandler = <
  TRequest extends EventHandlerRequest,
  TResponse extends EventHandlerResponse
>(
  handler: EventHandler<TRequest, TResponse>,
  options: H3CorsOptions
): EventHandler<EventHandlerRequest, TResponse> => {
  return defineEventHandler(event => {
    useCORS(event, options)

    const { origin } = getHeaders(event)

    if (origin && isCorsOriginAllowed(origin, options)) {
      setHeader(event, 'Origin', origin)
    }

    // Return the event anyway, and let the browser handle the CORS error:
    return handler(event)
  })
}

/*****************************************************************************************************************/
