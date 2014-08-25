module.exports = {
  dist: {
    src: [
      'js/dev.js',
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
      'js/dev.js',
      'js/search-ie.js',
      'js/search.js',
      'js/hours-home.js',
      'js/news-home.js',
      'js/guides-home.js',
      'js/experts-home.js',
      'js/libs/libchat.js',
      'js/ga_discovery.js'
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
  },
  search: {
    src: [
      'js/search.js',
      'js/search-ie.js',
      'js/ga_discovery.js'
    ],
    dest: 'js/build/search.js'
  },
  map: {
    src: 'js/map.js',
    dest: 'js/build/map.js'
  }
}