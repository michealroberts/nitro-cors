/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/nitro-cors
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { describe, expect, expectTypeOf, it, suite } from 'vitest'

import { type EventHandler, type EventHandlerRequest } from 'h3'

import { defineCORSEventHandler } from '../src'

/*****************************************************************************************************************/

suite('nitro-cors eventHandler', () => {
  describe('defineCORSEventHandler', () => {
    it('should be defined', () => {
      expect(defineCORSEventHandler).toBeDefined()
    })

    it('should return the correct event handler types when specified', async () => {
      const handler = defineCORSEventHandler(
        async _event => {
          return {
            cors: true
          }
        },
        {
          origin: '*',
          methods: '*'
        }
      )

      expectTypeOf(handler).toEqualTypeOf<
        EventHandler<EventHandlerRequest, Promise<{ cors: boolean }>>
      >()
    })

    it('should return the correct event handler types when specified', () => {
      const handler = defineCORSEventHandler(
        _event => {
          return {
            cors: true
          }
        },
        {
          origin: '*',
          methods: '*'
        }
      )

      expectTypeOf(handler).toEqualTypeOf<EventHandler<EventHandlerRequest, { cors: boolean }>>()
    })
  })
})

/*****************************************************************************************************************/
