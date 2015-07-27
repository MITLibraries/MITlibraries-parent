<?php
/**
 * The template used for displaying conditional secondary menu in page.php
 *
 * @package WordPress
 * @subpackage Twenty_Twelve
 * @since Twenty Twelve 1.0
 */
 
global $isRoot;

?>

<nav class="navbar navbar-default" role="navigation">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
	    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
	  <a class="navbar-brand mobile-display">
                <?php _e( 'View Menu' ); ?>
            </a>
    </div>

        <?php
            wp_nav_menu( array(
                'menu'              => 'Secondary Menu',
                'theme_location'    => 'secondary',
                'depth'             => 2,
                'container_class'   => 'collapse navbar-collapse nav-menu',
				'container_id'      => 'bs-example-navbar-collapse-1',
                'menu_class'        => 'nav navbar-nav nav-second',
                'fallback_cb'       => false,
                'walker'            => new navwalker())
            );
            
                       

        ?>

    </div>
</nav>