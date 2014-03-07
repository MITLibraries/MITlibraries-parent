module.exports = {
	options: {
		keepSpecialComments: 0
	},
  combine: {
    files: {
      'css/build/minified/global.css': ['css/build/prefixed/global.css']
    }
  }
}