<?php
/**
 * The template for displaying location information in JSON format via
 * something like an API.
 *
 * @package MIT_Libraries_Parent
 * @since 1.2.1
 */

// Load the blog header.
include( '../../../wp-blog-header.php' );

$location = $_GET['location'];

$export = getExport( $location );

echo json_encode( $export );
