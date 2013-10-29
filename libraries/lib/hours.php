<?php

$clean = $_GET["cleanCache"];

$resetCache = 0;

if ($clean == "1") $resetCache = 1;
$halfCache = 0;

$locationReset = $_GET["locReset"];

$expireLong = 60*5; // 24 hours
$expireShort = 60*5; // 5 minutes
date_default_timezone_set("America/New_York");

function getHours() {
	global $resetCache, $expireLong, $expireShort, $locationReset; 
	
	$key = "getHours";
	$expire = $expireShort; 
	$data = get_transient( $key );
	
	if ($data === false || $resetCache) {
		
		// gets the entire hours object;
		global $post;
		
		$gHours = array();
		
		$args = array(
			'post_type' => 'hours',
			'posts_per_page' => -1,
			'post_parent' => 0,
		);
		
		$hours = new WP_Query( $args );
		while($hours->have_posts()):
			
			$hours->the_post();
			$id = get_the_ID();
			
			
			$name = get_the_title();
			
			$description = get_field("description");
			
			$start = get_field("start");
			$end = get_field("end");
			
			$spanning = get_field("show_spanning");
			
			$term = get_field("is_term");
			
			$location = get_field("associated_location");
			$locationId = $location->ID;
			
			$arHours[$locationId] = array(
				'id' => $id,
				'name' => $name,
				'description' => $description,
				'start' => $start,
				'end' => $end,
				'show_spanning' => $spanning,
				'term' => $term,
				'terms' => getHoursChildren($id)
			);
		endwhile;
		
		wp_reset_query();
		
		$data = $arHours;
		set_transient( $key, $data, $expire );
	}
		
	return $data;
}

function getHoursChildren($parent) {
	$arHours = array();
	
	$args = array(
		'post_type' => 'hours',
		'orderby' => 'date',
		'order' => 'ASC',		
		'posts_per_page' => -1,
		'post_parent' => $parent
	);
	
	
	$hours = new WP_Query( $args );

	while($hours->have_posts()):
		
		$hours->the_post();
		$id = get_the_ID();
		
		$name = get_the_title();
		
		$description = get_field("description");
		
		$start = get_field("start");
		$end = get_field("end");
		
		$spanning = get_field("show_spanning");
		
		$term = get_field("is_term");
		
		$arHours[$id] = array(
			'id' => $id,		
			'name' => $name,
			'description' => $description,
			'start' => $start,
			'end' => $end,
			'show_spanning' => $spanning,
			'term' => $term,
			'hours' => getHoursChildren($id)
		);
	endwhile;
	wp_reset_query();
	
	
	return $arHours;	
}

function getHoursToday($locationId) {
	global $resetCache, $expireLong, $expireShort, $locationReset; 
	$date = date("Y-m-d");
	$key = "getHoursToday-$locationId-$date";
	$expire = $expireShort;
	$data = get_transient( $key );
	
	if ($data === false || $resetCache || $locationReset == $locationId) {
		$data = getHoursDay($locationId, strtotime("Now"));
		set_transient( $key, $data, $expire );
	}
	return $data;
}

function hasHours($locationId, $curDay) {
	global $resetCache, $expireLong, $expireShort, $locationReset; 
	
	$date = date("Y-m-d", strtotime($curDay));
	$key = "hasHours-$locationId-$date";
	$expire = $expireShort;
	$data = get_transient( $key );
	
	if ($data === false || $resetCache || $locationReset == $locationId) {
		$arHours = getHours();
				
		$dt = strtotime($curDay);
		
		$term = getTerm($arHours, $locationId, $dt);
		
	
		if (count($term)==0) {
			// no hours
			$data = 0;
		} else {
			$data = 1;
		}
		set_transient( $key, $data, $expire );		
	}
	
	return $data;
}

