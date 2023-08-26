/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/nitro-cors
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import {
  type H3CorsOptions,
  getHeaders,
  setHeader,
  defineRequestMiddleware,
  isCorsOriginAllowed
} from 'h3'

import { useCORS } from './internals/utils'

/*****************************************************************************************************************/

const defaultCORSOptions = {
  origin: '*',
  methods: '*'
} satisfies H3CorsOptions

/*****************************************************************************************************************/

export const onRequestCORSMiddleware = (options?: H3CorsOptions) =>
  defineRequestMiddleware(async event => {
    const corsOptions = options || defaultCORSOptions

    useCORS(event, corsOptions)

    const { origin } = getHeaders(event)

    if (origin && isCorsOriginAllowed(origin, corsOptions)) {
      setHeader(event, 'Origin', origin)
    }
  })

/*****************************************************************************************************************/

// Expose the onRequestCorsMiddleware as cors alias for ease of use:
export const cors = onRequestCORSMiddleware

/*****************************************************************************************************************/
