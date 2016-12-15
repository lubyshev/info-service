<?php

function parseSMS( $text ) {
  $text = preg_replace( '~\r~s','',$text);
  $strings = explode( "\n", $text);
  $secret = preg_replace( '~[^\d]~','',$strings [0]);
  $amount = (float) preg_replace(
      [ '~[^\d\,]~', '~\,~'],
      [ '', '.'],
      $strings [1]
  );
  $account = preg_replace( '~[^\d]~','',$strings [2]);;
  return [
    'account' => $account,
    'amount' => $amount,
    'secret' => $secret,
  ];
}

$smsText = "Пароль: 5671
Спишется 10,06р.
Перевод на счет 410011924394697";
$parsed = parseSMS( $smsText );

echo "==================================================\n";
printf( "Исходный текст:\n%s\n", $smsText);
echo "==================================================\n";
printf( 'Счет: %s, Сумма: %s, Пароль: %s' . PHP_EOL, $parsed['account'], $parsed['amount'], $parsed['secret']);
echo "==================================================\n";