function getHoursDay($locationId, $dt) {
	global $resetCache, $expireLong, $expireShort, $locationReset; 
	$key = "getHoursDay-$locationId-$dt";
	$expire = $expireShort;
	$data = get_transient( $key );
	
	if ($data === false || $resetCache || $locationReset == $locationId) {


		$data = "";
		$today = $dt;
		//$today = strtotime("2013-04-20");
		$dt = $today; 
		
		//echo "{{".date("Y-m-d", $dt)."}}";
		
		$arHours = getHours();
			
		$term = getTerm($arHours, $locationId, $dt);
		//print_r($term);
		$hour = getTermHour($term, $dt);
		
		
		if (count($term)==0) {
			// no hours
			$data = "TBA";
		} else if (count($hour)==0) {
			// no hours
			$data = "TBA";
		} else {
			$data = $hour["description"];
		}
		
		set_transient( $key, $data, $expire );		
	}
	return $data;
}

function getMobileHoursDay($locationId, $dt) {
	global $resetCache, $expireLong, $expireShort, $locationReset; 
	$key = "getMobileHoursDay-$locationId-$dt";
	$expire = $expireShort;
	$data = get_transient( $key );
	
	if ($data === false || $resetCache || $locationReset == $locationId) {


		$data = "";
		$today = $dt;
		//$today = strtotime("2013-04-20");
		$dt = $today; 
		
		//echo "{{".date("Y-m-d", $dt)."}}";
		
		$arHours = getHours();
			
		$term = getTerm($arHours, $locationId, $dt);
		//print_r($term);
		$hour = getTermHour($term, $dt);
		
		
		if (count($term)==0) {
			// no hours
			$data = "TBA";
		} else if (count($hour)==0) {
			// no hours
			$data = "TBA";
		} else {
			$data = hourToMobile($hour["description"]);
		}
		
		set_transient( $key, $data, $expire );		
	}
	return $data;
}

function getMessageDay($locationId, $dt) {
	global $resetCache, $expireLong, $expireShort, $locationReset; 
	$key = "getMessageDay-$locationId-$dt";
	$expire = $expireShort;
	$data = get_transient( $key );
	
	if ($data === false || $resetCache || $locationReset == $locationId) {

		//echo date("Y-m-d", $dt);
		$data = "";
		$today = $dt;
		//$today = strtotime("2013-04-20");
		$dt = $today; 
		
		$arHours = getHours();
			
		$term = getTerm($arHours, $locationId, $dt);
		
		//echo $locationId." - ".$dt."  ";
		//print_r($term);
		$hour = getTermHour($term, $dt);
				
		$data = "";
		
		if ($hour["show_spanning"] == 1) {
			$data = $hour;
		}
		
		set_transient( $key, $data, $expire );		
	}
	return $data;
}


function getOpen($locationId) {
	$today = strtotime("Now");
	$dt = $today; 
	
	

	$arHours = getHours();
	
	$term = getTerm($arHours, $locationId, $dt);
	$hour = getTermHour($term, $dt);
	
	if (count($term)==0) {
		// no hours
		return false;
	}	
	
	if (count($hour)==0) {
		// no hours
		return false;
	}	

	
	return checkOpen($hour, $dt);
}

function checkClosed($str) {
	$str = strtolower($str);
	if (
		strpos($str, "closed") !== false ||
		$str == "tba" || 
		$str = ""
		) {
			return true;
	}
	return false;
}

function checkWeekday($str) {
	$str = strtolower($str);
	if (
		strpos($str, "monday") !== false ||
		strpos($str, "tuesday") !== false ||
		strpos($str, "wednesday") !== false ||
		strpos($str, "thursday") !== false ||
		strpos($str, "friday") !== false ||
		strpos($str, "saturday") !== false ||
		strpos($str, "sunday") !== false
		) {
			return true;
	}
	return false;
}

function checkOpen($hour, $dt) {
	$hrs = strtolower($hour["description"]);
	
	if (
		$hrs == "closed" || 
		$hrs == "tba" ||
		$hrs == ""
		) {
		return false;
	}
	
	
	
	$arRange = explode("-", $hrs);
	$start = strtotime($arRange[0]);
	
	if ($arRange[1] == "midnight") {
		$end = strtotime($arRange[1]." + 1 day");
	} else {
		$end = strtotime($arRange[1]);
	}
	
	if ($start <= $dt && $dt <= $end) {
		return true;
	}
	
	return false;
}

