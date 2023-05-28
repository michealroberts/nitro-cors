/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/nitro-cors
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { beforeEach, describe, expect, it, suite } from 'vitest'

import supertest, { type SuperTest, type Test } from 'supertest'

import { toNodeListener } from 'h3'

import { server } from './utilities/server'

import { useCORS } from '../src/useCors'

/*****************************************************************************************************************/

suite('nitro-cors Internal Utils', () => {
  describe('useCORS', () => {
    let request: SuperTest<Test>

    beforeEach(() => {
      request = supertest(toNodeListener(server))
    })

    it('should be defined', () => {
      expect(useCORS).toBeDefined()
    })

    it('should set CORS headers correctly on the request event when cors event handler is used with all origins allowed', async () => {
      const res = await request
        .get('/cors/allowed', {
          method: 'GET'
        })
        .set('Origin', 'http://nitro-cors.unjs.io')

      expect(res.header['x-cors-allowed']).toBe('true')
      expect(res.header['origin']).toBe('http://nitro-cors.unjs.io')
      expect(res.header['access-control-allow-origin']).toBe('*')
      expect(res.body).toEqual({ cors: true })
    })

    it('should set CORS headers correctly on the request event when the CORS event handler is used with origin match', async () => {
      const res = await request
        .get('/cors/origin-match', {
          method: 'GET'
        })
        .set('Origin', 'http://nitro-cors.unjs.io')

      expect(res.header['x-cors-allowed']).toBe('true')
      expect(res.header['origin']).toBe('http://nitro-cors.unjs.io')
      expect(res.header['access-control-allow-origin']).toBe('http://nitro-cors.unjs.io')
      expect(res.body).toEqual({ cors: true })
    })

    it('should set CORS headers correctly on the request event when the CORS event handler is used with method match', async () => {
      const res = await request
        .get('/cors/method-match', {
          method: 'OPTIONS'
        })
        .set('Origin', 'http://nitro-cors.unjs.io')

      expect(res.header['x-cors-allowed']).toBe('true')
      expect(res.header['origin']).toBe('http://nitro-cors.unjs.io')
      expect(res.header['access-control-allow-origin']).toBe('*')
      expect(res.body).toEqual({ cors: true })
    })

    it('should set CORS headers correctly on the request event when the CORS event handler is used with method match', async () => {
      const res = await request
        .get('/cors/method-match', {
          method: 'GET'
        })
        .set('Origin', 'http://nitro-cors.unjs.io')

      expect(res.header['x-cors-allowed']).toBe('true')
      expect(res.header['origin']).toBe('http://nitro-cors.unjs.io')
      expect(res.header['access-control-allow-origin']).toBe('*')
      expect(res.body).toEqual({ cors: true })
    })

    it('should set CORS headers correctly on the request event when the CORS event handler is used with origin mismatch', async () => {
      const res = await request
        .get('/cors/origin-mismatch', {
          method: 'GET'
        })
        .set('Origin', 'http://nitro.unjs.io')

      expect(res.header['x-cors-allowed']).toBe('false')
      expect(res.header['origin']).toBe(undefined)
      expect(res.header['access-control-allow-origin']).toBe(undefined)
      expect(res.body).toEqual({ cors: false })
    })

    it('should set CORS headers correctly on the request event when the CORS event handler is used with method mismatch', async () => {
      const res = await request
        .get('/cors/method-mismatch', {
          method: 'POST'
        })
        .set('Origin', 'http://nitro-cors.unjs.io')

      expect(res.header['x-cors-allowed']).toBe('false')
      expect(res.header['origin']).toBe('http://nitro-cors.unjs.io')
      expect(res.header['access-control-allow-origin']).toBe('*')
      expect(res.body).toEqual({ cors: false })
    })

    it('should not set CORS headers correctly on the request event when standard event handler is used', async () => {
      const res = await request
        .get('/cors/not-allowed', {
          method: 'GET'
        })
        .set('Origin', 'http://nitro-cors.unjs.io')

      expect(res.header['x-cors-allowed']).toBe('false')
      expect(res.header['origin']).toBe(undefined)
      expect(res.header['access-control-allow-origin']).toBe(undefined)
      expect(res.body).toEqual({ cors: false })
    })
  })
})

/*****************************************************************************************************************/
