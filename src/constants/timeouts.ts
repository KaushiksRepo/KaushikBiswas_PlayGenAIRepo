export const TIMEOUTS = {
  /** Default action timeout (click, fill, etc.) */
  DEFAULT: 30_000,

  /** Page navigation timeout */
  NAVIGATION: 60_000,

  /** Assertion/expect timeout */
  EXPECT: 10_000,

  /** Short wait for quick transitions */
  SHORT: 5_000,

  /** Medium wait for page loads */
  MEDIUM: 15_000,

  /** Long wait for complex operations */
  LONG: 45_000,

  /** API request timeout */
  API: 30_000,

  /** File download timeout */
  DOWNLOAD: 60_000,

  /** Element poll interval for custom waits */
  POLL_INTERVAL: 250,

  /** Debounce interval for stability checks */
  STABILITY_INTERVAL: 500,
} as const;

export type TimeoutKey = keyof typeof TIMEOUTS;
