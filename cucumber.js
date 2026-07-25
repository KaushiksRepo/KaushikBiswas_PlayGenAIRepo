const common = {
  requireModule: ['ts-node/register'],
  require: ['src/support/**/*.ts', 'tests/steps/**/*.ts'],
  format: [
    'progress-bar',
    'json:reports/json/cucumber-report.json',
    'html:reports/html/cucumber-report.html',
  ],
  formatOptions: { snippetInterface: 'async-await' },
  publishQuiet: true,
};

module.exports = {
  default: {
    ...common,
    paths: ['tests/features/**/*.feature'],
  },
  smoke: {
    ...common,
    paths: ['tests/features/**/*.feature'],
    tags: '@smoke',
  },
  regression: {
    ...common,
    paths: ['tests/features/**/*.feature'],
    tags: '@regression',
  },
  sanity: {
    ...common,
    paths: ['tests/features/**/*.feature'],
    tags: '@sanity',
  },
  parallel: {
    ...common,
    paths: ['tests/features/**/*.feature'],
    parallel: 4,
  },
};
