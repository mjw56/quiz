const rollup = require('rollup');
const nodeResolve = require('rollup-plugin-node-resolve');
const includePaths = require('rollup-plugin-includepaths');
const commonJS = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');
const sass = require('rollup-plugin-sass');
const replace = require('rollup-plugin-replace');
const uglify = require('rollup-plugin-uglify');
const { writeFileSync } = require('fs');

let includePathOptions = {
  include: {},
  paths: ['src'],
  external: [],
  extensions: ['.js', '.jsx', '.tsx']
};

const plugins = [
    nodeResolve({
      extensions: [ '.js', '.jsx', '.tsx' ]
    }),
    includePaths(includePathOptions),
    sass({
      output(styles, styleNodes) {
        writeFileSync('public/bundle.css', styles)
      },
    }),
    commonJS(),
    babel({
        exclude: 'node_modules/**',
        presets: ['@babel/react'],
        plugins: [
          '@babel/plugin-proposal-class-properties',
          '@babel/plugin-proposal-object-rest-spread', 
          'transform-react-remove-prop-types'
        ],
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    uglify()
  ]

rollup.rollup({
    input: 'src/index.jsx',
    plugins
  }).then(bundle => {
    bundle.write({
      format: 'cjs',
      file: 'public/bundle.js'
    })
  });
