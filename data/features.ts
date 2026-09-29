/**
 * Structure of the four feature placeholder screens.
 *
 * This file says *what exists*. Every sentence comes from the active language in
 * `locales/`, so the same screen reads correctly in Chinese and in English.
 */
import { FeaturePlaceholderView } from '../types';
import { getStrings } from '../utils/i18n';

/** The four features, one page each. */
export type FeatureId = 'checkSuspiciousMessage' | 'dailyTasks' | 'callHelp' | 'familyGuard';

export const FEATURE_CHECK_SUSPICIOUS_MESSAGE: FeatureId = 'checkSuspiciousMessage';
export const FEATURE_DAILY_TASKS: FeatureId = 'dailyTasks';
export const FEATURE_CALL_HELP: FeatureId = 'callHelp';
export const FEATURE_FAMILY_GUARD: FeatureId = 'familyGuard';

/**
 * Build the view model for the shared placeholder template, in the language in
 * use right now. Call it again after the language changes.
 */
export function buildFeaturePlaceholderView(
  feature: FeatureId,
  a11yClass: string
): FeaturePlaceholderView {
  const shared = getStrings().features;
  const item = shared.items[feature];
  return {
    title: item.title,
    subtitle: item.subtitle,
    intro: item.intro,
    pointsTitle: shared.pointsTitle,
    points: item.points,
    comingSoonTitle: shared.comingSoonTitle,
    comingSoonBody: shared.comingSoonBody,
    todayTipTitle: shared.todayTipTitle,
    todayTip: item.todayTip,
    backLabel: shared.backLabel,
    backAriaLabel: shared.backAriaLabel,
    a11yClass
  };
}
