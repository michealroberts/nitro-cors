/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/nitro-cors
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { type EventHandler, type H3CorsOptions, defineEventHandler, handleCors } from 'h3'

/*****************************************************************************************************************/

export const corsEventHandler = <T>(handler: EventHandler<T>, options: H3CorsOptions) => {
  return defineEventHandler(async event => {
    handleCors(event, options)
    return handler(event)
  })
}

/*****************************************************************************************************************/
