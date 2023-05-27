/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/nitro-cors
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { describe, expect, it, suite } from 'vitest'

import { corsEventHandler } from '../src'

/*****************************************************************************************************************/

suite('nitro-cors eventHandler', () => {
  describe('corsEventHandler', () => {
    it('should be defined', () => {
      expect(corsEventHandler).toBeDefined()
    })
  })
})
