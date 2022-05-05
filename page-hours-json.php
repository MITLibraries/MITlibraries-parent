<?php
/**
 * Template Name: Location Hours
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site will use a
 * different template.
 *
 * @package MIT_Libraries_Parent
 * @since 1.2.1
 */

$pageRoot = getRoot( $post );
$section = get_post( $pageRoot );
if ( ! $_GET['d'] ) {
	$inDate = 'Now';
} else {
	$inDate = $_GET['d'];
}

get_header();

$nextMon = 'next monday';

$dt = strtotime( $inDate );
$dtMo = date( 'n', $dt );
$dtDay = date( 'j', $dt );
$dtYear = date( 'Y', $dt );
$dtISOYear = date( 'o', $dt );
$dtWeek = date( 'W', $dt );
$dtWeekday = date( 'N', $dt );

?>
<script>
	todayDate = new Date(<?php echo $dtYear; ?>,<?php echo ( $dtMo - 1 ); ?>,<?php echo $dtDay; ?>);
</script>
<?php

// $today = strtotime($dtYear."W".$dtWeek.$dtWeekday);
$today = strtotime( $inDate );
$dtTodayMo = date( 'n' );
$dtTodayDay = date( 'j' );
$dtTodayYear = date( 'Y' );
$dtTodayWeek = date( 'W' );
$dtTodayWeekday = date( 'N' );


$now = strtotime( $dtTodayYear . 'W' . $dtTodayWeek . $dtTodayWeekday );

$wk = date( 'W', $dt );

if ( $wk == '01' && $dtMo == '12' ) {
	$dtYear++;
}

$mon = strtotime( $dtISOYear . 'W' . $wk . '1' );
$tue = strtotime( $dtISOYear . 'W' . $wk . '2' );
$wed = strtotime( $dtISOYear . 'W' . $wk . '3' );
$thu = strtotime( $dtISOYear . 'W' . $wk . '4' );
$fri = strtotime( $dtISOYear . 'W' . $wk . '5' );
$sat = strtotime( $dtISOYear . 'W' . $wk . '6' );
$sun = strtotime( $dtISOYear . 'W' . $wk . '7' );

$arr_days = array();

$arr_days[] = $mon;
$arr_days[] = $tue;
$arr_days[] = $wed;
$arr_days[] = $thu;
$arr_days[] = $fri;
$arr_days[] = $sat;
$arr_days[] = $sun;


$path = get_permalink();

$prevWeek = date( 'Y-n-j', strtotime( '-7 day', $today ) );
$nextWeek = date( 'Y-n-j', strtotime( '+7 day', $today ) );
$thisWeek = date( 'Y-n-j' );

$alertTitle = cf( 'alert_title' );
$alertContent = cf( 'alert_content' );

?>
	
<?php get_template_part( 'inc/breadcrumbs' ); ?>

<div id="stage" class="hoursHeader inner hours group" role="main">
	<div class="title-page flex-container">
	<div class="libraryContent">
	  <h1>
		<?php showBreadTitle(); ?>
	  </h1>
	</div>
	<div class="middleAlert">
	  <?php
	if ( have_posts() ) :
	while ( have_posts() ) : the_post();
		  the_content(); ?>
	  <?php  endwhile;
endif;
wp_reset_query();  ?>
	</div>
	<div class="wrap-cal-hours hidden-phone">
	  <div id="hourCalendar" class="cal-hours"> </div>
	</div>
	</div>
	<!-- end div.title-page --> 
	
	<script type="text/javascript">
		jQuery(window).load(function(){
	  
		jQuery("#hourCalendar").glDatePicker({
	  cssName: "default",
	  showAlways: true,
	  selectedDate: todayDate,
	  prevArrow: '<i class="icon-arrow-left"></i>',
	  nextArrow: '<i class="icon-arrow-right"></i>',
	  dowNames: "SMTWTFS",
	  dowOffset: 1,
	onClick: function(target, cell, date, date2) {
	var newDate = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
	var path = window.location.pathname;
	var newUrl = path+"?d="+newDate;
	window.location = newUrl;
	}
	
});
	  
	  
	  
		});
