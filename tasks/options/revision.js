module.exports = {
  options: {
    property: 'meta.revision',
    ref: 'HEAD',
    short: true
  },
  preprocess: {
    options: {
      context: {
        revision: '<%= meta.revision %>'
      }
    }
  }
}
