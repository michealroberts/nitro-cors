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
  getMethod,
  sendNoContent
} from 'h3'

/*****************************************************************************************************************/

export const useCORS = (event: H3Event, options: H3CorsOptions): void => {
  const method = getMethod(event)

  const { methods = [] } = options

  const methodIsAllowed = (Array.isArray(methods) && methods.includes(method)) || methods == '*'

  const methodIsOptions = method === 'OPTIONS'

  // If the method is not allowed, return:
  if (!methodIsAllowed) {
    return
  }

  // If the method is allowed and If OPTIONS is allowed, append headers:
  if (methodIsAllowed && methodIsOptions && options.preflight) {
    appendCorsPreflightHeaders(event, options)
    return sendNoContent(event, options.preflight.statusCode)
  }

  // If the method is allowed and the method is OPTIONS, append CORS headers:
  if (methodIsAllowed && !methodIsOptions) {
    return appendCorsHeaders(event, options)
  }
}

/*****************************************************************************************************************/
