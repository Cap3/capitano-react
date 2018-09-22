const path = require('path');

module.exports = {
  title: 'Capitano Components',
  components: '../capitano-components/src/**/*.tsx',
  sections: [
    {
      name: 'Atoms',
      components: '../capitano-components/src/atoms/**/*.tsx',
    },
    {
      name: 'Molecules',
      components: '../capitano-components/src/molecules/**/*.tsx',
    },
    {
      name: 'Organisms',
      components: '../capitano-components/src/organisms/**/*.tsx',
    },
    {
      name: 'Templates',
      components: '../capitano-components/src/templates/**/*.tsx',
    },
    {
      name: 'Pages',
      components: '../capitano-components/src/pages/**/*.tsx',
    },
    {
      name: 'Logic',
      components: '../capitano-components/src/logic/**/*.tsx',
    },
  ],
  propsParser: require('react-docgen-typescript').parse,
  styleguideDir: './public',
  theme: {
    fontFamily: {
      base: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        '"Roboto"',
        '"Oxygen"',
        '"Ubuntu"',
        '"Cantarell"',
        '"Fira Sans"',
        '"Droid Sans"',
        '"Helvetica Neue"',
        'sans-serif',
      ].join(', '),
      monospace: [
        '"Dank Mono"',
        '"Fira Code"',
        'Consolas',
        '"Liberation Mono"',
        'Menlo',
        'monospace',
      ].join(', '),
    },
  },
  styleguideComponents: {
    StyleGuideRenderer: '@cap3/capitano-styleguidist-components/lib/StyleGuide',
    ReactComponentRenderer: '@cap3/capitano-styleguidist-components/lib/ReactComponent.js',
    HeadingRenderer: '@cap3/capitano-styleguidist-components/lib/Heading',
    SectionHeadingRenderer: '@cap3/capitano-styleguidist-components/lib/SectionHeading',
    Wrapper: '@cap3/capitano-styleguidist-components/lib/Wrapper',
    Preview: '@cap3/capitano-styleguidist-components/lib/Preview',
    PlaygroundRenderer: '@cap3/capitano-styleguidist-components/lib/PlaygroundRenderer',
  },
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: ['babel-loader', 'ts-loader'],
          exclude: /node_modules/,
        },
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader?modules',
        },
        {
          test: /\.svg$/,
          use: ['svg-sprite-loader', 'svgo-loader'],
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
  },
};
