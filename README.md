# nitro Cross-Origin Resource Sharing (CORS) Headers

nitro native CORS event handler.

## Requirements

- [nitro](https://nitro.unjs.io) v.2.6.\* or higher

## Installation

```bash
npm install nitro-cors
```

```bash
pnpm add nitro-cors
```

```bash
yarn add nitro-cors
```

## Usage

nitro CORS is built upon the h3 CORS utilities provided by the h3 library. To read more about h3's inbuilt cors library, please consult the [h3 repository](https://github.com/unjs/h3#utilities).

To get started, you can enable CORS on a specific event handler by using the object syntax definitions intorduced in nitro v2.6.0 and h3 v1.8.0 as follows:

```ts
import { cors } from 'nitro-cors'

export default eventHandler({
  onRequest: [
    cors({
      origin: '*',
      methods: '*'
      // ... add your options overrides here
    })
  ],
  async handler(event) {
    return 'Hello CORS!'
  }
})
```

nitro-cors also provides a simple wrapper to define a CORS event handler per nitro event handler, or per route. To use it, simply import the `defineCORSEventHandler` function and wrap your event handler with it as follows:

```ts
import { defineCORSEventHandler } from 'nitro-cors'

const handler = eventHandler(async event => {
  // ...
})

export default defineCORSEventHandler(handler, {
  origin: '*',
  methods: '*'
})
```

...or... using as nitro middleware:

```ts
// :file middleware/cors.ts
import { corsEventHandler } from 'nitro-cors'

export default corsEventHandler(_event => {}, {
  origin: '*',
  methods: '*'
})
```

The `defineCORSEventHandler` and `corsEventHandler` functions take two arguments:

- `handler`: the event handler to wrap of type `EventHandler<T>`, which will ensure typesafety for the event handler return type.
- `options`: the options to pass to the cors handler of type `H3CorsOptions`. These are the same options as the ones passed to the h3 cors library.

## Options

The options passed to the cors handler are the same as the ones passed to the h3 cors library. Please consult the [h3 repository](https://github.com/unjs/h3#utilities)

## Acknowledgements

This library would not be possible if it were not for standing on the shoulders of these giants:

- [h3](https://github.com/unjs)
