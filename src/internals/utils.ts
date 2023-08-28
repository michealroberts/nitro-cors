/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/nitro-cors
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import {
  type H3Event,
  type H3CorsOptions,
  appendCorsHeaders,
  appendCorsPreflightHeaders,
  isPreflightRequest,
  sendNoContent
} from 'h3'

/*****************************************************************************************************************/

export const useCORS = (event: H3Event, options: H3CorsOptions): boolean => {
  const { methods = [] } = options

  const methodIsAllowed =
    (Array.isArray(methods) && methods.includes(event.method)) || methods == '*'

  const methodIsOptions = event.method === 'OPTIONS'

  // If the method is not allowed, return:
  if (!methodIsAllowed && !methodIsOptions) {
    return false
  }

  // If the method is allowed and If OPTIONS is allowed, append headers:
  if (isPreflightRequest(event)) {
    appendCorsPreflightHeaders(event, options)
    sendNoContent(event, options.preflight?.statusCode || 204)
    return true
  }

  // If the method is allowed and the method is OPTIONS, append CORS headers:
  appendCorsHeaders(event, options)
  return false
}

/*****************************************************************************************************************/
