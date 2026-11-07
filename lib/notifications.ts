interface NotificationChannelPayload {
  title: string;
  message: string;
  recipient?: string;
}

export async function sendSmsNotification(_payload: NotificationChannelPayload) {
  // TODO: Wire Twilio here for production SMS delivery.
  return { ok: true, channel: "sms" };
}

export async function sendEmailNotification(_payload: NotificationChannelPayload) {
  // TODO: Wire Nodemailer or SMTP transport here for production email delivery.
  return { ok: true, channel: "email" };
}
