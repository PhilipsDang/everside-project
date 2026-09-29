/**
 * 家人协助设置 - placeholder screen for the family helper flow.
 * Ready for a relative to sit with the user and adjust the display; the actual
 * helper flow arrives in a later cycle. All wording comes from `locales/`.
 */
import { accessibilityRootClass } from '../../utils/accessibility-store';
import { getStrings } from '../../utils/i18n';
import { bindLocale, unbindLocale } from '../../utils/locale-binding';
import { goBack, openSettings } from '../../utils/navigation';
import { applyPageTitle } from '../../utils/page-title';

Page({
  data: {
    a11yClass: '',
    copy: getStrings().familyAssist,
    shared: getStrings().features
  },

  onLoad(): void {
    bindLocale(this, () => this.syncFromStore());
  },

  onUnload(): void {
    unbindLocale(this);
  },

  onShow(): void {
    this.syncFromStore();
  },

  onReady(): void {
    applyPageTitle(this.data.copy.title);
  },

  syncFromStore(): void {
    const strings = getStrings();
    this.setData({
      copy: strings.familyAssist,
      shared: strings.features,
      a11yClass: accessibilityRootClass()
    });
    applyPageTitle(strings.familyAssist.title);
  },

  onBackTap(): void {
    goBack();
  },

  onOpenSettings(): void {
    openSettings();
  }
});
