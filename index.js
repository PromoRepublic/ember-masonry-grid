/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-masonry-grid',

  included: function (app) {
    this._super.included(app);

    if (!process.env.EMBER_CLI_FASTBOOT) {
      app.import({
        development: 'node_modules/masonry-layout/dist/masonry.pkgd.js',
        production: 'node_modules/masonry-layout/dist/masonry.pkgd.min.js'
      });

      app.import({
        development: 'node_modules/imagesloaded/imagesloaded.pkgd.js',
        production: 'node_modules/imagesloaded/imagesloaded.pkgd.min.js'
      });
    }
  }
};
