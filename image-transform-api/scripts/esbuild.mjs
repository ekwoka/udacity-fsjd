import { build } from 'esbuild';
import { copy } from 'esbuild-plugin-copy';
import { readdir } from 'fs/promises';

const utils = (await readdir('./src/utils')).map((f) => `./src/utils/${f}`);
const routes = (await readdir('./src/routes')).map((f) => `./src/routes/${f}`);
const tests = await (async () => {
  const base = './src/tests';
  const folders = (await readdir(base)).map((f) => [f, `${base}/${f}`]);
  const files = folders.map(async ([fol, path]) => {
    const files = (await readdir(path)).map((f) => `${path}/${f}`);
    return files;
  });
  return await Promise.all(files);
})();

console.log(tests.flat());

console.time('esbuild');
build({
  entryPoints: ['./src/index.ts', ...utils, ...routes, ...tests.flat()],
  outdir: './dist',
  splitting: false,
  format: 'esm',
  bundle: false,
  target: 'es2020',
  platform: 'node',
  minify: true,
  plugins: [
    copy({
      assets: {
        from: ['./src/images/*'],
        to: ['./images/file'],
      },
    }),
  ],
}).then(async (res) => {
  console.log('JS Build Complete');
  console.timeEnd('esbuild');
});
