<?php
/**
 * Template Name: Location Hours Template
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site will use a
 * different template.
 *
 * @package WordPress
 * @subpackage Twenty_Twelve
 * @since Twenty Twelve 1.0
 */
 
$pageRoot = getRoot($post);
$section = get_post($pageRoot);
if (!$_GET["d"]) {
	$inDate = "Now";
} else {
	$inDate = $_GET["d"];
}

get_header();

$nextMon = "next monday";

$dt = strtotime($inDate);
$dtMo = date("n", $dt);
$dtDay = date("j", $dt);
$dtYear = date("Y", $dt);
$dtWeek = date("W", $dt);
$dtWeekday = date("N", $dt);

?>
<script>
	todayDate = new Date(<?php echo $dtYear; ?>,<?php echo ($dtMo-1); ?>,<?php echo $dtDay; ?>);
</script>
<?php

//$today = strtotime($dtYear."W".$dtWeek.$dtWeekday);
$today = strtotime($inDate);

$dtTodayMo = date("n");
$dtTodayDay = date("j");
$dtTodayYear = date("Y");
$dtTodayWeek = date("W");
$dtTodayWeekday = date("N");


$now = strtotime($dtTodayYear."W".$dtTodayWeek.$dtTodayWeekday);

$wk = date("W", $dt);

if ($wk == "01" && $dtMo == "12") {
	$dtYear++;
}	

$mon = strtotime($dtYear."W".$wk."1");
$tue = strtotime($dtYear."W".$wk."2");
$wed = strtotime($dtYear."W".$wk."3");
$thu = strtotime($dtYear."W".$wk."4");
$fri = strtotime($dtYear."W".$wk."5");
$sat = strtotime($dtYear."W".$wk."6");
$sun = strtotime($dtYear."W".$wk."7");

$arDays = array();

$arDays[] = $mon;
$arDays[] = $tue;
$arDays[] = $wed;
$arDays[] = $thu;
$arDays[] = $fri;
$arDays[] = $sat;
$arDays[] = $sun;

$dfDow = "M j";
$dfDowMobile = 'M \<\b\r\\/> j';


$path = get_permalink();

$prevWeek = date("Y-n-j", strtotime("-7 day", $today));
$nextWeek = date("Y-n-j", strtotime("+7 day", $today));
$thisWeek = date("Y-n-j");

 ?>


