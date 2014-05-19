module.exports = {
  dist: {
    src: [
      'libs/bootstrap/js/bootstrap.js',
      'js/core.js',
      'js/ga_links.js',
      'js/menu.toggle.js'
    ],
    dest: 'js/build/production.js'
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