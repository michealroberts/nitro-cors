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
    method: 'GET',
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
