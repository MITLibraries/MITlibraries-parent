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
      bin: 'phpcs -p -s -v -n .',
      standard: './codesniffer.ruleset.xml',
      extensions: 'php'
    }
  }
};
