/**
 * Display settings.
 *
 * Language, plus the four accessibility preferences of Cycle 1:
 * text size, colour contrast, spoken guidance and reduced motion.
 * Everything is saved on this phone. Text size and contrast are applied to the
 * whole Mini Program straight away; the language switches every screen at
 * once. The spoken guidance preference is saved now and used in a later cycle.
 */
import { buildChoiceOptions } from '../../data/home-actions';
import {
  accessibilityRootClass,
  getAccessibilitySettings,
  resetAccessibilitySettings,
  updateAccessibilitySettings
} from '../../utils/accessibility-store';
import { getLanguage, getStrings, languageOptions, setLanguage } from '../../utils/i18n';
import { bindLocale, unbindLocale } from '../../utils/locale-binding';
import { openHome } from '../../utils/navigation';
import { applyPageTitle } from '../../utils/page-title';
import { ChoiceOption, ContrastMode, TextScale } from '../../types';

type ChoiceEvent = WechatMiniprogram.CustomEvent<{ value: string }>;
type ToggleEvent = WechatMiniprogram.CustomEvent<{ checked: boolean }>;

Page({
  data: {
    a11yClass: '',
    copy: getStrings().settings,
    textScaleOptions: [] as ChoiceOption[],
    contrastOptions: [] as ChoiceOption[],
    languageOptions: [] as ChoiceOption[],
    language: '',
    textScale: 'standard' as TextScale,
    contrast: 'normal' as ContrastMode,
    spokenGuidance: false,
    reduceMotion: false,
    resetDialogVisible: false
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

  /**
   * Put the chosen language and the saved display settings on the screen.
   * Called when the screen opens and again whenever the language changes, so a
   * switch takes effect without a restart.
   */
  syncFromStore(): void {
    const copy = getStrings().settings;
    const settings = getAccessibilitySettings();
    this.setData({
      copy,
      textScaleOptions: buildChoiceOptions(copy.textScaleOptions),
      contrastOptions: buildChoiceOptions(copy.contrastOptions),
      languageOptions: languageOptions(),
      language: getLanguage(),
      textScale: settings.textScale,
      contrast: settings.contrast,
      spokenGuidance: settings.spokenGuidance,
      reduceMotion: settings.reduceMotion,
      a11yClass: accessibilityRootClass()
    });
    applyPageTitle(copy.title);
  },

  onLanguageChange(event: ChoiceEvent): void {
    setLanguage(event.detail.value);
  },

  onTextScaleChange(event: ChoiceEvent): void {
    this.setData({ textScale: event.detail.value as TextScale });
    updateAccessibilitySettings({ textScale: event.detail.value as TextScale });
    this.setData({ a11yClass: accessibilityRootClass() });
  },

  onContrastChange(event: ChoiceEvent): void {
    this.setData({ contrast: event.detail.value as ContrastMode });
    updateAccessibilitySettings({ contrast: event.detail.value as ContrastMode });
    this.setData({ a11yClass: accessibilityRootClass() });
  },

  onSpokenGuidanceChange(event: ToggleEvent): void {
    this.setData({ spokenGuidance: event.detail.checked });
    updateAccessibilitySettings({ spokenGuidance: event.detail.checked });
  },

  onReduceMotionChange(event: ToggleEvent): void {
    this.setData({ reduceMotion: event.detail.checked });
    updateAccessibilitySettings({ reduceMotion: event.detail.checked });
    this.setData({ a11yClass: accessibilityRootClass() });
  },

  onResetTap(): void {
    this.setData({ resetDialogVisible: true });
  },

  onResetCancel(): void {
    this.setData({ resetDialogVisible: false });
  },

  onResetConfirm(): void {
    resetAccessibilitySettings();
    this.setData({ resetDialogVisible: false });
    this.syncFromStore();
    wx.showToast({ title: this.data.copy.resetDone, icon: 'none', duration: 2000 });
  },

  onDone(): void {
    openHome();
  }
});
