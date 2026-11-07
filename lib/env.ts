function required(name: string, fallback?: string) {
  const value = process.env[name] ?? fallback;

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export const env = {
  mongoUri: required("MONGODB_URI"),
  jwtSecret: required("JWT_SECRET"),
  appUrl: required("NEXT_PUBLIC_APP_URL", "http://localhost:3000"),
  socketUrl: required("NEXT_PUBLIC_SOCKET_URL", "http://localhost:3000"),
  googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
  twilioSid: process.env.TWILIO_ACCOUNT_SID ?? "",
  twilioToken: process.env.TWILIO_AUTH_TOKEN ?? "",
  twilioFrom: process.env.TWILIO_FROM_NUMBER ?? "",
  smtpHost: process.env.SMTP_HOST ?? "",
  smtpPort: process.env.SMTP_PORT ?? "",
  smtpUser: process.env.SMTP_USER ?? "",
  smtpPassword: process.env.SMTP_PASSWORD ?? "",
  smtpFrom: process.env.SMTP_FROM ?? ""
};
