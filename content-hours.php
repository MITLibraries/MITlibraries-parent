		<?php
			$subject = cf("subject");
			$phone = cf("phone");
			$building = cf("building");
			$spaces = cf("group_spaces");
			$equipment = cf("equipment");
			$arexpert = get_field("expert");
			
			$title1 = cf("tab_1_title");
			$subtitle1 = cf("tab_1_subtitle");
			$content1left = get_field("tab_1_content_left");
			$content1 = get_field("tab_1_content");
			
			$title2 = cf("tab_2_title");
			$subtitle2 = cf("tab_2_subtitle");
			$content2left = get_field("tab_2_content_left");
			$content2 = get_field("tab_2_content");
			
			$displayPage = get_field("display_page");
			$pageID = $displayPage->ID;
			$pageLink = get_permalink($pageID);
			
			$alert = get_field("alert");
		?>
		
		<div id="stage" class="inner">
	
			<div class="title libraryTitle">
				<div class="libraryContent">
					<h2><?php the_title(); ?></h2>
					
					<h3><?php echo $subject ?></h3>
					<div class="sub">
						<?php echo $phone ?><br/>
						show on map: <a href="#"><?php echo $building ?> <i class="icon-arrow-right"></i></a>
						
						
					</div>
				</div>
				
				<div class="librarySlideshow">
					<div class="slideshow">
						<img src="<?php bloginfo('template_directory') ?>/images/content/rotch-01.jpg" data-thumb="<?php bloginfo('template_directory') ?>/images/content/rotch-thumb-01.jpg" alt="Rotch Library" />
						<img src="<?php bloginfo('template_directory') ?>/images/content/rotch-02.jpg" data-thumb="<?php bloginfo('template_directory') ?>/images/content/rotch-thumb-02.jpg" alt="Rotch Library" />
						<img src="<?php bloginfo('template_directory') ?>/images/content/rotch-03.jpg" data-thumb="<?php bloginfo('template_directory') ?>/images/content/rotch-thumb-03.jpg" alt="Rotch Library" />
						<img src="<?php bloginfo('template_directory') ?>/images/content/rotch-04.jpg" data-thumb="<?php bloginfo('template_directory') ?>/images/content/rotch-thumb-04.jpg" alt="Rotch Library" />
						<img src="<?php bloginfo('template_directory') ?>/images/content/rotch-05.jpg" data-thumb="<?php bloginfo('template_directory') ?>/images/content/rotch-thumb-05.jpg" alt="Rotch Library" />
						<img src="<?php bloginfo('template_directory') ?>/images/content/rotch-06.jpg" data-thumb="<?php bloginfo('template_directory') ?>/images/content/rotch-thumb-06.jpg" alt="Rotch Library" />
					</div>
					<div id="slideshowNav">
						
					</div>
				</div>
				
				<div class="todayHours">
					Today's hours:<br/>
					<b>9am-midnight</b><br/>
					<a href="#">See all hours <i class="icon-arrow-right"></i></a>
				</div>				
				
				<?php if ($alert != ""): ?>
				<div class="libraryAlert">
					<?php echo $alert; ?>
				</div>
				<?php endif; ?>
			</div>
			
			<div id="content" class="locationContent">
				<div id="mainContent">
					
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
								<div class="span4 first">
								
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
											<div class="intro">Meet our experts:</div>
											<h3><?php echo $name; ?></h3>
											<div class="bio"><?php echo $bio; ?></div>
											<div class="links">
												<a class="primary" href="<?php echo $url; ?>" target="_blank">profile <i class="icon-arrow-right"></i></a>
												<a href="http://libguides.mit.edu/content.php?pid=110460&sid=1651114" target="_blank">see all our experts <i class="icon-arrow-right"></i></a>
											</div>
											<a class="btn btn-warning" href="#">Ask Us!</a>
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
								<div class="span2 first">
								<?php echo $content2left ?>
								<!--
								<p>First come, first served.<br/>
								No reservations.</p>
								<ul class="snav">
									<li><a href="#">Guidelines for use</a></li>
									<li><a href="#">Find other Study Spaces</a></li>
								</ul>
								-->
								</div>
								<div class="span5">
									<?php echo $content2 ?>
								</div>
							</div>
						</div>
						<?php endif; ?>
					</div>
				</div>
				<?php get_sidebar(); ?>
				<!--
				<div id="sidebarContent">
					<div class="sidebarWidgets">
						<div class="widget">
							<h3>Help with renewing, fines, requests...</h3>
							<ul>
								<li><a href="#">Circulation FAQ</a></li>
								<li><a href="#">Reserves FAQ</a></li>
								<li><a href="#">Other FAQs</a></li>
								<li><a href="#">Get books, articles, and more...</a></li>
							</ul>
						</div>
						<?php $val = $spaces; if ($val != ""): ?>
						<div class="widget">
							<?php echo $val; ?>
						</div>
						<?php endif; ?>
						<?php $val = $equipment; if ($val != ""): ?>
						<div class="widget">
							<?php echo $val; ?>
						</div>
						<?php endif; ?>
						<div class="widget">
							<h3>See also</h3>
							<ul>
								<li><a href="#">School of Architecture &amp; Planning</a></li>
							</ul>
						</div>
					</div>
				</div>					
				-->
			
			
			
		
			<div class="clear"></div>
		
		</div>