/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/nitro-cors
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { corsHandlers } from './cors'

import { corsOnRequestMiddlewareHandlers } from './corsOnRequestMiddleware'

import { type Handler } from '../shared/handler'

/*****************************************************************************************************************/

export const handlers: Handler[] = [...corsHandlers, ...corsOnRequestMiddlewareHandlers]

/*****************************************************************************************************************/
