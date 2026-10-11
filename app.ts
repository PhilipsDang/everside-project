/**
 * EverSide - application entry point (Cycle 1).
 *
 * Cycle 1 does four things only:
 * 1. loads the language saved on this phone, defaulting to Simplified Chinese,
 * 2. loads the accessibility preferences saved on this phone,
 * 3. keeps the navigation bar readable,
 * 4. keeps `globalData` up to date for later cycles.
 *
 * There is no network request, no login and no analytics in this cycle.
 */
import {
  applyNavigationBarStyle,
  initAccessibilityStore,
  subscribeAccessibility
} from './utils/accessibility-store';
import { LanguageCode, initLocale, subscribeLocale } from './utils/i18n';
import { AccessibilitySettings } from './types';

App({
  globalData: {
    /**
     * Latest saved preferences. `null` until `onLaunch` has read the storage;
     * it is filled in immediately after launch.
     */
    accessibility: null as AccessibilitySettings | null,
    /** Language in use, one of the supported codes. */
    language: null as LanguageCode | null
  },

  onLaunch() {
    const language = initLocale();
    this.globalData.language = language;
    console.info(`[everside] language: ${language}`);

    const settings = initAccessibilityStore();
    this.globalData.accessibility = settings;
    applyNavigationBarStyle(settings);

    subscribeAccessibility((next) => {
      this.globalData.accessibility = next;
      applyNavigationBarStyle(next);
    });

    subscribeLocale((next) => {
      this.globalData.language = next;
      console.info(`[everside] language: ${next}`);
    });
  }
});
