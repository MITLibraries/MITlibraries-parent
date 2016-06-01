module.exports = {
  dist: {
    options: {
      patterns: [
        {
          match: 'release',
          replacement: '<%= meta.revision %>'
        }
      ]
    },
    files: [{
      expand: true,
      flatten: true,
      src: ['css/style.css'],
      dest: '',
    }]
  }
}
