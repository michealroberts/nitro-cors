# nitro CORS Cross Origin Resource Sharing

nitro native CORS event handler.

## Requirements

- [nitro](https://nitro.unjs.io) v.2.4.\* or higher

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

nitro CORS is built upon the h3 cors library. To read more about h3's inbuilt cors library, please consult the [h3 repository](https://github.com/unjs/h3#utilities).

nitro-cors aims to provide a simple wrapper to define a CORS event handler per nitro event handler, or per route. To use it, simply import the `defineCORSEventHandler` function and wrap your event handler with it as follows:

```ts
const handler = eventHandler(async event => {
  // ...
})

export default defineCORSEventHandler(handler, {
  origin: '*',
  methods: '*'
})
```

The `defineCORSEventHandler` function takes two arguments:

- `handler`: the event handler to wrap of type `EventHandler<T>`, which will ensure typesafety for the event handler return type.
- `options`: the options to pass to the cors handler of type `H3CorsOptions`. These are the same options as the ones passed to the h3 cors library.

## TBI

- [x] Ensure typesafety for the cors options
- [x] Ensure typesafety for the event handler return type
- [x] Ensure typesafety for the event handler arguments
- [x] Ensure allowedHeaders is passed to the cors handler
- [x] Ensure exposedHeaders is passed to the cors handler
- [x] Ensure credentials are passed to the cors handler
- [x] Ensure maxAge is passed to the cors handler
