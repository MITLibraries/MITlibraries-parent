<?php
/**
 * The template for displaying location post information in a single display.
 *
 * @package MIT_Libraries_Parent
 * @since 1.12.0
 */

global $gStudy24Url;

$mapPage = '/locations/#!';

$locationId = get_the_ID();
$slug       = $post->post_name;

$subject  = cf( 'subject' );
$phone    = cf( 'phone' );
$email    = cf( 'email' );
$building = cf( 'building' );
$spaces   = cf( 'group_spaces' );
$arexpert = get_field( 'expert' );

$content_top_2021 = get_field( 'content_top_2021' );

$content1left = get_field( 'tab_1_content_left' );
$content1     = get_field( 'tab_1_content' );

$content1wide = 0;
if ( '' === $content1 ) {
	$content1wide = 1;
}

$study24 = get_field( 'study_24' );

$expertAskUrl = get_field( 'expert_ask_url' );
if ( '' === $expertAskUrl ) {
	$expertAskUrl = 'http://libraries.mit.edu/ask';
}

// Populate the array of available main images.
$numMain = 6;
$arMain  = array();
for ( $i = 1;$i <= $numMain;$i++ ) {
	$img = get_field( 'main_image' . $i, $locationId );
	if ( '' !== trim( $img ) ) {
		$arMain[] = $img;
	}
}

// Populate the array of available sub images.
$numSub = 8;
$arSub  = array();
$subs   = 0;
for ( $i = 1;$i <= $numSub;$i++ ) {
	$img = get_field( 'sub_image' . $i, $locationId );
	if ( '' !== trim( $img ) ) {
		$subs++;
		$arSub[] = $img;
	}
}

$strLocation = '';
if ( 0 >= $subs ) {
	$strLocation = 'noThumbs';
}

$alertTitle   = cf( 'alert_title' );
$alertContent = cf( 'alert_content' );
?>

<div class="libraryAlertTop">
	<?php
	require locate_template( 'inc/alert.php' );
	if ( 0 == $showAlert && '' !== $alertTitle ) {
		echo '<div class="libraryAlert">' . '<div class="location--alerts flex-container"><i class="icon-exclamation-sign"></i>' . '<div class="alertText">' . '<h3>' . $alertTitle . '</h3>' . '<p>' . $alertContent . '</p>' . '</div>' . '</div>' . '</div>';
	}
	?>
</div>				
	<div class="title-page libraryTitle flex-container">
		<div class="topLeft">
			<div class="libraryContent">
				<h1>
					<span class="libraryName"><?php the_title(); ?></span>
					<span class="subject-library"><?php echo $subject; ?></span>
				</h1>
				<div class="info-more">
					<a href="tel:<?php echo $phone; ?>" class="phone"><?php echo $phone; ?></a> |
						<?php if ( $email ) : ?>
					<a href="mailto:<?php echo $email; ?>" class="email"><?php echo $email; ?></a> |
						<?php endif; ?>
					<a href="<?php echo $mapPage . $slug; ?>">Room: <?php echo $building; ?> <i class="icon-arrow-right"></i></a>
				</div>
			</div><!-- end div.libraryContent -->

			<?php if ( is_active_sidebar( 'sidebar-location-hours' ) ) { ?>
				<div id="sidebar-location-hours" class="widget-area hours-today" role="complementary">
					<?php dynamic_sidebar( 'sidebar-location-hours' ); ?>
					<?php if ( true === $study24 ) : ?>
						<a class="study-24-7" href="<?php echo esc_url( $gStudy24Url ); ?>" alt="This location contains one or more study spaces available 24 hours a day, seven days a week. Click the link for more info." title="Study 24/7">Study 24/7</a>
					<?php endif; ?>
					<a href="/hours" class="link-hours-all">See all hours <i class="icon-arrow-right"></i></a>
				</div>
			<?php } else { ?>
				<div class="hours-today">
					<span>Today's hours: <strong data-location-hours="<?php the_title(); ?>"></strong></span>
					<?php if ( true === $study24 ) : ?>
						| <a class="study-24-7" href="<?php echo esc_url( $gStudy24Url ); ?>" alt="This location contains one or more study spaces available 24 hours a day, seven days a week. Click the link for more info." title="Study 24/7">Study 24/7</a>
					<?php endif; ?>
					<a href="/hours" class="link-hours-all">See all hours <i class="icon-arrow-right"></i></a>
				</div><!-- end div.hours-today -->
			<?php } ?>
		</div><!-- end div.topLeft -->
		<div class="topRight">
			<div class="library-image">
				<?php
					$val = $arMain[ array_rand( $arMain ) ];
				?>
				<?php if ( '' !== $val ) : ?>
					<img src="<?php echo $val; ?>" data-thumb="<?php echo $val; ?>" alt="<?php the_title(); ?>" />
				<?php endif; ?>
			</div><!-- end div.library-image -->
		</div><!-- end div.topRight -->
	</div><!-- end div.libraryTitle -->

	<div id="content" class="content <?php echo $strLocation; ?>">
		<div class="main-content content-main">
			<div class="tabcontent group noTab">
				<div class="tab tab1 active flex-container group" id="tab1">

					<div class="flex-item first group <?php if ( $content1wide ) : ?>span7 wideColumn<?php else : ?>span4<?php endif; ?>">

						<?php
							if ( $arexpert ) {
								$expertIndex = array_rand( $arexpert );
								$expert = $arexpert[ $expertIndex ];


								$name = $expert->post_title;
								$bio = $expert->post_excerpt;
								// $url = $expert->guid;
								$url = get_post_meta( $expert->ID, 'expert_url', 1 );

								if ( has_post_thumbnail( $expert->ID ) ) {
									$thumb = get_the_post_thumbnail( $expert->ID, array( 108, 108 ) );
								} else {
									$thumb = '';
								}

						?>
						<div class="profile-content">
							<?php if ( '' !== $thumb ) :
								echo $thumb;
							endif; ?>
							<div class="profile-content__body">
								<h3>
									<span class="intro">Featured expert</span>
									<span class="name"><?php echo $name; ?></span>
									<span class="bio"><?php echo $bio; ?></span>
								</h3>
								<div class="links">
									<a class="primary" href="<?php echo $url; ?>" target="_blank">How can I help? <i class="icon-arrow-right"></i></a>
									<a href="/experts">See all our experts <i class="icon-arrow-right"></i></a>
								</div>

							</div>

						</div>

						<?php
							}
								echo $content1left;
							?>

					</div>

					<div class="flex-item second span3">
						<?php echo $content_top_2021; ?>
					</div>

				</div>
			</div><!-- end div.tabcontent -->
		</div><!-- end div.col-1 -->
