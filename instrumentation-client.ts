import posthog from 'posthog-js';

// Initialize PostHog analytics
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  defaults: '2025-05-24',
  capture_exceptions: true,
//   debug: process.env.NODE_ENV === 'development',
});