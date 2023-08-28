/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/nitro-cors
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import {
  type EventHandler,
  type EventHandlerRequest,
  type EventHandlerResponse,
  type H3CorsOptions,
  defineEventHandler,
  handleCors
} from 'h3'

/*****************************************************************************************************************/

export const corsEventHandler = <
  TRequest extends EventHandlerRequest,
  TResponse extends EventHandlerResponse
>(
  handler: EventHandler<TRequest, TResponse>,
  options: H3CorsOptions
): EventHandler<EventHandlerRequest, TResponse> => {
  return defineEventHandler(event => {
    handleCors(event, options)
    return handler(event)
  })
}

/*****************************************************************************************************************/