function getHourHours($hour) {
	$arOut = array();
	
	$hrs = strtolower($hour["description"]);
	
	if (
		checkClosed($hrs)
		) {
		return false;
	}
	
	
	
	$arRange = explode("-", $hrs);
	$start = strtotime($arRange[0]);
	
	if ($arRange[1] == "midnight") {
		$end = strtotime($arRange[1]." + 1 day");
	} else {
		$end = strtotime($arRange[1]);
	}
	
	$arOut[start] = date("H:i:s", $start);
	$arOut[end] = date("H:i:s", $end);
	
	return $arOut;
	
}

function dayLookup($str) {
	$str = strtolower(date("l", strtotime($str)));
	
	
	switch($str) {
		case "monday":
			return "M";
			break;
		case "tuesday":
			return "T";
			break;
		case "wednesday":
			return "W";
			break;
		case "thursday":
			return "R";
			break;
		case "friday":
			return "F";
			break;
		case "saturday":
			return "S";
			break;
		case "sunday":
			return "U";
			break;
	}
}

function toDays($str) {
	if (strpos($str, "-") !== false) {
		// multi day
		//echo $str;
		$arRange = explode("-", $str);
		
		$start = $arRange[0];
		$end = $arRange[1];
		
		$current = $start;
		$currentShort = dayLookup($current);
		
		$startShort = dayLookup($start);
		$endShort = dayLookup($end);
		
		$strOut = "";
		
		//echo $currentShort." vs ".$endShort;
		while($currentShort != $endShort) {
			$strOut .= $currentShort;
			
			$current = date("l", strtotime($current." + 1 day"));
			$currentShort = dayLookup($current);
			
			
		}
		
		$strOut .= $endShort;
		
		
		
		return $strOut;
	} else {
		// single day
		
		return dayLookup($str);
	}
	return $str;
}

function getTerm($obj, $location, $dt) {
	global $resetCache, $expireLong, $expireShort, $locationReset; 
	
	$key = "getTerm-$location-$dt";
	$expire = $expireLong;
	$data = get_transient( $key );
	
	if ($data === false || $resetCache || $location == $locationReset) {
		
		$data = array();
		
		if ($obj[$location]) {
			// location exists
			$arTerms = $obj[$location]["terms"];
			
			//echo "[E: ".date("Y-m-d", $dt)." ]";
			
			foreach($arTerms as $termId => $term) {
				$start = $term["start"];
				$end = $term["end"];
				
				//echo "{ $start -> $dt -> $end }";
								
				$start = strtotime($start);
				$dt = strtotime(date("Y-m-d", $dt));
				$end = strtotime($end);				
				
				//echo "[ ".date("Y-m-d", $start)." ]";
				
				
				if ($start <= $dt && $dt <= $end) {
					//echo "FOUND";
					$data = array(
						"id"=>$key,
						"term"=>$term
					);
				}
				
			}
			
		} else {
			//echo "TEST";
		}
		
		//print_r($data);
		
		set_transient( $key, $data, $expire );		
	}
	
	return $data;
}

function getTermHour($term, $dt) {
	// check for special days
	
	if (count($term) == 0) {
		return array();
	}
	
	$dtWeek = date("l", $dt);
	
	$arHours = $term["term"]["hours"];
	
	// Special days
	foreach($arHours as $hours) {
		$start = $hours["start"];
		if ($start != "") {
			$end = $hours["end"];
			
			if ($end == "") $end = $start;
			
			$start = strtotime($start);
			$end = strtotime($end);		
						
			if ($start <= $dt && $dt <= $end) {
				return $hours;
			}
		}
	}

	
	// Day match
	foreach($arHours as $hours) {
		$start = $hours["start"];
		if ($start == "") {
			// only normal days
			$name = $hours["name"];
			if ($name == $dtWeek) {
				return $hours;
			}
		}
	}
	
	// Day Span Match
	foreach($arHours as $hours) {
		$start = $hours["start"];
		if ($start == "") {
			// only span days
			$name = $hours["name"];
			if (strpos($name, "-") !== false) {
				if (dateSpanFit($name, $dtWeek)) {
					return $hours;
				} else {
				}
			}
		}
	}
	
	
	return array();
}

function dateSpanFit($range, $dt) {
	$arRange = explode("-", $range);
	
	$start = strtotime(trim($arRange[0]));
	$end = strtotime(trim($arRange[1]));
	
	$startDay = date("N", $start);
	$endDay = date("N", $end);
	
	$dtDay = date("N", strtotime($dt));
	
	if ($startDay <= $dtDay && $dtDay <= $endDay) {
		return true;
	}
	
	return false;
}

