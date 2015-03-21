module.exports = {
  description: 'Add ember-masonry-grid bower dependencies to app.',

  normalizeEntityName: function () {
  },

  afterInstall: function () {
    return this.addBowerPackagesToProject(['jquery-masonry', 'imagesLoaded']);
  }
};
