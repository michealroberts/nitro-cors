/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/nitro-cors
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import {
  type EventHandler,
  type H3CorsOptions,
  getHeaders,
  setHeader,
  defineEventHandler,
  isCorsOriginAllowed
} from 'h3'

import { useCORS } from './internals/utils'

/*****************************************************************************************************************/

export const defineCORSEventHandler = <T extends any>(
  handler: EventHandler<T>,
  options: H3CorsOptions
) => {
  return defineEventHandler(async event => {
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
