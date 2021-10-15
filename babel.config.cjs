const { resolve } = require('path');

module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV);
  return {
    presets: [
      [
        "@babel/preset-env",
        {
          targets: {
            node: "current",
          },
          modules:"commonjs"
        },
      ],
    ],
    plugins: [
      [
        'search-and-replace',
        {
          rules: [
            {
              searchTemplateStrings: true,
              search: 'import_meta_url',
              replace: resolve(__dirname, 'workers'),
            },
          ],
        },
      ],
    ],
  }
};