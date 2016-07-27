<?php
/**
 * The sidebar containing the main widget area.
 *
 * If no active widgets in sidebar, let's hide it completely.
 *
 * @package MIT_Libraries_Parent
 * @since 1.2.1
 */

?>
	
	<div id="sidebarContent" class="sidebar span3">
		<div class="sidebarWidgets">
			<?php dynamic_sidebar( 'sidebar-1' ); ?>
		</div>
	</div>      
