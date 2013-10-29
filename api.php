<?php include("../../../wp-blog-header.php"); ?>
<?php
	
	$location = $_GET["location"];
	
	$export = getExport($location);
	
	echo json_encode($export);
?>