<?php
/**
 * This is project's console commands configuration for Robo task runner.
 *
 * @see http://robo.li/
 */
class RoboFile extends \Robo\Tasks {

	/**
	 * Run all needed build tasks for the theme to be used in production.
	 *
	 * This includes three separate phases:
	 * 1. Concatenate and minify javascript
	 * 2. Scss-isfy, prefix, and minify stylesheets
	 * 3. Replace dummy values in theme version string with current branch
	 *    and git commit
	 */
	public function build() {
		$this->buildJavascript();
		$this->buildStyles();
		$this->buildRelease();
	}

	/**
	 * Build the javascript associated with this theme.
	 *
	 * 1. Concatenate
	 * 2. Uglify the concatenated files
	 */
	public function buildJavascript() {
		$this->say( 'Building javascript...' );
		$this->buildJavascriptConcat();
		$this->buildJavascriptUglify();
	}

	/**
	 * Build the stylesheets associate with this theme.
	 *
	 * 1. Assembling partials via Scss
	 * 2. Prefix
	 * 3. Minify
	 */
	public function buildStyles() {
		$this->say( 'Building stylesheets...' );
		$this->buildStylesSass();
		// The prefixer is not ready yet.
		$this->buildStylesMin();
	}

	/**
	 * Build the release information into the theme.
	 *
	 * 1. Read current branch and commit has from filesystem
	 * 2. Replace dummy values in styles.css with these values
	 */
	public function buildRelease() {
		$this->say( 'Building release...' );
		// Gitinfo.
		// Replace.
	}

	/**
	 * This runs the javascript concatenation.
	 */
	private function buildJavascriptConcat() {
		$this->taskConcat([
			'js/dev.js',
			'js/core.js',
			'js/ga_links.js',
			'js/menu.toggle.js',
			'js/libs/*.js',
			'js/hours-lookup.js',
			'js/alerts.js',
			'js/fonts.js',
		])
		->to( 'js/build/production.js' )
		->run();

		$this->taskConcat([
			'js/dev.js',
			'js/search-ie.js',
			'js/search.js',
			'js/menu.toggle.js',
			'js/libs/*.js',
			'js/hours-home.js',
			'js/hours-lookup.js',
			'js/guides-home.js',
			'js/experts-home.js',
			'js/ga_discovery.js',
			'js/alerts.js',
			'js/fonts.js',
		])
		->to( 'js/build/home.js' )
		->run();

		$this->taskConcat([
			'js/sticky/*.js',
			'js/sticky/scrollStick/*.js',
			'libs/datepicker/glDatepicker.js',
			'js/make.datepicker.js',
		])
		->to( 'js/build/hours.js' )
		->run();

		$this->taskConcat([
			'js/search.js',
			'js/search-ie.js',
			'js/ga_discovery.js',
		])
		->to( 'js/build/search.js' )
		->run();

		$this->taskConcat([
			'js/map.js',
		])
		->to( 'js/build/map.js' )
		->run();
	}

	/**
	 * This runs the javascript minification / uglification.
	 */
	private function buildJavascriptUglify() {
		$this->taskMinify( 'js/build/production.js' )
		->to( 'js/build/min/production.js' )
		->singleLine( true )
		->run();

		$this->taskMinify( 'js/build/home.js' )
		->to( 'js/build/min/home.js' )
		->run();

		$this->taskMinify( 'js/build/hours.js' )
		->to( 'js/build/min/hours.js' )
		->run();

		$this->taskMinify( 'js/build/search.js' )
		->to( 'js/build/min/search.js' )
		->run();

		$this->taskMinify( 'js/build/map.js' )
		->to( 'js/build/min/map.js' )
		->run();
	}

	/**
	 * This runs the stylesheet Scss process.
	 */
	private function buildStylesSass() {
		$this->taskScss([
			'css/global.scss' => 'css/build/global.css',
			'css/forms.scss'  => 'css/build/forms.css',
			'css/get-it.scss' => 'css/build/get-it.css',
			'css/hours.scss'  => 'css/build/hours.css',
		])
		->importDir( 'css/' )
		->run();
	}

	/**
	 * Tjhis runs the stylesheet minification.
	 */
	private function buildStylesMin() {
		$this->taskMinify( 'css/build/global.css' )
		->to( 'css/build/min/global.min.css' )
		->run();

		$this->taskMinify( 'css/build/forms.css' )
		->to( 'css/build/min/forms.min.css' )
		->run();

		$this->taskMinify( 'css/build/get-it.css' )
		->to( 'css/build/min/get-it.min.css' )
		->run();

		$this->taskMinify( 'css/build/hours.css' )
		->to( 'css/build/min/hours.min.css' )
		->run();
	}
}
