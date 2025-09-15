declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      NEXTAUTH_URL: string;
      NEXTAUTH_SECRET: string;
      STRIPE_SECRET_KEY: string;
      STRIPE_PUBLISHABLE_KEY: string;
      STRIPE_CONNECT_CLIENT_ID: string;
      STRIPE_WEBHOOK_SECRET: string;
      PERSONA_API_KEY: string;
      PERSONA_WEBHOOK_SECRET: string;
      UPLOADTHING_TOKEN: string;
      S3_REGION: string;
      S3_BUCKET: string;
      S3_ACCESS_KEY_ID: string;
      S3_SECRET_ACCESS_KEY: string;
      POSTHOG_KEY: string;
      SENTRY_AUTH_TOKEN: string;
    }
  }
}

export {};
