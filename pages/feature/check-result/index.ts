/** Localized result screen for the Cycle 2 fraud-check demonstration. */
import { FraudAnalysisResult, FraudRiskLevel } from '../../../types';
import { accessibilityRootClass } from '../../../utils/accessibility-store';
import { clearFraudResult, getFraudResult } from '../../../utils/fraud-session';
import { getStrings } from '../../../utils/i18n';
import { bindLocale, unbindLocale } from '../../../utils/locale-binding';
import { goBack, openHome } from '../../../utils/navigation';
import { applyPageTitle } from '../../../utils/page-title';
import { ROUTES } from '../../../utils/routes';

function riskClass(risk: FraudRiskLevel): string {
  return `es-risk es-risk--${risk}`;
}

Page({
  data: {
    a11yClass: '',
    copy: getStrings().fraudCheck,
    hasResult: false,
    riskClass: '',
    riskLabel: '',
    summary: '',
    warningSigns: [] as string[],
    actions: [] as string[],
    sensitiveDetected: false,
    imageOnly: false
  },

  onLoad(): void {
    bindLocale(this, () => this.syncFromStore());
  },

  onUnload(): void {
    unbindLocale(this);
    clearFraudResult();
  },

  onShow(): void {
    this.syncFromStore();
  },

  onReady(): void {
    applyPageTitle(this.data.copy.result.title);
  },

  syncFromStore(): void {
    const copy = getStrings().fraudCheck;
    const result = getFraudResult();
    if (!result) {
      this.setData({
        copy,
        hasResult: false,
        a11yClass: accessibilityRootClass()
      });
      applyPageTitle(copy.result.title);
      return;
    }
    this.applyResult(result, copy);
  },

  applyResult(
    result: FraudAnalysisResult,
    copy: ReturnType<typeof getStrings>['fraudCheck']
  ): void {
    this.setData({
      copy,
      hasResult: true,
      riskClass: riskClass(result.risk),
      riskLabel: copy.result.levels[result.risk],
      summary: copy.result.summaries[result.risk],
      warningSigns: result.indicators.map((id) => copy.indicators[id]),
      actions: result.actions.map((id) => copy.actions[id]),
      sensitiveDetected: result.sensitiveDetected,
      imageOnly: result.imageOnly,
      a11yClass: accessibilityRootClass()
    });
    applyPageTitle(copy.result.title);
  },

  onCheckAnother(): void {
    clearFraudResult();
    goBack(ROUTES.checkSuspiciousMessage);
  },

  onHome(): void {
    clearFraudResult();
    openHome();
  }
});
