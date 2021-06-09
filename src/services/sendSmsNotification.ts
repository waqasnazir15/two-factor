function sendSmsNotification(code: number, phoneNumber: string) {
  // Code need to be added here send code in sms to phone number
  console.log("============= Code send to user phone number: -", phoneNumber);
  console.log("2FA code ----", code, "=========" );
  console.log("=============");
}

export default sendSmsNotification;
