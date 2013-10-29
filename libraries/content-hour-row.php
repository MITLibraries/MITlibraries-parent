						<?php 
							global $rowOdd, $arDays, $today, $now;
							$mapPage = "/locations/#!";
							
							$next = "";
							
							$locationId = get_the_ID();
							$slug = $post->post_name;
							
							$subject = cf("subject");
							$phone = cf("phone");
							$building = cf("building");
							$study24 = get_field("study_24");
							
							$noHours = cf("no_hours");
							
							$displayPage = get_field("display_page");
							$pageID = $displayPage->ID;
							$pageLink = get_permalink($pageID);
							
							$temp = $post;

							$hasHours = hasHours($locationId, date("Y-m-d", $today));
							//$hasHours = 1;
							//$hoursToday = getHoursToday($locationId);
							//$isOpen = getOpen($locationId);
							$post = $temp;							
							
							$showSpecial = 1;
							
							//if ($hasHours && $noHours != 1): 
							if ($noHours != 1): 
							
								if ($rowOdd=="even") {
									$rowOdd = "";
								} else {
									$rowOdd = "even";
								}
								
								$firstDay = " firstDisplay";
							?>						
								<tr class="<?php echo $rowOdd; ?>">
									<td class="name">
										<div class="nameHolder">
											<h3><a href="<?php echo $pageLink; ?>"><?php the_title(); ?> <i class="icon-arrow-right"></i></a></h3>
											<?php if ($phone != ""): ?>
												<?php echo $phone ?><br/>
											<?php endif; ?>
										</div>
										<a class="map" href="<?php echo $mapPage.$slug; ?>">Map: <?php echo $building ?> <i class="icon-arrow-right"></i></a>									
										<?php if ($study24 == 1): ?>
											<a class="space247" href="/study/24x7/">Study 24/7</a>
										<?php endif; ?>
										<!--
										Today's hours for mobile
										<div class="mobileToday">
											<b>Today</b><br/>
										<?php
											$curDay = $now;
											
											$temp = $post;									
											
											//echo "S: ".date("Y-m-d", $today)." ";
											
											$message = getMessageDay($locationId, $today);
											
											if ($message != "" ) {
												
												if ($showSpecial == 1) {
													$showSpecial = 0;
																							
													$msgStart = strtotime($message["start"]);
													$msgEnd = strtotime($message["end"]);
													$msgName = $message["name"];
													
													$msgClass = "message"; 
													
													
													if ($msgStart == $curDay) {
														$msgClass .= " msgStart";
													}
													
													if ($msgStart < $curDay) {
														$msgClass .= " msgContinued";
													}
													
													if ($msgEnd == $curDay) {
														$msgClass .= " msgEnd";
													}
													
													if ($msgEnd <= $arDays[6]) {
														$msgClass .= " msgEnds";
													}
													
													$end = min($msgEnd, $arDays[6]);
													
													$diff = floor(($end - $curDay)/(60*60*24))+1;
													
													$msgClass .= " msgSpan".$diff;
												
													echo "<div class='tdInside'><div class='$msgClass'>$msgName</div></div>";
												}
											} else {
												echo getMobileHoursDay($locationId, $curDay);
											}
											$post = $temp;												
										?>
										</div>		
										-->										
										
									</td>
	
									<?php for($i=0;$i<=6;$i++) { ?>
										<?php
											$curDay = $arDays[$i];
											
											if ($curDay == $now) {
												$class = "cur";
												$next = "curAfter";
											} else {
												$class = $next;
												$next = "";
											}
										?>
									<td class="<?php echo $class.$firstDay; ?>">
										
								<?php		
								$firstDay = "";
								$temp = $post;									
								
								//echo "B: ".date("Y-m-d", $curDay)." ";
								
								$message = getMessageDay($locationId, $today);
								
								if ($message != "" ) {
									
									if ($showSpecial == 1) {
										$showSpecial = 0;
																				
										$msgStart = strtotime($message["start"]);
										$msgEnd = strtotime($message["end"]);
										$msgName = $message["name"];
										
										$msgClass = "message"; 
										
										
										if ($msgStart == $curDay) {
											$msgClass .= " msgStart";
										}
										
										if ($msgStart < $curDay) {
											$msgClass .= " msgContinued";
										}
										
										if ($msgEnd == $curDay) {
											$msgClass .= " msgEnd";
										}
										
										if ($msgEnd <= $arDays[6]) {
											$msgClass .= " msgEnds";
										}
										
										$end = min($msgEnd, $arDays[6]);
										
										$diff = floor(($end - $curDay)/(60*60*24))+1;
										
										$msgClass .= " msgSpan".$diff;
									
										echo "<div class='tdInside'><div class='$msgClass'>$msgName</div></div>";
									}
								} else {
									echo "<div class='mobileHourDay'><b>".date("D", $curDay)."<br/>".date("n/j", $curDay)."</b><br/>".getMobileHoursDay($locationId, $curDay)."</div>";
									echo "<div class='fullHourDay'>".getHoursDay($locationId, $curDay)."</div>";
								}
								$post = $temp;									
								?>	
										
									</td>
									<?php } ?>

								</tr>
							<?php 
							endif; // has hours
							?>