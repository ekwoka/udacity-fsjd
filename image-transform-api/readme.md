# Image Transformation API

#### Quick Start Command

```
git clone https://github.com/ekwoka/udacity-fsjd && cd udacity-fsjd/image-transform-api && npm i

// or

git clone https://github.com/ekwoka/udacity-fsjd && cd udacity-fsjd/image-transform-api && pnpm i
```

This express server sample provides an image transformation api to image requests. Simply accessing the url of the image (available from `/images/`) will return the image, while adding query params of `width` and/or `height` will return resized images, perfect for responsive image and placeholder use cases.

The api also dynamically returns `webp` images when the browser accepts them.

> Note: Upon first access of an imageset, there can be a bit of a delay, depending on the size requested. Subsequent accesses will be faster due to transformed images being cached.

## Using:

- Typescript
- Express/Node
- Jasmine/Supertest
- ESBuild
- Squoosh

## Commands

> Note: This documentation assumes the use of `pnpm` but should work with `npm` or `yarn` as well

Before any commands will work, run `pnpm i` to install dependencies.

| Purpose    | Command      | Desc                                             |
| ---------- | ------------ | ------------------------------------------------ |
| Dev Server | `pnpm start` | runs server and refreshes when files are changed |
| Build      | `pnpm build` | Compiles TS files to JS files with esbuild       |
| Serve      | `pnpm serve` | Runs server from compiled JS files               |
| Test       | `pnpm test`  | Compiles server and runs unit tests              |

## Use

When the server is running, you can use the following URL to test the API:

[http://localhost:3000/images/icelandwaterfall.jpg?width=700](http://localhost:3000/images/icelandwaterfall.jpg?width=700)

## Experience

Overall, this project was fairly fun to do. Having a server capable of on the fly transformations is a very valuable thing to have. I've had experience using Cloudinary and the Shopify CDN to accomplish this in the past and it was fun to put one together my self, especially in seeing how performant their options are in comparison.

Having as-needed transformations is especially helpful in providing responsive image `srcset` lists without the need for managing preprocessing of potentially dozens of variations of the same image to minimize data usage while maximizing image quality.

Putting the project together was mostly uneventful, aside from a few errors here and there that eluded me a bit too long. I think the main one was imports getting confused in regards to VScode auto importing without the file extensions, and the `.ts` file extensions not be accepted as imports in ts. The solution of making them all say `.js` when the files themselves were not `.js` was definitely something that took me a while to get to.
