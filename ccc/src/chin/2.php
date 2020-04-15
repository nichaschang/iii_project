<?php
require_once('vendor/autoload.php');

// use PhpOffice\PhpSpreadsheet\Spreadsheet;
// use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
// $spreadsheet = new Spreadsheet();
// $sheet = $spreadsheet->getActiveSheet();
// $sheet->setCellValue('A1', 'Hello World !');
// $writer = new Xlsx($spreadsheet);
// $writer->save('hello world.xlsx');
// $cellValue = $spreadsheet->getActiveSheet()->getCell('A1')->getValue();
// echo $cellValue;

$inputFileName = './multiple_images.xlsx';
$spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load($inputFileName);
$highestRow = $spreadsheet->getActiveSheet()->getHighestRow();

require_once('./db.inc.php');

for($i = 1; $i <= $highestRow; $i++) {
    //若是某欄位值為空，代表那一列可能都沒資料，便跳出迴圈
    if( $spreadsheet->getActiveSheet()->getCell('A'.$i)-> getCalculatedValue() === '' || $spreadsheet->getActiveSheet()->getCell('A'.$i)-> getCalculatedValue() === null ) break;
    
    $multipleImageImg =                       $spreadsheet->getActiveSheet()->getCell('A'.$i)-> getCalculatedValue();
    $itemId =                       $spreadsheet->getActiveSheet()->getCell('B'.$i)-> getCalculatedValue();
    $itemName  =                   $spreadsheet->getActiveSheet()->getCell('C'.$i)-> getCalculatedValue();
    // $itemPrice  =       $spreadsheet->getActiveSheet()->getCell('D'.$i)-> getCalculatedValue();
    // $itemQty  =                      $spreadsheet->getActiveSheet()->getCell('E'.$i)-> getCalculatedValue();
    // $itemCategoryId  =               $spreadsheet->getActiveSheet()->getCell('F'.$i)-> getCalculatedValue();
    // $courseId =                         $spreadsheet->getActiveSheet()->getCell('G'.$i)->getValue();
    // $courseCredit =                     $spreadsheet->getActiveSheet()->getCell('H'.$i)->getValue();
    // $courseClassTime =                  $spreadsheet->getActiveSheet()->getCell('I'.$i)->getValue();
    // $courseCollaborator =               $spreadsheet->getActiveSheet()->getCell('J'.$i)->getValue();
    // $courseCollaboratorCategory =       $spreadsheet->getActiveSheet()->getCell('K'.$i)->getValue();
    // $courseCollaboratorIntroduction =   $spreadsheet->getActiveSheet()->getCell('L'.$i)->getValue();
    // $courseResult =                     $spreadsheet->getActiveSheet()->getCell('M'.$i)->getValue();
    // $courseSDGs =                       $spreadsheet->getActiveSheet()->getCell('N'.$i)->getValue();
    
    // echo "[".$i."] ".$courseTerm." ".$courseName."\n";
    
    $sql = "insert into `multiple_images` (
        `multipleImageImg`, `itemId`,`itemName`) values (
            ?,?,?
        )";
    $stmt = $pdo->prepare($sql);
    $arrParam = [
        (string)$multipleImageImg,
        (string)$itemId,
        (string)$itemName,
    ];
    $stmt->execute($arrParam);
    if( $stmt->rowCount() > 0 ){
        echo $pdo->lastInsertId();
    }
}
?>