function hourToMobile($str) {
	// alters hours for mobile output (replacing long strings with shorter ones)
	$str = str_replace("midnight", "midn", $str);
	$str = str_replace("-", "<br/>", $str);
	$str = str_replace("am", "a", $str);
	$str = str_replace("pm", "p", $str);
	$str = str_replace("by appointment only", "appt only", $str);
	
	
	return $str;
}

/** Custom Import **/

add_action( 'admin_menu', 'libraries_plugin_menu' );

function libraries_plugin_menu() {
	add_submenu_page('edit.php?post_type=hours', 'Import', 'Import', 'manage_options', 'import_hours', 'import_hours');
}

function import_hours() {

?>
	<h3>Import Hours</h3>
	<form method="POST" action="" enctype="multipart/form-data">
		<input type="hidden" name="import_spreadsheet" value="Y" />
		<label for="import">Upload spreadsheet of hours:</label>
		
		<input type="file" name="upload" id="upload" /><p>
		Tag to Delete <input type="text" name="tag_delete" id="tag_delete" value="" /> (Terms are named "TERM:[upload filename]")
		<p>
			<input type="submit"/>
		</p>
	</form>
<?php
	if (isset($_POST["import_spreadsheet"])) {  
		if (isset($_FILES["upload"]) && $_FILES["upload"]["name"] != "") {
			handle_hours_upload();
		} 
		if (isset($_POST["tag_delete"]) && $_POST["tag_delete"] != "") {
			clean_posts($_POST["tag_delete"]);
			echo "Items removed with tag: ".$_POST["tag_delete"];
		}
	}
};


function handle_hours_upload() {
	echo "<p><hr></p>";
	
	$root = $_SERVER['DOCUMENT_ROOT'];

	$siteRoot = $root;

	require_once $siteRoot."/wp-content/themes/libraries/libs/PHPExcel-develop/Classes/PHPExcel/IOFactory.php";
	
	$upload = $_FILES["upload"]["tmp_name"]; // actual file
	$fileName = $_FILES["upload"]["name"]; // original file name
	
	$tag = $fileName;
	
	
	$obj = PHPExcel_IOFactory::load($upload);
	//$obj->setReadDataOnly(true);
	
	echo "Spreadsheet Loaded: <b>$fileName</b> <br/>";
	
	clean_posts($tag);
	
	/*
	foreach ($obj->getWorksheetIterator() as $worksheet) {
		//print_r($worksheet);
		
		foreach ($worksheet->getRowIterator() as $row) {
			
			
		}
		
	}
	*/
	
	
	//return;
	
	$loadedSheetNames = $obj->getSheetNames();
	
	foreach($loadedSheetNames as $sheetIndex => $loadedSheetName) {
		echo "<p>";
		$sheet = $obj->getSheet($sheetIndex)->toArray(null, true, true, true);
		
		switch(strtolower($loadedSheetName)) {
			case "semester breakdown": 
				echo "<h3>Semester Overview</h3><br/>";
			
				// main sheet detailing semester breakdowns
				$yearSpan = explode("-", $sheet[1][A]);
				
				$yearStart = trim($yearSpan[0]);
				$yearEnd = trim($yearSpan[1]);
				
				
				$semesters = process_overview($sheet);
				//print_r($semesters);
				break;
			case "holidays & special hours":
				echo "<h3>Holiday Sheet</h3><br/>";
				
				process_holiday($sheet, $tag);
				
				break;
			default:
				$semester = $sheet[1][A];
				echo "<h3>Semester Sheet: $semester</h3>";
				
				process_semester($sheet, $semester, $semesters, $tag);
				
				
				break;
		}
		
		
		
	}
	
	
	
	
	echo "<p><hr></p><b>Upload Completed</b>";
}

function getSemester($name, $list) {
	foreach($list as $index => $item) {
		if ($item[semester] == $name) return $item;
	}
	return "";
}

