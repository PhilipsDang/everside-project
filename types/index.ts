/**
 * Shared domain types for EverSide.
 * Code and comments are in English; every string that reaches the screen comes
 * from `locales/`, never from here.
 */

/** Text size preference. Cycle 1 supports two sizes only, on purpose. */
export type TextScale = 'standard' | 'large';

/** Colour contrast preference. */
export type ContrastMode = 'normal' | 'high';

/**
 * Accessibility preferences owned by the user.
 * Every field is stored locally on the device; nothing leaves the phone in this cycle.
 */
export interface AccessibilitySettings {
  /** Larger default text. */
  textScale: TextScale;
  /** Black/white palette with stronger borders. */
  contrast: ContrastMode;
  /**
   * Spoken guidance preference. The preference is saved now; the spoken output
   * itself arrives in a later cycle.
   */
  spokenGuidance: boolean;
  /** Removes animation and the pressed-scale effect. */
  reduceMotion: boolean;
}

/** One of the four large actions on the home screen. */
export interface HomeAction {
  /** Stable identifier, also used as the list key. */
  id: string;
  /** Action name shown on the home screen, in the active language. */
  title: string;
  /** One short sentence explaining what the action is for. */
  description: string;
  /** Target page route. Always a real, registered page. */
  route: string;
  /** Longer wording for screen readers, in the active language. */
  ariaLabel: string;
}

/** A single bullet explaining what a future feature will do. */
export interface FeaturePoint {
  title: string;
  detail: string;
}

/** Option rendered by the `es-choice` component. */
export interface ChoiceOption {
  value: string;
  label: string;
}

/** Labels of a small set of options, keyed by value, as written in a locale. */
export type OptionLabels = Record<string, string>;

/** Data contract of the shared feature placeholder template. */
export interface FeaturePlaceholderView {
  title: string;
  subtitle: string;
  intro: string;
  pointsTitle: string;
  points: FeaturePoint[];
  comingSoonTitle: string;
  comingSoonBody: string;
  todayTipTitle: string;
  todayTip: string;
  backLabel: string;
  backAriaLabel: string;
  a11yClass: string;
}

/** Type of the state shown by the `es-status` component. */
export type StatusType = 'loading' | 'error' | 'empty';
