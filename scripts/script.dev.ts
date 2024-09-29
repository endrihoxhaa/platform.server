import tsup from 'tsup'

await tsup.build({
  entry: ['src/index.ts'],
  outDir: 'dist',
  dts: true,
  format: ['esm'],
  platform: 'node',
  watch: true,
})

// await Bun.build({
//   entrypoints: ['src/index.ts'],
//   outdir: 'dist',
//   format: 'esm',
//   naming: "index.export.js"
// })
