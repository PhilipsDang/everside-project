/**
 * 通话帮助 / Help with phone calls - placeholder screen.
 *
 * One page per home action: they all render the same template, so the wording,
 * the Back button and the way back Home stay identical in every language.
 */
import { FEATURE_CALL_HELP, buildFeaturePlaceholderView } from '../../../data/features';
import { accessibilityRootClass } from '../../../utils/accessibility-store';
import { bindLocale, unbindLocale } from '../../../utils/locale-binding';
import { goBack } from '../../../utils/navigation';
import { applyPageTitle } from '../../../utils/page-title';

const FEATURE = FEATURE_CALL_HELP;

Page({
  data: {
    view: buildFeaturePlaceholderView(FEATURE, '')
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
    applyPageTitle(this.data.view.title);
  },

  /** Rebuild the screen in the current language. */
  syncFromStore(): void {
    const view = buildFeaturePlaceholderView(FEATURE, accessibilityRootClass());
    this.setData({ view });
    applyPageTitle(view.title);
  },

  onBackTap(): void {
    goBack();
  }
});
