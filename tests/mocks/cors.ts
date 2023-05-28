/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/nitro-cors
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { eventHandler, setHeaders } from 'h3'

import { type Handler } from '../shared/handler'

import { defineCORSEventHandler } from '../../src'

/*****************************************************************************************************************/

export const corsHandlers: Handler[] = [
  {
    method: '*',
    url: '/cors/allowed',
    handler: defineCORSEventHandler(
      eventHandler(async event => {
        setHeaders(event, {
          'X-CORS-Allowed': 'true'
        })

        return {
          cors: true
        }
      }),
      {
        origin: '*',
        methods: '*'
      }
    )
  },
  {
    method: '*',
    url: '/cors/origin-match',
    handler: defineCORSEventHandler(
      eventHandler(async event => {
        setHeaders(event, {
          'X-CORS-Allowed': 'true'
        })

        return {
          cors: true
        }
      }),
      {
        origin: ['http://nitro-cors.unjs.io'],
        methods: '*'
      }
    )
  },
  {
    method: ['GET', 'OPTIONS'],
    url: '/cors/origin-mismatch',
    handler: defineCORSEventHandler(
      eventHandler(async event => {
        setHeaders(event, {
          'X-CORS-Allowed': 'false'
        })

        return {
          cors: false
        }
      }),
      {
        origin: ['https://nitro.unjs.io'],
        methods: ['GET', 'OPTIONS']
      }
    )
  },
  {
    method: ['GET', 'OPTIONS'],
    url: '/cors/method-match',
    handler: defineCORSEventHandler(
      eventHandler(async event => {
        setHeaders(event, {
          'X-CORS-Allowed': 'true'
        })

        return {
          cors: true
        }
      }),
      {
        origin: '*',
        methods: ['GET', 'OPTIONS']
      }
    )
  },
  {
    method: ['GET', 'OPTIONS'],
    url: '/cors/method-mismatch',
    handler: defineCORSEventHandler(
      eventHandler(async event => {
        setHeaders(event, {
          'X-CORS-Allowed': 'false'
        })

        return {
          cors: false
        }
      }),
      {
        origin: '*',
        methods: ['GET', 'OPTIONS']
      }
    )
  },
  {
    method: 'GET',
    url: '/cors/not-allowed',
    handler: eventHandler(async event => {
      setHeaders(event, {
        'X-CORS-Allowed': 'false'
      })

      return {
        cors: false
      }
    })
  }
]

/*****************************************************************************************************************/