</script> 
</div>
<!--stage ends-->
<div id="content">
	<div id="hourContent" class="content-page">
	<div id="hourNav-sticky-wrapper" class="sticky-wrapper" style="height: 0px;">
	  <div id="hourNav" style="width: 1008px;">
		<div id="prevWeek"> <i class="icon-arrow-left"></i> <a href="<?php echo $path . '?d=' . $prevWeek; ?>">Previous week</a> </div>
		<div id="thisWeek"> <a href="<?php echo $path . '?d=' . $thisWeek; ?>">This week</a> </div>
		<div id="nextWeek"> <a href="<?php echo $path . '?d=' . $nextWeek; ?>">Next week</a> <i class="icon-arrow-right"></i> </div>
	  </div>
	</div>
	<style type="text/css">
.hrList td.loc {
	width:200px;
}
tr:nth-child(even) td {
	background: #eceaea; 
}
	</style>
	<!-- TABLE BEGINS -->
	
	<table class="hrList">
		<thead>
			<tr>
				<th class="name">Locations</th>
				<?php
				$next = '';
				for ( $i = 0;$i <= 6;$i++ ) {
					$day = $arr_days[ $i ];
					// Now we build the list of classes for this header cell.
					$th_classes = 'fullDay';
					if ( '' !== $next ) {
						$th_classes .= ' ' . $next;
						$next = '';
					}
					if ( 0 === $i ) {
						$th_classes .= ' firstDisplay';
					}
					if ( $now === $day ) {
						$th_classes .= ' cur';
						$next = 'curAfter';
					}
				?>
				<th class="<?php echo esc_attr( $th_classes ); ?>">
					<span class="fullDay">
						<?php echo esc_html( date( 'l', $day ) ); ?>
						<div class="date"><?php echo esc_html( date( 'M j', $day ) );?></div>
					</span>
					<span class="mobileDay">
						<?php echo esc_html( date( 'D', $day ) ); ?>
						<div class="date"><?php echo esc_html( date( 'M \<\b\r\\/> j', $day ) );?></div>
					</span>
				</th>
				<?php } ?>
			</tr>
		</thead>
	  <tbody>
		<?php
$args = array(
	'post_type' => 'location',
	'meta_key' => 'primary_location',
	'meta_value' => 1,
	'posts_per_page' => -1,
	/*'orderby' => 'menu_order',*/
	'orderby' => 'name',
	'order' => 'ASC',
);
$libraryList = new WP_Query( $args );?>
		<?php while ( $libraryList->have_posts() ) : $libraryList->the_post();
$locationId = get_the_ID();
$slug = $post->post_name;
$mapPage = '/locations/#!';

?>
		<tr data-location="<?php the_title(); ?>">
		  <td width="260" class="name"><div class="nameHolder">
			  <h3> <a href="<?php
					$post_object = get_field( 'display_page' );
					if ( $post_object ) :
						// Dont even ask why.
						$post = $post_object;
						setup_postdata( $post );
				?>
			<?php the_permalink(); ?>">
				<?php the_title(); ?>
				</a></h3>
			  <?php wp_reset_postdata();  ?>
			  <?php endif; ?>
			  <?php the_field( 'phone', $locationId ); ?>
			  <br />
			  <a class="map" href="<?php echo $mapPage . $slug; ?>">Map:&nbsp;
			  <?php  the_field( 'building', $locationId ); ?>
			  </a>
			  <?php if ( get_field( 'study_24', $locationId ) ) { ?>
			  <span class="hidden">|</span> <a class="space247" href="/study/24x7/" alt="This location contains one or more study spaces available 24 hours a day, seven days a week. Click the link for more info." title="Study 24/7">Study 24/7</a>
			  <?php } ?>
			  <?php if ( get_field( 'alert_title', $locationId ) ) { ?>
			  <div class="libraryAlert"> <i class="icon-exclamation-sign"></i>
				<div class="alertText">
			  <div class="la-title"><?php the_field( 'alert_title', $locationId ); ?></div>
				<?php the_field( 'alert_content', $locationId ); ?>
			  </div>
			  </div>
			  <?php } ?>
			</div></td>
		  <?php for ( $i = 0;$i <= 6;$i++ ) { ?>
		  <?php
	  $curDay = $arr_days[ $i ];

	  if ( $curDay == $now ) {
		$class = 'cur';
		$next = 'curAfter';
	  } else {
		$class = $next;
		$next = '';
	  }
	?>
		<td data-day="<?php echo esc_attr( $i ); ?>" class="<?php echo esc_attr( $class ); ?>" data-foo="bar">
			<span class="hidden-non-mobile date-label">
				<?php echo esc_html( date( 'D', $curDay ) ) . '<br/>' . esc_html( date( 'n/j', $curDay ) ); ?>
			</span>
		</td>
		  <?php } ?>
		</tr>
		<?php wp_reset_postdata();
