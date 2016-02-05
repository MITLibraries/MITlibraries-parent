module.exports = {
  phpcs: {
    application: {
      src: [
        '*.php',
        'inc/**/*.php',
        'lib/**/*.php'
      ]
    },
    options: {
      bin: 'phpcs -psvn . --extensions=php',
      standard: './codesniffer.ruleset.xml',
      reportFile: 'logs/grunt-analyze.log'
    }
  }
};
