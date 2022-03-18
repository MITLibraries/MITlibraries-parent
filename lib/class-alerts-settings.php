<?php
/**
 * Class that defines a settings form for network-wide alerts.
 *
 * @package MIT_Libraries_Parent
 * @since 2.1.0
 */

namespace Mitlib\Alerts;

/**
 * Defines the settings field used by the alerts system - a reference to the API
 * from which alerts should be loaded.
 */
class Settings {

	const PERMS = 'manage_options';

	/**
	 * Entry point for the settings - define the variable and the section which
	 * contains it.
	 */
	public static function init() {
		register_setting( 'mitlib_alerts', 'source' );

		add_settings_section(
			'mitlib_alerts_general',
			'',
			array( 'Mitlib\Alerts\Settings', 'general' ),
			'mitlib-alerts-dashboard'
		);

		add_settings_field(
			'source',
			'Alerts API endpoint',
			array( 'Mitlib\Alerts\Settings', 'source_callback' ),
			'mitlib-alerts-dashboard',
			'mitlib_alerts_general',
			array(
				'label_for' => 'source',
				'class' => 'mitlib_alerts_row',
			)
		);
	}

	/**
	 * This is an empty rendering callback, because the section which contains
	 * the defined field doesn't need to display anything on the settings form.
	 */
	public static function general() {
		echo '';
	}

	/**
	 * This is the rendering callback for the settings field.
	 */
	public static function source_callback() {
		$allowed_html = array(
			'input' => array(
				'type' => array(),
				'name' => array(),
				'value' => array(),
				'id' => array(),
				'size' => array(),
			),
			'p' => array(),
		);

		$template = '<input type="text" name="%s" value="%s" id="%s" size="60"><p>This should be the fully-qualified URL for the WordPress application which hosts Alert content. The original value was https://libraries.mit.edu/wp-json/wp/v2/posts/</p>';
		$values = array(
			'name' => 'source',
			'value' => esc_attr( get_option( 'source' ) ),
			'id' => 'source',
		);
		echo wp_kses( vsprintf( $template, $values ), $allowed_html );
	}

}
