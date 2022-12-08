import nodeResolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import pkg from './package.json';

const external = Object.keys(pkg.dependencies || {});
const extensions = ['.ts', '.mjs', '.cjs', '.js', '.json'];
const isDevelopment = process.env.NODE_ENV === 'development';
const buildTarget = process.env.BUILD_TARGET;

if (!['runtime', 'aot'].includes(buildTarget)) {
  throw new Error(
    `BUILD_TARGET must be either aot or runtime, was ${buildTarget}`
  );
}

const sharedConfig = {
  plugins: [
    commonjs(),
    json(),
    nodeResolve({
      preferBuiltins: true,
      extensions
    }),
    babel({
      babelHelpers: 'bundled',
      extensions,
      exclude: 'node_modules/**'
    }),
    replace({
      preventAssignment: true,
      values: {
        __VERSION__: JSON.stringify(pkg.version)
      }
    })
  ]
};

if (!isDevelopment) {
  sharedConfig.plugins.push(terser());
}

const runtimeBuildConfig = {
  ...sharedConfig,
  input: 'src/main',
  output: {
    file: 'dist/main.runtime.js',
    format: 'cjs',
    exports: 'none'
  },
  external(id) {
    return external.some((dep) => id.startsWith(dep));
  }
};

const bundledBuildConfig = {
  ...sharedConfig,
  input: 'src/main.ts',
  output: {
    file: 'dist/main.bundled.js',
    format: 'cjs',
    exports: 'none'
  }
};

export default process.env.BUILD_TARGET === 'aot'
  ? bundledBuildConfig
  : runtimeBuildConfig;
