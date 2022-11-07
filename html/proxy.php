<?php
header("Content-type: text/calendar");
$prefix = "";
if (isset($_GET['prefix'])) $prefix = $_GET['prefix'];
echo preg_replace("/SUMMARY:/","SUMMARY:".$prefix."",file_get_contents($_GET['url']));
?>
