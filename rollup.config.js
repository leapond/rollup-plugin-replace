import buble from "@rollup/plugin-buble";
import nodeResolve from "@rollup/plugin-node-resolve";

const pkg = require('./package.json')

export default {
  input: 'src/index.js',
  output: [
    {file: pkg.main, format: 'cjs', sourcemap: true, exports: 'auto'},
    {file: pkg.module, format: 'es', sourcemap: true}
  ],
  plugins: [nodeResolve(), buble()],
  external: Object.keys(pkg.dependencies)
}
