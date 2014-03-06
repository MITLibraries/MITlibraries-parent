module.exports = {
  dist: {
    src: [
      'libs/bootstrap/js/bootstrap.js',
      'js/core.js'
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