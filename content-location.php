<?php
/**
 * The template for displaying location post information.
 *
 * @package MIT_Libraries_Parent
 * @since 1.2.1
 */

	global $gStudy24Url;

	$mapPage = '/locations/#!';

	$locationId = get_the_ID();
	$slug = $post->post_name;

	$subject = cf( 'subject' );
	$phone = cf( 'phone' );
	$email = cf( 'email' );
	$building = cf( 'building' );
	$spaces = cf( 'group_spaces' );
	// $equipment = cf("equipment");
	$arexpert = get_field( 'expert' );

	$title1 = cf( 'tab_1_title' );
	$subtitle1 = cf( 'tab_1_subtitle' );
	$content1left = get_field( 'tab_1_content_left' );
	$content1 = get_field( 'tab_1_content' );

	$title2 = cf( 'tab_2_title' );
	$subtitle2 = cf( 'tab_2_subtitle' );
	$content2left = get_field( 'tab_2_content_left' );
	$content2 = get_field( 'tab_2_content' );

	$content2wide = 0;
	if ( '' === $content2 ) {
		$content2wide = 1;
	}

	$content1wide = 0;
	if ( '' === $content1 ) {
		$content1wide = 1;
	}

	$study24 = get_field( 'study_24' );

	$temp = $post;
	$post = $temp;


	$reserveText = get_field( 'reserve_text' );
	if ( '' === $reserveText ) {
		$reserveText = 'Reserve Group Study Space';
	}
	$reserveUrl = get_field( 'reserve_url' );



	$expertAskUrl = get_field( 'expert_ask_url' );
	if ( '' === $expertAskUrl ) {
		$expertAskUrl = 'http://libraries.mit.edu/ask';
	}


	$numMain = 6;
	$arMain = array();

	for ( $i = 1;$i <= $numMain;$i++ ) {
		$img = get_field( 'main_image' . $i, $locationId );
		if ( $img != '' ) {
			$arMain[] = $img; }
	}

	$numSub = 8;
	$arSub = array();
	$subs = 0;
	for ( $i = 1;$i <= $numSub;$i++ ) {
		$img = get_field( 'sub_image' . $i, $locationId );
		if ( $img != '' ) {
			$subs++;
			$arSub[] = $img;
		}
	}

	$strLocation = '';
	if ( $subs <= 0 ) {
		$strLocation = 'noThumbs';
	}


	$alertTitle = cf( 'alert_title' );
	$alertContent = cf( 'alert_content' );
?>

<div class="libraryAlertTop">
<?php
include( locate_template( 'inc/alert.php' ) );
if ( $showAlert === 0 && $alertTitle !== '' ) :
?>
	<div class="libraryAlert">
		<div class="location--alerts flex-container">
			<i class="icon-exclamation-sign"></i>
			<div class="alertText">
				<h3><?php echo esc_html( $alertTitle ); ?></h3>
				<p><?php echo esc_html( $alertContent ); ?></p>
			</div>
		</div>
	</div>
<?php endif; ?>
</div>				
	<div class="title-page libraryTitle flex-container">
		
		
<!--		<div class="flex-item"> -->
			<div class="topLeft">
				<div class="libraryContent">
					<h1>
						<span class="libraryName"><?php the_title(); ?></span>
						<span class="subject-library"><?php echo esc_html( $subject ); ?></span>
					</h1>
					<div class="info-more">
						<a href="tel:<?php echo esc_url( $phone ); ?>" class="phone"><?php echo esc_html( $phone ); ?></a> |
							<?php if ( $email ) : ?>
						<a href="mailto:<?php echo esc_url( $email ); ?>" class="email"><?php echo esc_html( $email ); ?></a> |
							<?php endif; ?>
						<a href="<?php echo esc_url( $mapPage . $slug ); ?>">Room: <?php echo esc_html( $building ); ?> <i class="icon-arrow-right"></i></a>
					</div>
				</div><!-- end div.libraryContent -->

				<div class="hours-today">
					<span>Today's hours: <strong data-location-hours="<?php the_title(); ?>"></strong></span>
					<?php if ( $study24 == 1 ) : ?>
						| <a class="study-24-7" href="<?php echo esc_url( $gStudy24Url ); ?>" alt="This location contains one or more study spaces available 24 hours a day, seven days a week. Click the link for more info." title="Study 24/7">Study 24/7</a>
					<?php endif; ?>
					<a href="/hours" class="link-hours-all">See all hours <i class="icon-arrow-right"></i></a>
				</div><!-- end div.hours-today -->
			</div><!-- end div.topLeft -->
		<!-- </div> end div.flex-item -->
<!--		<div class="flex-item"> -->
			<div class="topRight">
				<div class="library-image">
						<?php
							$val = $arMain[ array_rand( $arMain ) ];
						?>
						<?php if ( $val != '' ) : ?>
						<img src="<?php echo esc_url( $val ); ?>" data-thumb="<?php echo esc_attr( $val ); ?>" alt="<?php the_title(); ?>" />
						<?php endif; ?>
				</div><!-- end div.library-image -->
			</div><!-- end div.topRight -->
		<!-- </div> end div.flex-item -->
	</div><!-- end div.libraryTitle -->

	<div id="content" class="content <?php echo esc_attr( $strLocation ); ?> has-sidebar">
		<div class="main-content content-main">

			<?php
			if ( '' != $title1 || '' != $title2 ) :
				$noTab = '';
			?>
			<ul class="tabnav">
				<?php if ( '' != $title1 ) : ?>
				<li class="active tab1st"><h2 class="title-tab"><a href="#tab1"><?php echo esc_html( $title1 ); ?><span class="title-sub hidden-mobile"><?php echo esc_html( $subtitle1 ); ?></span class="title-sub"></a></h2></li>
				<?php endif; ?>
				<?php if ( '' != $title2 ) : ?>
				<li class="tab2nd"><h2 class="title-tab"><a href="#tab2"><?php echo esc_html( $title2 ); ?><span class="title-sub hidden-mobile"><?php echo esc_html( $subtitle2 ); ?></span class="title-sub"></a></h2></li>
				<?php endif; ?>
			</ul>
			<?php
			else :
				$noTab = ' noTab';
			endif;
			?>

			<div class="tabcontent group <?php echo esc_attr( $noTab ); ?>">

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
								<?php if ( $thumb != '' ) :
									echo $thumb;
								endif; ?>
								<div class="profile-content__body">
									<h3>
										<span class="intro">Featured expert</span>
										<span class="name"><?php echo esc_html( $name ); ?></span>
										<span class="bio"><?php echo esc_html( $bio ); ?></span>
									</h3>
									<div class="links">
										<a class="primary" href="<?php echo esc_url( $url ); ?>" target="_blank">How can I help? <i class="icon-arrow-right"></i></a>
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
							<?php echo $content1; ?>
						</div>

				</div>
				<?php if ( $title2 != '' ) : ?>
				
				<div class="tab tab2 flex-container group" id="tab2">

						<div class="flex-item first <?php if ( $content2wide ) : ?>span8 wideColumn<?php else : ?>span2<?php endif; ?>">
						<?php echo $content2left; ?>
						
						<?php if ( $reserveUrl != '' ) : ?>
									<a class="reserve hidden-phone" href="<?php echo esc_url( $reserveUrl ); ?>"><?php echo esc_html( $reserveText ); ?></a>
						<?php endif; ?>

						
						</div>

						<div class="flex-item second span6">
							<?php echo $content2; ?>
						</div>

				</div>

				<?php endif; ?>

			</div><!-- end div.tabcontent -->

		</div><!-- end div.col-1 -->
