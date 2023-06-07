// packages
const { Baker } = require('@datagraphics/baker');

const entrypoints = [
  // Add more script entrypoints here as needed
  'app',
];

const baker = new Baker({
  assets: 'assets',
  data: '_data',
  domain: 'https://caseymm.github.io/portfolio-2020/_dist',
  entrypoints: `scripts/${
    entrypoints.length > 1 ? `{${entrypoints.join(',')}}` : entrypoints[0]
  }.js`,
  input: process.cwd(),
  layouts: '_layouts',
  output: '_dist',
  pathPrefix: process.env.DELIVERY_BASE_PATH || '/',
  staticRoot: 'portfolio-2020/',
});

// staticRoot: 'portfolio-2020/' || '/',

module.exports = { baker };
