module.exports = {
  dist: {
    src: [
      'libs/bootstrap/js/bootstrap.js',
      'js/core.js',
      'js/ga_links.js',
      'js/menu.toggle.js',
      'js/libs/*.js',
      'js/make/*.js'
    ],
    dest: 'js/build/production.js'
  },
  home: {
    src: [
      'js/search.js',
      'js/hours-home.js',
      'js/news-home.js',
      'js/experts-home.js'
    ],
    dest: 'js/build/home.js'
  },
  hours: {
  	src: [
  		'js/sticky/*.js',
  		'js/sticky/scrollStick/*.js',
  		'libs/datepicker/glDatepicker.js',
  		'js/make.datepicker.js'
  	],
  	dest: 'js/build/hours.js'
  }
}