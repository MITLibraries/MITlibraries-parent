<?php

	$frontpage_id = get_option('page_on_front');
	$showAlert = get_post_meta($frontpage_id, 'show_alert', true);
	$alertText = trim(get_post_meta($frontpage_id, 'alert_text', true));
	$alertLink = trim(get_post_meta($frontpage_id, 'alert_link', true));

	if ($showAlert == 1 && $alertText != "") {

		if(is_front_page()) {
			if ($alertLink != '') {
				echo '<h1 class="alert"><a href="'.$alertLink.'">'.$alertText.'</a></h1>';
				return;
			}
			else {
				echo '<h1 class="alert">'.$alertText.'</h1>';
				return;
			}
		}

		if(is_page('hours')) {
			if ($alertLink != '') {
				echo '<div class="libraryAlert"><span><a href="'.$alertLink.'">'.$alertText.'</a></span></div>';
				return;
			}
			else {
				echo '<div class="libraryAlert"><span>'.$alertText.'</span></div>';
				return;
			}
		}

		
		if ($alertLink != '') {
			echo '<div class="libraryAlert"><a href="'.$alertLink.'">'.$alertText.'</a></div>';
			return;
		}
		else {
			echo '<div class="libraryAlert">'.$alertText.'</div>';
			return;
		}
		
	}

	else {
		return;
	}

?>