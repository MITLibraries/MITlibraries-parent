<?php
/**
 * Class that defines a settings form for network-wide alerts.
 *
 * @package MIT_Libraries_Parent
 * @since 1.13.0
 */

namespace Mitlib\Alerts;

class Settings {

	const PERMS = 'manage_options';

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

	public static function general() {
		echo '';
	}

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
		echo wp_kses( vsprintf( $template, $values ) );
	}

}
