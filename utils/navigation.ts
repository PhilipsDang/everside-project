/**
 * Navigation helpers.
 *
 * Rules used across the whole Mini Program:
 * - "Return Home" always works, even when the user opened a deep page directly.
 * - "Back" never traps the user: it falls back to Home when there is no history.
 * - Failures produce a calm, blaming-nobody message instead of a silent no-op.
 */
import { ROUTES } from './routes';

const OPEN_FAILED_MESSAGE = '页面暂时打不开，请稍后再试';

/** Number of pages currently in the page stack. */
function pageStackSize(): number {
  return getCurrentPages().length;
}

/** Route of the page on top of the stack, without a leading slash. */
function currentRoute(): string {
  const stack = getCurrentPages();
  const top = stack[stack.length - 1];
  return top ? top.route : '';
}

/** Show one calm toast. Never blames the user for a failure. */
function notifyOpenFailed(): void {
  wx.showToast({ title: OPEN_FAILED_MESSAGE, icon: 'none', duration: 2500 });
}

/** Open a page, pushing it on the stack. */
export function navigateTo(route: string): void {
  wx.navigateTo({
    url: route,
    fail: notifyOpenFailed
  });
}

/** Open a page, replacing the current one. */
export function redirectTo(route: string): void {
  wx.redirectTo({
    url: route,
    fail: notifyOpenFailed
  });
}

/**
 * Go Home.
 * `reLaunch` clears the stack on purpose, so the intro page can never be
 * reached again by accident and the stack cannot grow without limit.
 * Does nothing when the home screen is already open.
 */
export function openHome(): void {
  if (currentRoute() === 'pages/home/index') {
    return;
  }
  wx.reLaunch({ url: ROUTES.home });
}

/**
 * Go back one step.
 * Falls back to Home when there is nothing to go back to, for example when a
 * page is opened directly from a QR code or a chat message.
 */
export function goBack(fallbackRoute: string = ROUTES.home): void {
  if (pageStackSize() > 1) {
    wx.navigateBack({
      delta: 1,
      fail: () => redirectTo(fallbackRoute)
    });
    return;
  }
  redirectTo(fallbackRoute);
}

/**
 * Open the display settings.
 * Reuses the settings page when it is already on screen, so repeated taps
 * cannot pile up identical pages.
 */
export function openSettings(): void {
  if (currentRoute() === 'pages/settings/index') {
    return;
  }
  if (pageStackSize() > 1) {
    navigateTo(ROUTES.settings);
    return;
  }
  redirectTo(ROUTES.settings);
}
