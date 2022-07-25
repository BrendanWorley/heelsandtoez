<!--Через 10 секунд после появления сообщения об отправке или ошибке — отправляемся на сайт Кода :) -->
<meta http-equiv='refresh' content='10; url=http://heelsandtoez/'>
<meta charset="UTF-8" />
<!-- Начался блок PHP -->
<?php
// Получаем значения переменных из пришедших данных
$name = $_POST['name'];
$email = $_POST['email'];
$lastName = $_POST['lastName'];
$message = $_POST['message'];
$transitEmail = "ever-legion@yandex.ru";
$subjectText = 'You got message from '.$name.' '.$lastName;
$header = $subjectText;

// Формируем сообщение для отправки, в нём мы соберём всё, что ввели в форме
$mes = "FirstName: $name \nE-mail: $email \nSubject: You've got message from $lastName\nMessage: $message";
// Пытаемся отправить письмо по заданному адресу
// Если нужно, чтобы письма всё время уходили на ваш адрес — замените первую переменную $email на свой адрес электронной почты
$send = mail($transitEmail, $header, $mes, "Content-type:text/plain; charset = UTF-8\r\nFrom:$email");
// Если отправка прошла успешно — так и пишем
if ($send == 'true') {echo "YOUR MESSAGE HAS BEEN SENT SUCCESSFULLY!";}
// Если письмо не ушло — выводим сообщение об ошибке
else {echo "SOMETHING IS WRONG! YOUR MESSAGE SENDING FAILED!";}
?>