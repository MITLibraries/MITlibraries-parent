<?php
/**
 * This is project's console commands configuration for Robo task runner.
 *
 * @see http://robo.li/
 */
class RoboFile extends \Robo\Tasks
{

    // define public methods as commands
    public function build()
    {
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
    public function buildJavascript()
    {
        $this->buildJavascriptConcat();
        $this->buildJavascriptUglify();
    }

    public function buildStyles()
    {
        $this->say("Building stylesheets...");
        $this->buildStylesSass();
        // Autoprefixer
        $this->buildStylesMin();
    }

    public function buildRelease()
    {
        $this->say("Building release...");
        // Gitinfo
        // Replace
    }

    // Private classes below this line.
    private function buildJavascriptConcat()
    {
        $this->say("Concatenating javascript files...");
        $this->taskConcat([
            'js/dev.js',
            'js/core.js',
            'js/ga_links.js',
            'js/menu.toggle.js',
            'js/libs/*.js',
            'js/hours-lookup.js',
            'js/alerts.js',
            'js/fonts.js'
        ])
        ->to('js/build/production.js')
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
            'js/fonts.js'
        ])
        ->to('js/build/home.js')
        ->run();

        $this->taskConcat([
            'js/sticky/*.js',
            'js/sticky/scrollStick/*.js',
            'libs/datepicker/glDatepicker.js',
            'js/make.datepicker.js'
        ])
        ->to('js/build/hours.js')
        ->run();

        $this->taskConcat([
            'js/search.js',
            'js/search-ie.js',
            'js/ga_discovery.js'
        ])
        ->to('js/build/search.js')
        ->run();

        $this->taskConcat([
            'js/map.js'
        ])
        ->to('js/build/map.js')
        ->run();
    }

    private function buildJavascriptUglify()
    {
        $this->say("JS uglification isn't implemented yet...");
    }

    private function buildStylesSass()
    {
        $this->taskScss([
            'css/global.scss' => 'css/build/global.css',
            'css/forms.scss'  => 'css/build/forms.css',
            'css/get-it.scss' => 'css/build/get-it.css',
            'css/hours.scss'  => 'css/build/hours.css'
        ])
        ->importDir('css/')
        ->run();
    }

    private function buildStylesMin()
    {
        $this->taskMinify('css/build/global.css')
        ->to('css/build/min/global.min.css')
        ->run();

        $this->taskMinify('css/build/forms.css')
        ->to('css/build/min/forms.min.css')
        ->run();

        $this->taskMinify('css/build/get-it.css')
        ->to('css/build/min/get-it.min.css')
        ->run();

        $this->taskMinify('css/build/hours.css')
        ->to('css/build/min/hours.min.css')
        ->run();
    }
}