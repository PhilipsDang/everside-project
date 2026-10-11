/**
 * The title in the system navigation bar.
 *
 * Set in code rather than in each page JSON file, so it follows the chosen
 * language. WeChat asks for this to happen once the page is ready, which is
 * what the pages do.
 */

/** Show `title` in the navigation bar. */
export function applyPageTitle(title: string): void {
  if (!title) {
    return;
  }
  try {
    wx.setNavigationBarTitle({ title });
  } catch (error) {
    console.warn('[everside] could not set the page title', error);
  }
}
