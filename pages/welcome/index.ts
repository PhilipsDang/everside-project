/**
 * Welcome screen.
 *
 * The entry point of the Mini Program. One primary action (开始使用 / Get
 * started), a way to change the display, a way to ask a family member for help,
 * and the language switch. Everything on the screen comes from `locales/`.
 */
import { accessibilityRootClass } from '../../utils/accessibility-store';
import { getStrings, getLanguage, languageOptions, setLanguage } from '../../utils/i18n';
import { bindLocale, unbindLocale } from '../../utils/locale-binding';
import { navigateTo, openHome } from '../../utils/navigation';
import { applyPageTitle } from '../../utils/page-title';
import { ROUTES } from '../../utils/routes';
import { ChoiceOption } from '../../types';

type ChoiceEvent = WechatMiniprogram.CustomEvent<{ value: string }>;

Page({
  data: {
    a11yClass: '',
    copy: getStrings().welcome,
    brand: getStrings().brand,
    languageOptions: [] as ChoiceOption[],
    language: ''
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
    applyPageTitle(this.data.brand.name);
  },

  /** Put the current language and the saved display settings on the screen. */
  syncFromStore(): void {
    const strings = getStrings();
    this.setData({
      copy: strings.welcome,
      brand: strings.brand,
      languageOptions: languageOptions(),
      language: getLanguage(),
      a11yClass: accessibilityRootClass()
    });
    applyPageTitle(strings.brand.name);
  },

  onLanguageChange(event: ChoiceEvent): void {
    setLanguage(event.detail.value);
  },

  onStart(): void {
    openHome();
  },

  onOpenSettings(): void {
    navigateTo(ROUTES.settings);
  },

  onOpenFamilyAssist(): void {
    navigateTo(ROUTES.familyAssist);
  }
});
