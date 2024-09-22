import { log } from 'console'

const response = await Bun.build({
  entrypoints: ['src/index.ts'],
  target: 'bun',
  outdir: 'build',
  sourcemap: 'none',
  format: 'esm',
  splitting: false,
})

log('build success', response.success, response.outputs[0].size, 'bytes')
