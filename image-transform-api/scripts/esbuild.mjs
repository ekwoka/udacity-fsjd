import { build } from 'esbuild';
import { copy } from 'esbuild-plugin-copy';
import { getAllTypeScript } from './utils/getAllTypescript.mjs';

const paths = await getAllTypeScript(['./src']);
console.time('esbuild');
build({
  entryPoints: paths,
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
