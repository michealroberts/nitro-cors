/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/nitro-cors
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { eventHandler, setHeaders } from 'h3'

import { type Handler } from '../shared/handler'

import { onRequestCORSMiddleware } from '../../src'

/*****************************************************************************************************************/

export const corsOnRequestMiddlewareHandlers: Handler[] = [
  {
    method: '*',
    url: '/on-request-middleware/cors/allowed',
    handler: eventHandler({
      onRequest: onRequestCORSMiddleware({
        origin: '*',
        methods: '*'
      }),
      async handler(event) {
        setHeaders(event, {
          'X-CORS-Allowed': 'true'
        })

        return {
          cors: true
        }
      }
    })
  },
  {
    method: '*',
    url: '/on-request-middleware/cors/origin-match',
    handler: eventHandler({
      onRequest: onRequestCORSMiddleware({
        origin: ['http://nitro-cors.unjs.io'],
        methods: '*'
      }),
      async handler(event) {
        setHeaders(event, {
          'X-CORS-Allowed': 'true'
        })

        return {
          cors: true
        }
      }
    })
  },
  {
    method: ['GET', 'OPTIONS'],
    url: '/on-request-middleware/cors/origin-mismatch',
    handler: eventHandler({
      onRequest: onRequestCORSMiddleware({
        origin: ['https://nitro.unjs.io'],
        methods: ['GET', 'OPTIONS']
      }),
      async handler(event) {
        setHeaders(event, {
          'X-CORS-Allowed': 'false'
        })

        return {
          cors: false
        }
      }
    })
  },
  {
    method: ['GET', 'OPTIONS'],
    url: '/on-request-middleware/cors/method-match',
    handler: eventHandler({
      onRequest: onRequestCORSMiddleware({
        origin: '*',
        methods: ['GET', 'OPTIONS']
      }),
      async handler(event) {
        setHeaders(event, {
          'X-CORS-Allowed': 'true'
        })

        return {
          cors: true
        }
      }
    })
  },
  {
    method: ['GET', 'OPTIONS'],
    url: '/on-request-middleware/cors/method-mismatch',
    handler: eventHandler({
      onRequest: onRequestCORSMiddleware({
        origin: '*',
        methods: ['GET', 'OPTIONS']
      }),
      async handler(event) {
        setHeaders(event, {
          'X-CORS-Allowed': 'false'
        })

        return {
          cors: false
        }
      }
    })
  },
  {
    method: 'GET',
    url: '/on-request-middleware/cors/no-options-default-fallback-allowed',
    handler: eventHandler({
      onRequest: onRequestCORSMiddleware(),
      async handler(event) {
        setHeaders(event, {
          'X-CORS-Allowed': 'true'
        })

        return {
          cors: true
        }
      }
    })
  }
]

/*****************************************************************************************************************/
