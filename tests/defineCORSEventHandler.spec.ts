/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/nitro-cors
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { describe, expect, it, suite } from 'vitest'

import { defineCORSEventHandler } from '../src'

/*****************************************************************************************************************/

suite('nitro-cors eventHandler', () => {
  describe('defineCORSEventHandler', () => {
    it('should be defined', () => {
      expect(defineCORSEventHandler).toBeDefined()
    })
  })
})
