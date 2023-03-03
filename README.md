# Next.js ENV variables PoC

## ENV variable baked in at build time

Available on both server and client side.

Run

`npm run build:integration` (need to specify the name of the environment)

then

`npm run start`

then open

http://localhost:3000

Only the following use case is valid.

![Using .env file](./docs/images/env-file.png)

## ENV variable passed in at run time

Available on the server side only.

Run

`npm run build`

then

`npm run start:ci`

then open

http://localhost:3000

Only the following use cases are valid.

![Using .env file](./docs/images/runtime.png)
