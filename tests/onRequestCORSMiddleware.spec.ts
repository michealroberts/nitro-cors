/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/nitro-cors
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { beforeEach, describe, expect, it, suite } from 'vitest'

import supertest, { type SuperTest, type Test } from 'supertest'

import { toNodeListener } from 'h3'

import { server } from './utilities/server'

import { onRequestCORSMiddleware, cors } from '../src'

/*****************************************************************************************************************/

suite('nitro-cors Internal Utils', () => {
  describe('onRequestCORSMiddleware', () => {
    let request: SuperTest<Test>

    beforeEach(() => {
      request = supertest(toNodeListener(server))
    })

    it('should be defined', () => {
      expect(onRequestCORSMiddleware).toBeDefined()
    })

    it('should have an alias defined', () => {
      expect(cors).toBeDefined()
    })

    it('should set CORS headers correctly on the request event when cors event handler is used with all origins allowed', async () => {
      const res = await request
        .get('/on-request-middleware/cors/allowed', {
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
        .get('/on-request-middleware/cors/origin-match', {
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
        .get('/on-request-middleware/cors/method-match', {
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
        .get('/on-request-middleware/cors/method-match', {
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
        .get('/on-request-middleware/cors/origin-mismatch', {
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
        .get('/on-request-middleware/cors/method-mismatch', {
          method: 'POST'
        })
        .set('Origin', 'http://nitro-cors.unjs.io')

      expect(res.header['x-cors-allowed']).toBe('false')
      expect(res.header['origin']).toBe('http://nitro-cors.unjs.io')
      expect(res.header['access-control-allow-origin']).toBe('*')
      expect(res.body).toEqual({ cors: false })
    })

    it('should set CORS headers correctly on the request event when default options standard event handler is used', async () => {
      const res = await request
        .get('/on-request-middleware/cors/no-options-default-fallback-allowed', {
          method: 'GET'
        })
        .set('Origin', 'http://nitro-cors.unjs.io')

      expect(res.header['x-cors-allowed']).toBe('true')
      expect(res.header['origin']).toBe('http://nitro-cors.unjs.io')
      expect(res.header['access-control-allow-origin']).toBe('*')
      expect(res.body).toEqual({ cors: true })
    })
  })
})

/*****************************************************************************************************************/
