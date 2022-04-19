# Image Transformation API

This express server

## Using:

- Node
- Typescript
- Express
- Jasmine
- ESBuild
- Squoosh

## Commands
> This documentation assumes the use of `pnpm` but should work with `npm` or `yarn` as well

Before any commands will work, run `pnpm i` to install dependencies.

Purpose|Command|Desc
---|---|---
Dev Server|`pnpm start`|runs server and refreshes when files are changed
Build|`pnpm build`|Compiles TS files to JS files with esbuild
Serve|`pnpm serve`|Runs server from compiled JS files
Test|`pnpm test`|Compiles server and runs unit tests

## Use

When the server is running, you can use the following URL to test the API:

[http://localhost:3000/image/icelandwaterfall.jpg?width=700](http://localhost:3000/image/icelandwaterfall.jpg?width=700)

