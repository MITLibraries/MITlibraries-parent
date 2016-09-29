<?php
/**
 * This defines the search interface widget that appears throughout the theme.
 *
 * @package MIT_Libraries_Parent
 * @since 1.6.0
 */

/**
 * Defines MIT Libraries' Search Widget
 */
class MitlibSearchWidget extends WP_Widget {

	/**
	 * Constructor
	 */
	function __construct() {
		$name = 'Libraries Search';
		parent::WP_Widget( false, $name );
	}

	/**
	 * Widget method
	 *
	 * @see WP_Widget::widget -- do not rename this
	 * @param object $args See Wordpress documentation.
	 * @param object $instance See Wordpress documentation.
	 */
	function widget( $args, $instance ) {
		?>
<div id="search-main" class="search--lib-resources flex-container <?php echo esc_attr( $args['class'] ); ?>">
	<?php
		load_template( dirname( __FILE__ ) . '/templates/search.html' );
	?>
	<a href="<?php echo esc_url( $instance['eds_advanced'] ); ?>" class="search-advanced bartonplus active no-js-hidden">Go to BartonPlus advanced search</a>
	<a href="https://libraries.mit.edu/barton-advanced" class="search-advanced barton no-js-hidden">Go to Barton advanced search</a>
	<a href="https://mit.worldcat.org/advancedsearch" class="search-advanced worldcat no-js-hidden">Go to WorldCat advanced search</a>
	<a href="https://libraries.mit.edu/barton-reserves" class="search-advanced course-reserves no-js-hidden">Go to Course Reserves advanced search</a>
</div><!-- end div.search-main -->
		<?php
	}

	/**
	 * Update method
	 *
	 * @see WP_Widget::update -- do not rename this
	 * @param object $new_instance See Wordpress widget documentation.
	 * @param object $old_instance See Wordpress widget documentation.
	 */
	function update( $new_instance, $old_instance ) {
		$instance = $old_instance;
		$instance['eds_advanced'] = esc_url_raw( $new_instance['eds_advanced'] );
		return $instance;
	}

	/**
	 * Form method
	 *
	 * @see WP_Widget::form -- do not rename this
	 * @param object $instance See Wordpress widget documentation.
	 */
	function form( $instance ) {
		$eds_advanced = esc_attr( $instance['eds_advanced'] );

		?>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'eds_advanced' ) ); ?>"><?php esc_attr_e( 'EDS Advanced Search URL:' ); ?></label>
			<input class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'eds_advanced' ) ); ?>" type="text" name="<?php echo esc_attr( $this->get_field_name( 'eds_advanced' ) ); ?>" value="<?php echo esc_url( $eds_advanced ); ?>">
		</p>
		<?php
	}
} // End class MitlibSearchWidget.

$mitlib_search = function() {
	return register_widget( 'MitlibSearchWidget' );
};

add_action( 'widgets_init', $mitlib_search );
