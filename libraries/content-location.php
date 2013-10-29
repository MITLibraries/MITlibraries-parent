<?php
			global $gStudy24Url;
			
			$mapPage = "/locations/#!";
			
			$locationId = get_the_ID();
			$slug = $post->post_name;
			
			$subject = cf("subject");
			$phone = cf("phone");
			$building = cf("building");
			$spaces = cf("group_spaces");
			//$equipment = cf("equipment");
			$arexpert = get_field("expert");
			
			$title1 = cf("tab_1_title");
			$subtitle1 = cf("tab_1_subtitle");
			$content1left = get_field("tab_1_content_left");
			$content1 = get_field("tab_1_content");

			$title2 = cf("tab_2_title");
			$subtitle2 = cf("tab_2_subtitle");
			$content2left = get_field("tab_2_content_left");
			$content2 = get_field("tab_2_content");
			
			$content2wide = 0;
			if ($content2 == "") $content2wide = 1;
			
			$content1wide = 0;
			if ($content1 == "") $content1wide = 1;
			
			$study24 = get_field("study_24");

			$temp = $post;
			$hasHours = hasHours($locationId, date("Y-m-d"));
			$hoursToday = getHoursToday($locationId);
			$isOpen = getOpen($locationId);
			$post = $temp;
			
			
			$reserveText = get_field("reserve_text");
			if ($reserveText == "") {
				$reserveText = "Reserve Group Study Space";
			}
			$reserveUrl = get_field("reserve_url");
			
			
			
			$expertAskUrl = get_field("expert_ask_url");
			if ($expertAskUrl == "") $expertAskUrl = "http://libraries.mit.edu/ask";
			
			
			$numMain = 6;
			$arMain = array();
			
			for($i=1;$i<=$numMain;$i++) {
				$img = get_field("main_image".$i, $locationId);
				if ($img != "")
					$arMain[] = $img;
			}
			
			$numSub = 8;
			$arSub = array();
			$subs = 0;
			for($i=1;$i<=$numSub;$i++) {
				$img = get_field("sub_image".$i, $locationId);
				if ($img != "") {
					$subs++;
					$arSub[] = $img;
				}
			}
			
			$strLocation = "";
			if ($subs <= 0) {
				$strLocation = "noThumbs";
			}
			
			
			$alert = trim(get_field("alert"));
		?>
		
		<div id="stage" class="inner row" role="main">
	
			<div class="title libraryTitle span12 dark">
				<div class="libraryContent">
					<h2><?php the_title(); ?></h2>
					
					<h3><?php echo $subject ?></h3>
					<div class="sub">
						<?php echo $phone ?><br/>
						show on map: <a href="<?php echo $mapPage.$slug; ?>"><?php echo $building ?> <i class="icon-arrow-right"></i></a>
						
						
					</div>
				</div>
				
				
				<div class="todayHours">
					<?php if ($hasHours): ?>
					Today's hours:<br/>
					<b><?php echo $hoursToday; ?></b></br>
					<?php endif; ?>
					<a href="/hours">See all hours <i class="icon-arrow-right"></i></a>
				</div>					

			
				
				<?php if ($study24 == 1): ?>
					<a class="space247" href="<?php echo $gStudy24Url; ?>">Study 24/7</a>
				<?php endif; ?>

				<?php if ($alert != ""): ?>
				<div class="libraryAlert">
					<?php echo $alert; ?>
				</div>
				<?php endif; ?>
				
				
				<div class="librarySlideshow">
					<div class="slideshow">
						<?php
							$val = $arMain[array_rand($arMain)];
						?>
						<?php if ($val != ""): ?>
						<img src="<?php echo $val; ?>" data-thumb="<?php echo $val; ?>" alt="<?php the_title(); ?>" />
						<?php endif; ?>
					</div>
					<div id="slideshowNav" class="hidden-phone">
						<!-- Update 1.8 -->
						<?php foreach($arSub as $val): ?>
						<?php
							$thumb = wp_get_attachment_image_src($val, array(50, 50));
							$full = wp_get_attachment_image_src($val, "full");
						?>
								<a rel="lightbox[location]" href="<?php echo $full[0]; ?>"><img src="<?php echo $thumb[0]; ?>" data-thumb="<?php echo $full[0]; ?>" width="<?php echo $thumb[1]; ?>" height="<?php echo $thumb[2]; ?>" alt="<?php the_title(); ?>" /></a>
						<?php endforeach; ?>
					</div>
				</div>				
			</div>
			
			<div id="content" class="locationContent <?php echo $strLocation; ?>">
				<div id="mainContent" class="span9">
					<!--
					<?php if ($study24 == 1): ?>
						<a class="space247" href="<?php echo $gStudy24Url; ?>">Study 24/7</a>
					<?php endif; ?>
					-->
					<?php if ($title1 != "" || $title2 != ""): ?>
						<?php $noTab = "";  ?>
					<ul class="tabnav">
						<?php if ($title1 != ""): ?>
						<li class="active"><a href="#tab1"><?php echo $title1 ?><div><?php echo $subtitle1 ?></div></a></li>
						<?php endif; ?>
						<?php if ($title2 != ""): ?>
						<li><a href="#tab2"><?php echo $title2 ?><div><?php echo $subtitle2 ?></div></a></li>
						<?php endif; ?>
					</ul>
					<?php else: ?>
						<?php $noTab = " noTab";  ?>
					<?php endif; ?>
					<div class="tabcontent <?php echo $noTab ?>">
						<div class="tab active" id="tab1">
							<div class="row">
								<div class="first <?php if($content1wide): ?>span7 wideColumn<?php else: ?>span4<?php endif; ?>">
								
									<?php
										if ($arexpert) {
											$expertIndex = array_rand($arexpert);
											$expert = $arexpert[$expertIndex];
											
											
											$name = $expert->post_title;
											$bio = $expert->post_excerpt;
											//$url = $expert->guid;
											$url = get_post_meta($expert->ID, "expert_url", 1);
											
											if (has_post_thumbnail($expert->ID)) {
												$thumb = get_the_post_thumbnail($expert->ID, array(108,108));
											} else {
												$thumb = "";
											}
											
									?>
									<div class="profile">
										<?php if ($thumb != ""): 
											echo $thumb;
										endif; ?>
										<div class="profileContent">
											<h3 class="profileTitle"><span class="intro">Featured expert:</span><span class="name"><?php echo $name; ?></span><span class="bio"><?php echo $bio; ?></span></h3>
											<div class="links">
												<a class="primary" href="<?php echo $url; ?>" target="_blank">How can I help? <i class="icon-arrow-right"></i></a>
												<a href="http://libguides.mit.edu/content.php?pid=110460&sid=1651114" target="_blank">See all our experts <i class="icon-arrow-right"></i></a>
											</div>
											<!--<a class="btn btn-warning" href="<?php echo $expertAskUrl; ?>">Ask Us!</a>-->
											<div class="clear"></div>
										</div>
										<div class="clear"></div>
									</div>	
									<?php
										}
									?>
									
									<?php echo $content1left ?>
								</div>
								<div class="span3">
									<?php echo $content1 ?>

								</div>
							</div>
						</div>
						<?php if ($title2 != ""): ?>
						
						<div class="tab" id="tab2">
							<div class="row">
								<div class="first <?php if($content2wide): ?>span8 wideColumn<?php else: ?>span2<?php endif; ?>">
								<?php echo $content2left ?>
								
								<?php if ($reserveUrl != ""): ?>
											<a class="reserve hidden-phone" href="<?php echo $reserveUrl; ?>"><?php echo $reserveText; ?></a>
								<?php endif; ?>

								
								</div>
								<div class="span6">
									<?php echo $content2 ?>
								</div>
							</div>
						</div>
						<?php endif; ?>
					</div>
				</div>
				<?php get_sidebar(); ?>
		
		
			<div class="clear"></div>
		
		</div>