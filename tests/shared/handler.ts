/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/nitro-cors
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { type EventHandler } from 'h3'

/*****************************************************************************************************************/

export interface Handler extends Record<string, unknown> {
  /**
   *
   *
   * @description The HTTP method to match against.
   *
   *
   */
  method: string | string[]
  /**
   *
   *
   * @description The URL path to match against.
   *
   *
   */
  url: string
  /**
   *
   *
   * @description The event handler to use for the request.
   *
   *
   */
  handler: EventHandler
}

/*****************************************************************************************************************/