function clean_posts($tag) {
	echo "Removing Earlier Posts<br/>";
	
	// Insert Post
	$args = array(
		'post_type' => 'hours',
		'meta_key' => 'tag',
		'meta_value' => $tag,
		'posts_per_page' => -1,
	);	
	
	$toDelete = new WP_Query( $args );
	
	while($toDelete->have_posts()) {
		$toDelete->the_post();
	
		$deleteId = get_the_ID();
			
		wp_delete_post($deleteId, 1);
	}
}

function process_semester($arSheet, $name, $semesterList, $tag) {
	$startRow = 4;
	$started = 0;
	$foundMaster= 0;

	$semesterEntry = getSemester($name, $semesterList);
	$startDate = date("Ymd", $semesterEntry[start]);
	$endDate = date("Ymd", $semesterEntry[end]);
	
	// get column / day relationship
	foreach($arSheet as $row => $item) {
		if (strtolower($item[A]) == "location") {
			// row before it starts
			$masterRow = $item;
			$foundMaster = 1;
		} else if ($row >= $startRow && $item[A] != "" && $foundMaster) {
			// valid row and we have a master row to compare against
			$started = 1;
			
			$locationName = $item[A];
			$locationId = locationNameToId($locationName);
			
			echo "<br/><b>$locationName</b><br/>";
			if ($locationId == 0) {
				echo "ERROR - Cannot Find Related Location<br/>";
				
			} else {
			
				/** Check if Semester exists for location **/
				$semId = semesterNameToId($name, $locationId);
				
				if ($semId == 0) {
					echo "Note - Semester Doesn't Exist, Creating New Semester<br/>";
					
					$args = array(
						'post_title' => $name,
						'post_parent' => $locationId,
						'post_type' => 'hours',
						'post_status' => 'publish'
					);
					
					$semId = wp_insert_post($args);
					
					add_post_meta($semId, "start", $startDate);
					add_post_meta($semId, "end", $endDate);
					add_post_meta($semId, "is_term", 1);
					add_post_meta($semId, "tag", "TERM:".$tag);
					
					
					echo "Created New Semester<br/>";
					
				} else {
					update_post_meta($semId, "start", $startDate);
					update_post_meta($semId, "end", $endDate);
				}
				
				
				/** Look at hours for the semester **/
				
				foreach($item as $col => $val) {
					if ($col != 'A') {
						// not the name
						
						$day = $masterRow[$col];
						if ($val != "") {
							echo "Adding - ".$day." = ".$val."<br>";
							
							
							// Insert Post
							$args = array(
								'post_title' => $day,
								'post_parent' => $semId,
								'post_type' => 'hours',
								'post_status' => 'publish'
							);
							
							$postId = wp_insert_post($args);
							
							$val = str_replace(":00", "", $val);
							
							add_post_meta($postId, "description", $val);
							add_post_meta($postId, "tag", $tag);
							
						}
						
						
						
					}
				}
			}
			
			
			
		} else {
			// catch hidden extra areas
			if ($started && $item[A] == "") {
				return;
			}
		}
	}
	
}	



