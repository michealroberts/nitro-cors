/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/nitro-cors
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { createApp, createRouter } from 'h3'

import { handlers } from '../mocks/handlers'

/*****************************************************************************************************************/

// Create a base h3 server instance:
const server = createApp()

// Create a base h3 router instance:
const router = createRouter()

// Setup the router to use the handlers dynamically:
handlers.forEach(handler => {
  router.use(handler.url, handler.handler)
})

server.use(router)

export { server }

/*****************************************************************************************************************/
