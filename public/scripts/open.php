<?php
	$subFolder = $_POST["subFolder"];

	// specifying directory
	$dir = "../../projects";

	if ($subFolder != "null")
	{
		$dir = "../../projects/{$subFolder}";
	}

	//scanning files in a given directory in ascending order
	$folders = scandir($dir);
	$folders = array_splice($folders, 2);

    echo json_encode($folders);