endwhile;    ?>
	  </tbody>
		<thead>
			<tr>
				<th class="name">More Locations</th>
				<?php for ( $i = 0;$i <= 6;$i++ ) {
					$day = $arr_days[ $i ];
					// Now we build the list of classes for this header cell.
					$th_classes = 'fullDay';
					if ( '' !== $next ) {
						$th_classes .= ' ' . $next;
						$next = '';
					}
					if ( 0 === $i ) {
						$th_classes .= ' firstDisplay';
					}
					if ( $now === $day ) {
						$th_classes .= ' cur';
						$next = 'curAfter';
					}
				?>
				<th class="<?php echo esc_attr( $th_classes ); ?>">
					<span class="fullDay">
						<?php echo esc_html( date( 'l', $day ) ); ?>
						<div class="date"><?php echo esc_html( date( 'M j', $day ) );?></div>
					</span>
					<span class="mobileDay">
						<?php echo esc_html( date( 'D', $day ) ); ?>
						<div class="date"><?php echo esc_html( date( 'M \<\b\r\\/> j', $day ) );?></div>
					</span>
				</th>
				<?php } ?>
			</tr>
		</thead>
		<?php

$args = array(
	'post_type' => 'location',
	'meta_key' => 'primary_location',
	'meta_value' => 0,
	'posts_per_page' => -1,
	/*'orderby' => 'menu_order',*/
	'orderby' => 'name',
	'order' => 'ASC',
	// Excludes DIRC and Stata.
	'meta_query' => array(
		'relation' => 'AND',
		array(
			'key' => 'no_hours',
			'value' => 0,
			'compare' => '=',
		),
	),
);
$libraryList2 = new WP_Query( $args );?>
		<?php while ( $libraryList2->have_posts() ) : $libraryList2->the_post();
$locationId = get_the_ID();
$slug = $post->post_name;
$mapPage = '/locations/#!';

?>
	  <tr class="moreLocs" data-location="<?php the_title(); ?>">
		<td width="260"  class="name"><div class="nameHolder">
		  
	
<?php
$displayPage = get_field( 'display_page' );
$pageID = $displayPage->ID;
$pageLink = get_permalink( $pageID );
			  ?>
<h3><a href="<?php echo $pageLink; ?>"><?php the_title(); ?></a></h3>
	
			  
			  
			  
			  
			<?php the_field( 'phone', $locationId ); ?>
			<br />
			<a class="map" href="<?php echo $mapPage . $slug; ?>">Map:&nbsp;
			<?php  the_field( 'building', $locationId ); ?>
			</a>
			<?php if ( get_field( 'study_location', $locationId ) ) { ?>
			<a class="space247" href="/study/24x7/" alt="This location contains one or more study spaces available 24 hours a day, seven days a week. Click the link for more info." title="Study 24/7"> | Study 24/7</a>
			<?php } ?>
			  <?php if ( get_field( 'alert_title', $locationId ) ) { ?>
			  <div class="libraryAlert"> <i class="icon-exclamation-sign"></i>
				<div class="alertText">
			  <div class="la-title"><?php the_field( 'alert_title', $locationId ); ?></div>
				<?php the_field( 'alert_content', $locationId ); ?>
			  </div>
			  </div>
			  <?php } ?>
		  </div></td>
		<?php for ( $i = 0;$i <= 6;$i++ ) { ?>
		<?php
$curDay = $arr_days[ $i ];

if ( $curDay == $now ) {
$class = 'cur';
$next = 'curAfter';
} else {
$class = $next;
$next = '';
}
?>
		<td data-day="<?php echo esc_attr( $i ); ?>" class="<?php echo esc_attr( $class ); ?> noPadding">
			<span class="hidden-non-mobile date-label">
				<?php echo esc_html( date( 'D', $curDay ) ) . '<br/>' . esc_html( date( 'n/j', $curDay ) ); ?>
			</span>
		</td>
		<?php } ?>
	  </tr>
	   <?php wp_reset_postdata();  ?>
	  <?php endwhile;   ?>
		</tbody>
	  
	</table>
	
	<!-- TABLE ENDS -->

	<?php if ( is_active_sidebar( 'sidebar-below-hours-grid' ) ) : ?>
		<?php dynamic_sidebar( 'sidebar-below-hours-grid' ); ?>
	<?php endif; ?>

	</div> <!-- end .content-page -->
</div> <!-- end #content -->

<?php get_footer(); ?>
