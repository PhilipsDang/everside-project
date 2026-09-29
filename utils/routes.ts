/**
 * Every page route in the Mini Program, in one place.
 * Adding a screen here is the only step needed to make it reachable:
 * `scripts/validate-project.mjs` fails if a route is missing from `app.json`.
 */
export const ROUTES = {
  welcome: '/pages/welcome/index',
  home: '/pages/home/index',
  checkSuspiciousMessage: '/pages/feature/check-suspicious-message/index',
  dailyTasks: '/pages/feature/daily-tasks/index',
  callHelp: '/pages/feature/call-help/index',
  familyGuard: '/pages/feature/family-guard/index',
  settings: '/pages/settings/index',
  familyAssist: '/pages/family-assist/index'
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