function process_holiday($arSheet, $tag) {
	global $resetCache;
	
	$resetCache = 1;
	$arHours = getHours();
	$resetCache = 0;
			


	$startRow = 4;
	$started = 0;
	$foundMaster= 0;
	$foundDate = 0;

	$semesterEntry = getSemester($name, $semesterList);
	$startDate = date("Ymd", $semesterEntry[start]);
	$endDate = date("Ymd", $semesterEntry[end]);
	
	// get column / day relationship
	foreach($arSheet as $row => $item) {
		if (strtolower($item[A]) == "holiday") {
			// row before it starts
			$masterRow = $item;
			$foundMaster = 1;
		} else if (strtolower($item[A]) == "date") {
			// row before it starts
			$dateRow = $item;
			$foundDate = 1;
		} else if ($row >= $startRow && $item[A] != "" && $foundMaster && foundDate) {
			// valid row and we have a master row to compare against
			$started = 1;
			
			$locationName = $item[A];
			$locationId = locationNameToId($locationName);
			$locationIdOriginal = locationNameToIdOriginal($locationName);
			
			echo "<b>$locationName </b><br/>";
			if ($locationId == 0) {
				echo "ERROR - Cannot Find Related Location<br/>";
				
			} else {
			

			
			
				/** Look at hours for the semester **/
				
				foreach($item as $col => $val) {
					if ($col != 'A') {
						// not the name
						
						// use master row, if not, use previous (for blank entries);
						if ($masterRow[$col] != "")
							$day = $masterRow[$col];
						$dt = strtotime($dateRow[$col]);
						$formatDate = date("Ymd", $dt);
						$termDate = date("Y-m-d", $dt);
						
						if ($val != "") {
						
							/** Check if term exists for location **/
							$termId = 0;
							$term = getTerm($arHours, $locationIdOriginal, $dt);
							
							//print_r($term[term]);
							$termId = $term[term][id];
							
							echo "Adding Holiday - ".$day." / ".$formatDate." = ".$val."<br>";
							
							if ($termId ==0 || $termId == "") {
								echo "<b>MISSING Term for: $termDate</b><br>";
							} else {
								// OK to insert
							
							
								// Insert Post
								$args = array(
									'post_title' => $day,
									'post_parent' => $termId,
									'post_type' => 'hours',
									'post_status' => 'publish'
								);
								
								$postId = wp_insert_post($args);
								
								add_post_meta($postId, "start", $formatDate);
								add_post_meta($postId, "description", $val);
								add_post_meta($postId, "tag", $tag);
								
							}
							
						}
						
						
						
					}
				}
			}
			
			
			
		} else {
			// catch hidden extra areas
			if ($started && $item[A] == "") {
				return;
			}
		}
	}
	
}	

function semesterNameToId($name, $locationId) {
	$args = array(
		'post_type' => 'hours',
		'posts_per_page' => -1,
		'search_prod_title' => $name,
		'post_parent' => $locationId,
	);
	
	add_filter( 'posts_where', 'title_filter', 10, 2 );
	$semList = new WP_Query( $args );
	remove_filter( 'posts_where', 'title_filter', 10, 2 );
	
	if ($semList->have_posts()) {
		$semList -> the_post();
		
		return get_the_ID();
		
	};	
	
	return 0;
}

function nameLookup($name) {
	switch(strtolower($name)) {
		case "barker":	
			$baseName = "Barker Library";
			break;
		case "dewey":	
			$baseName = "Dewey Library";
			break;
		case "hayden":	
			$baseName = "Hayden Library";
			break;
		case "rotch":	
			$baseName = "Rotch Library";
			break;
		case "lewis":	
			$baseName = "Lewis Music Library";
			break;
		case "maihaugen":
		case "miahaugen":
		case "maihuagen":
		case "miahuagen":
			$baseName = "Maihaugen Gallery";
			break;
		case "archives":
			$baseName = "Institute Archives & Special Collections";
			break;
			
		case "administrative":
			$baseName = "Administrative Offices";
			break;
			
		case "document services":
		case "ds":
			$baseName = "Document Services";
			break;
			
		case "gis":
			$baseName = "Geographic Information Systems (GIS) Laboratory";
			break;
			
		case "lsa":
			$baseName = "Library Storage Annex";
			break;
			
		case "digital image services":
		case "dis":
			$baseName = "Digital Image Services & Visual Collections";
			break;
			
		default: 
			$baseName = $name;
	}
	return $baseName;	
}

function locationNameToId($name) {
	$baseName = nameLookup($name);
	$id = 0;
	
	$args = array(
		'post_type' => 'hours',
		'posts_per_page' => -1,
		'search_prod_title' => $baseName,
		'post_parent' => 0,
	);
	
	add_filter( 'posts_where', 'title_filter', 10, 2 );
	$locationList = new WP_Query( $args );
	remove_filter( 'posts_where', 'title_filter', 10, 2 );
	
	if ($locationList->have_posts()) {
		$locationList -> the_post();
		
		return get_the_ID();
		
	};
	
	// didn't find
	return 0;
	
	
}


function locationNameToIdOriginal($name) {
	// looks for a manual match to the import name (names are converted to lowercase to eliminate capitalizations changes)

	$baseName = nameLookup($name);
	$id = 0;
	
	$args = array(
		'post_type' => 'hours',
		'posts_per_page' => -1,
		'search_prod_title' => $baseName,
		'post_parent' => 0,
	);
	
	add_filter( 'posts_where', 'title_filter', 10, 2 );
	$locationList = new WP_Query( $args );
	remove_filter( 'posts_where', 'title_filter', 10, 2 );
	
	if ($locationList->have_posts()) {
		$locationList -> the_post();
		$id = get_post_meta(get_the_ID(), "associated_location", true);
		
		return $id;
		
	};
	
	// didn't find
	return 0;
	
	
}


