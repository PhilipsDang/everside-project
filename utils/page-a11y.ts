/**
 * Small helpers shared by every page.
 *
 * Pages keep one field, `a11yClass`, in their data. Refreshing it re-applies the
 * text size, contrast and motion preferences to the whole screen, including
 * everything inside the reusable components.
 */
import { accessibilityRootClass, getAccessibilitySettings } from './accessibility-store';
import { AccessibilitySettings } from '../types';

/** Data every page adds to its own data object. */
export interface AccessibilityPageData {
  a11yClass: string;
}

/**
 * The part of a page instance these helpers need.
 * `setData` is declared with a wide patch type on purpose, so a real page
 * instance can be passed in without any cast.
 */
export interface AccessibilityPageContext {
  setData(patch: Record<string, unknown>, callback?: () => void): void;
}

/** Re-apply the saved preferences to the current screen. */
export function applyAccessibilityClasses(page: AccessibilityPageContext): void {
  page.setData({ a11yClass: accessibilityRootClass() });
}

/**
 * Same, for screens that keep their text in a nested object.
 * `dataPath` is a setData path, for example `'view.a11yClass'`.
 */
export function applyAccessibilityClassesAt(
  page: AccessibilityPageContext,
  dataPath: string
): void {
  const patch: Record<string, unknown> = {};
  patch[dataPath] = accessibilityRootClass();
  page.setData(patch);
}

/** Snapshot of the preferences, for pages that render the current values. */
export function currentAccessibilitySettings(): AccessibilitySettings {
  return getAccessibilitySettings();
}
