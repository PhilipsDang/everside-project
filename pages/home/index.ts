/**
 * Home screen.
 *
 * Four large actions, each one a single obvious target. In this cycle they open
 * the placeholder pages; the real features arrive in later cycles. The wording
 * comes from the active language.
 */
import { buildHomeActions } from '../../data/home-actions';
import { accessibilityRootClass } from '../../utils/accessibility-store';
import { getStrings } from '../../utils/i18n';
import { bindLocale, unbindLocale } from '../../utils/locale-binding';
import { navigateTo } from '../../utils/navigation';
import { applyPageTitle } from '../../utils/page-title';
import { HomeAction } from '../../types';

type ActionEvent = WechatMiniprogram.BaseEvent<WechatMiniprogram.IAnyObject, { route: string }>;

Page({
  data: {
    a11yClass: '',
    copy: getStrings().home,
    actions: [] as HomeAction[]
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

  /** Rebuild the list in the current language. */
  syncFromStore(): void {
    const copy = getStrings().home;
    this.setData({ copy, actions: buildHomeActions(), a11yClass: accessibilityRootClass() });
    applyPageTitle(copy.title);
  },

  onActionTap(event: ActionEvent): void {
    const route = event.currentTarget.dataset.route;
    if (route) {
      navigateTo(route);
    }
  }
});