<div id="stage" class="inner thinSidebar hours group" role="main">

	<div class="title libraryTitle">

		<div class="libraryContent">
			<h1><?php showBreadTitle(); ?></h1>
		</div>
			
			<?php 
				$hoursAlert = apply_filters('the_content', $post->post_content);
				if($hoursAlert != ''): 
			?>
				<div class="upcomingSpecial">
					<?php echo $hoursAlert; ?>
				</div>
			<?php endif; ?>

			<?php 
				include(locate_template('inc/alert.php'));
			 ?>
			
		<div id="hourCalendar" class="hourCalendar hidden-phone">
		</div>

	</div>		
	
	<div id="content" class="allContent">

		<div id="hourContent" class="light">
		
			<div id="hourNav">
				<div id="prevWeek"><i class="icon-arrow-left"></i> <a href="<?php echo $path."?d=".$prevWeek; ?>">Previous week</a></div>
				<div id="thisWeek"><a href="<?php echo $path."?d=".$thisWeek; ?>"">This week</a></div>
				<div id="nextWeek"><a href="<?php echo $path."?d=".$nextWeek; ?>"">Next week</a> <i class="icon-arrow-right"></i></div>
			</div>
			<table class="hrList">
				<thead>
					<th class="name">Locations</th>
					<?php $next = ""; ?>
					
					<?php $i = 0; $day = $arDays[$i]; ?>
					<th class="firstDisplay <?php echo $next; $next=""; if ($now == $day) { echo "cur"; $next="curAfter";} ?>">
						<span class="fullDay"><?php echo date("l", $day); ?><div class='date'><?php echo date($dfDow, $day);?></div></span>
						<span class="mobileDay"><?php echo date("D", $day); ?><div class='date'><?php echo date($dfDowMobile, $day);?></div></span>
					</th>
					<?php $i = 1; $day = $arDays[$i]; ?>
					<th class="<?php echo $next; $next=""; if ($now == $day) { echo "cur"; $next="curAfter";} ?>">
						<span class="fullDay"><?php echo date("l", $day); ?><div class='date'><?php echo date($dfDow, $day);?></div></span>
						<span class="mobileDay"><?php echo date("D", $day); ?><div class='date'><?php echo date($dfDowMobile, $day);?></div></span>
					</th>
					<?php $i = 2; $day = $arDays[$i]; ?>
					<th class="<?php echo $next; $next=""; if ($now == $day) { echo "cur"; $next="curAfter";} ?>">
						<span class="fullDay"><?php echo date("l", $day); ?><div class='date'><?php echo date($dfDow, $day);?></div></span>
						<span class="mobileDay"><?php echo date("D", $day); ?><div class='date'><?php echo date($dfDowMobile, $day);?></div></span>
					</th>
					<?php $i = 3; $day = $arDays[$i]; ?>
					<th class="<?php echo $next; $next=""; if ($now == $day) { echo "cur"; $next="curAfter";} ?>">
						<span class="fullDay"><?php echo date("l", $day); ?><div class='date'><?php echo date($dfDow, $day);?></div></span>
						<span class="mobileDay"><?php echo date("D", $day); ?><div class='date'><?php echo date($dfDowMobile, $day);?></div></span>
					</th>
					<?php $i = 4; $day = $arDays[$i]; ?>
					<th class="<?php echo $next; $next=""; if ($now == $day) { echo "cur"; $next="curAfter";} ?>">
						<span class="fullDay"><?php echo date("l", $day); ?><div class='date'><?php echo date($dfDow, $day);?></div></span>
						<span class="mobileDay"><?php echo date("D", $day); ?><div class='date'><?php echo date($dfDowMobile, $day);?></div></span>
					</th>
					<?php $i = 5; $day = $arDays[$i]; ?>
					<th class="<?php echo $next; $next=""; if ($now == $day) { echo "cur"; $next="curAfter";} ?>">
						<span class="fullDay"><?php echo date("l", $day); ?><div class='date'><?php echo date($dfDow, $day);?></div></span>
						<span class="mobileDay"><?php echo date("D", $day); ?><div class='date'><?php echo date($dfDowMobile, $day);?></div></span>
					</th>
					<?php $i = 6; $day = $arDays[$i]; ?>
					<th class="<?php echo $next; $next=""; if ($now == $day) { echo "cur"; $next="curAfter";} ?>">
						<span class="fullDay"><?php echo date("l", $day); ?><div class='date'><?php echo date($dfDow, $day);?></div></span>
						<span class="mobileDay"><?php echo date("D", $day); ?><div class='date'><?php echo date($dfDowMobile, $day);?></div></span>
					</th>

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
						'order' => 'ASC'
					);							
					$libraryList = new WP_Query( $args );
					
					$rowOdd = "even";
				?>
				<?php while ( $libraryList->have_posts() ) : $libraryList->the_post(); ?>
					<?php get_template_part( 'content', 'hour-row' ); ?>
				<?php endwhile; 	?>
				</tbody>
				<thead>
					<th class="name">More Locations</th>
					<?php $next = ""; ?>
					
					<?php $i = 0; $day = $arDays[$i]; ?>
					<th class="firstDisplay <?php echo $next; $next=""; if ($now == $day) { echo "cur"; $next="curAfter";} ?>">
						<span class="fullDay"><?php echo date("l", $day); ?><div class='date'><?php echo date($dfDow, $day);?></div></span>
						<span class="mobileDay"><?php echo date("D", $day); ?><div class='date'><?php echo date($dfDow, $day);?></div></span>
					</th>
					
					<?php $i = 1; $day = $arDays[$i]; ?>
					<th class="<?php echo $next; $next=""; if ($now == $day) { echo "cur"; $next="curAfter";} ?>">
						<span class="fullDay"><?php echo date("l", $day); ?><div class='date'><?php echo date($dfDow, $day);?></div></span>
						<span class="mobileDay"><?php echo date("D", $day); ?><div class='date'><?php echo date($dfDow, $day);?></div></span>
					</th>
					<?php $i = 2; $day = $arDays[$i]; ?>
					<th class="<?php echo $next; $next=""; if ($now == $day) { echo "cur"; $next="curAfter";} ?>">
						<span class="fullDay"><?php echo date("l", $day); ?><div class='date'><?php echo date($dfDow, $day);?></div></span>
						<span class="mobileDay"><?php echo date("D", $day); ?><div class='date'><?php echo date($dfDow, $day);?></div></span>
					</th>
					<?php $i = 3; $day = $arDays[$i]; ?>
					<th class="<?php echo $next; $next=""; if ($now == $day) { echo "cur"; $next="curAfter";} ?>">
						<span class="fullDay"><?php echo date("l", $day); ?><div class='date'><?php echo date($dfDow, $day);?></div></span>
						<span class="mobileDay"><?php echo date("D", $day); ?><div class='date'><?php echo date($dfDow, $day);?></div></span>
					</th>
					<?php $i = 4; $day = $arDays[$i]; ?>
					<th class="<?php echo $next; $next=""; if ($now == $day) { echo "cur"; $next="curAfter";} ?>">
						<span class="fullDay"><?php echo date("l", $day); ?><div class='date'><?php echo date($dfDow, $day);?></div></span>
						<span class="mobileDay"><?php echo date("D", $day); ?><div class='date'><?php echo date($dfDow, $day);?></div></span>
					</th>
					<?php $i = 5; $day = $arDays[$i]; ?>
					<th class="<?php echo $next; $next=""; if ($now == $day) { echo "cur"; $next="curAfter";} ?>">
						<span class="fullDay"><?php echo date("l", $day); ?><div class='date'><?php echo date($dfDow, $day);?></div></span>
						<span class="mobileDay"><?php echo date("D", $day); ?><div class='date'><?php echo date($dfDow, $day);?></div></span>
					</th>
					<?php $i = 6; $day = $arDays[$i]; ?>
					<th class="<?php echo $next; $next=""; if ($now == $day) { echo "cur"; $next="curAfter";} ?>">
						<span class="fullDay"><?php echo date("l", $day); ?><div class='date'><?php echo date($dfDow, $day);?></div></span>
						<span class="mobileDay"><?php echo date("D", $day); ?><div class='date'><?php echo date($dfDow, $day);?></div></span>
					</th>
				</thead>
				<tbody>
				<?php
					
					$args = array(
						'post_type' => 'location',
						'meta_key' => 'primary_location',
						'meta_value' => 0,
						'posts_per_page' => -1,
						/*'orderby' => 'menu_order',*/
						'orderby' => 'name',								
						'order' => 'ASC'
					);							
					$libraryList = new WP_Query( $args );
					
					$rowOdd = "even";
				?>
				<?php while ( $libraryList->have_posts() ) : $libraryList->the_post(); ?>
					<?php get_template_part( 'content', 'hour-row' ); ?>
				<?php endwhile; 	?>
				</tbody>
			</table>
		</div>

	</div> <!-- end div.allContent -->

</div> <!-- end div#stage -->

<?php get_footer(); ?>