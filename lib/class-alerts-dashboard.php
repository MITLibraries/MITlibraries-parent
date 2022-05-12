<?php
/**
 * Class that defines a settings form for network-wide alerts.
 *
 * @package MIT_Libraries_Parent
 * @since 1.13.0
 */

namespace Mitlib\Alerts;

class Dashboard {

	const PERMS = 'manage_options';

	public static function init() {
		if ( current_user_can( self::PERMS ) ) {
			add_options_page(
				'MIT Libraries Alerts',
				'MITlib Alerts',
				self::PERMS,
				'mitlib-alerts',
				array( 'Mitlib\Alerts\Dashboard', 'page' )
			);
		}
	}

	public static function page() {
		// Permissions check.
		if ( ! current_user_can( self::PERMS ) ) {
			return;
		}

		// Store updated values if posted.
		$action = filter_input( INPUT_POST, 'action' );
		if ( ! empty( $action ) ) {
			self::update();
		}

		// Render the form.
		echo '<div class="wrap">';
		echo '<h1>MIT Libraries Alerts settings</h1>';
		echo '<form method="post" action="">';
		wp_nonce_field( 'custom_nonce_action', 'custom_nonce_field' );
		settings_fields( 'mitlib_alerts' );
		do_settings_sections( 'mitlib-alerts-dashboard' );
		submit_button( 'Update alerts settings' );
		echo '</form>';
		echo '</div>';

	}

	public static function update() {
		// Check the nonce.
		check_admin_referer( 'custom_nonce_action', 'custom_nonce_field' );

		// Perform the updates. Looking up the action variable is duplicative - not sure how much that matters.
		if ( 'update' == filter_input( INPUT_POST, 'action' ) ) {
			// Set default values.
			$source = '';

			// Read the submitted values.
			if ( filter_input( INPUT_POST, 'source' ) ) {
				$source = sanitize_text_field(
					wp_unslash( filter_input( INPUT_POST, 'source' ) )
				);
			}

			// Store values.
			update_option( 'source', $source );
		}

		echo '<div class="updated"><p>The Alerts API endpoint has been updated.</p></div>';

	}
}