function title_filter( $where, &$wp_query )
{
	global $wpdb;
	if ( $search_term = $wp_query->get( 'search_prod_title' ) ) {
		$where .= ' AND ' . $wpdb->posts . '.post_title LIKE \'%' . esc_sql( like_escape( $search_term ) ) . '%\'';
	}
	return $where;
}

function process_overview($arSheet) {
	$startRow = 4;
	
	$rObj = array();
	
	foreach($arSheet as $row => $item) {
		if ($row >= $startRow ) {
			if ($item[A] != "") {
				$semester = $item[A];
				$start = strtotime($item[B]);
				$end = strtotime($item[C]);
				
				$temp = array();
				
				echo "<b>$semester</b>: ".date("Y-m-d", $start)." to ".date("Y-m-d", $end)." <br>";
				
				$temp[semester] = $semester;
				$temp[start] = $start;
				$temp[end] = $end;
				
				array_push($rObj, $temp);
			}
		}
	}
	
	return $rObj;
}

function getTermHours($term, $type) {
	$arOut = array();
	
	$arClosings = array();
	$arExceptions = array();
	$arRegular = array();
	
	$hours = $term[hours];
	
	foreach($hours as $hour) {
		//print_r($hour);
		$name = $hour[name];
		$desc = $hour[description];
		$dates = array(
			"start" => date("Y-m-d", strtotime($hour[start]))
		);			
		
		if ($hour[end]) {
			$dates["end"] = date("Y-m-d", strtotime($hour[end]));
		} else {
			$dates["end"] = date("Y-m-d", strtotime($hour[start]));
		}
		
		
		$hrs = getHourHours($hour);

		if (checkClosed($desc)) {
			//echo "Closed";
			$arDay = array(
				"dates" => $dates,
				"reason" => $name
				
			);
			//print_r($dates);
			array_push($arClosings, $arDay);
			
		} else if (checkWeekday($name)) {
			//echo "Weekday";
			$arDay = array(
				"days" => toDays($name),
				"hours" => $hrs,
				"note" => ""
			);
			array_push($arRegular, $arDay);
			
		} else {
			//echo "Exception";
			$arDay = array(
				"dates" => $dates,
				"reason" => $name,
				"hours" => $hrs
			);
			//print_r($dates);
			array_push($arExceptions, $arDay);
		
		}
			
	}
	
	
	switch($type) {
		case "closings":
			return $arClosings;
			break;
		case "exceptions":
			return $arExceptions;
			break;
		case "regular":
			return $arRegular;
			break;
	}
	
}

function getExport($location) {
	$hours = getHours();

	$locationId = locationNameToId($location);
	
	$name = nameLookup($location);

	$locationObjectId = get_post_meta($locationId, "associated_location", true);
	
	$building = get_post_meta($locationObjectId, "building", true);
	$phone = get_post_meta($locationObjectId, "phone", true);
	
	$terms = $hours[$locationObjectId][terms];
	
	$arTerms = array();
	
	foreach($terms as $term) {
		//print_r($term);
		$outTerm = array();
		
		$outTerm[name] = $term[name];
		
		$dates = array();
		$dates[start] = date("Y-m-d", strtotime($term[start]));
		$dates[end] = date("Y-m-d", strtotime($term[end]));
		
		
		$closings = getTermHours($term, "closings");
		$exceptions = getTermHours($term, "exceptions");
		$regular = getTermHours($term, "regular");
		
		$outTerm[dates] = $dates;
		$outTerm[closings] = $closings;
		$outTerm[exceptions] = $exceptions;
		$outTerm[regular] = $regular;
		
		
		
		array_push($arTerms, $outTerm);
	}
	
	$arExport = array(
		"name" => $name,
		"location" => $building,
		"phone" => $phone,
		"terms" => $arTerms
	);

	
	
	//$arExport[name] = $name;
		
		
	$export = $arExport;
	return $export;
}