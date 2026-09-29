/**
 * Local accessibility preferences.
 *
 * Cycle 1 scope: read and write the four preferences, keep them on the device,
 * and expose them as CSS classes + a navigation bar style. There is no server
 * call and no analytics, so nothing about the user leaves the phone.
 */
import { AccessibilitySettings, ContrastMode, TextScale } from '../types';

const STORAGE_KEY = 'everside.accessibility.v1';

export const DEFAULT_ACCESSIBILITY_SETTINGS: AccessibilitySettings = {
  textScale: 'standard',
  contrast: 'normal',
  spokenGuidance: false,
  reduceMotion: false
};

type Listener = (settings: AccessibilitySettings) => void;

const listeners: Listener[] = [];
let currentSettings: AccessibilitySettings = { ...DEFAULT_ACCESSIBILITY_SETTINGS };

function isTextScale(value: unknown): value is TextScale {
  return value === 'standard' || value === 'large';
}

function isContrastMode(value: unknown): value is ContrastMode {
  return value === 'normal' || value === 'high';
}

function toBoolean(value: unknown, fallback: boolean): boolean {
  return typeof value === 'boolean' ? value : fallback;
}

/**
 * Turn whatever was stored into a valid settings object.
 * Older or damaged storage must never break the Mini Program.
 */
function normalize(raw: unknown): AccessibilitySettings {
  if (!raw || typeof raw !== 'object') {
    return { ...DEFAULT_ACCESSIBILITY_SETTINGS };
  }
  const source = raw as Record<string, unknown>;
  return {
    textScale: isTextScale(source.textScale)
      ? source.textScale
      : DEFAULT_ACCESSIBILITY_SETTINGS.textScale,
    contrast: isContrastMode(source.contrast)
      ? source.contrast
      : DEFAULT_ACCESSIBILITY_SETTINGS.contrast,
    spokenGuidance: toBoolean(source.spokenGuidance, DEFAULT_ACCESSIBILITY_SETTINGS.spokenGuidance),
    reduceMotion: toBoolean(source.reduceMotion, DEFAULT_ACCESSIBILITY_SETTINGS.reduceMotion)
  };
}

function persist(settings: AccessibilitySettings): void {
  try {
    wx.setStorageSync(STORAGE_KEY, settings);
  } catch (error) {
    // Storage can be full or blocked. The Mini Program must keep working.
    console.warn('[everside] could not save accessibility settings', error);
  }
}

function notifyListeners(): void {
  const snapshot = { ...currentSettings };
  listeners.slice().forEach((listener) => listener(snapshot));
}

/** Load the saved preferences. Call once, from `app.onLaunch`. */
export function initAccessibilityStore(): AccessibilitySettings {
  try {
    currentSettings = normalize(wx.getStorageSync(STORAGE_KEY));
  } catch (error) {
    console.warn('[everside] could not read accessibility settings', error);
    currentSettings = { ...DEFAULT_ACCESSIBILITY_SETTINGS };
  }
  return { ...currentSettings };
}

/** Current preferences. Always a copy, so callers cannot corrupt the store. */
export function getAccessibilitySettings(): AccessibilitySettings {
  return { ...currentSettings };
}

/** Merge a change, save it, and tell every listener. */
export function updateAccessibilitySettings(
  patch: Partial<AccessibilitySettings>
): AccessibilitySettings {
  currentSettings = normalize({ ...currentSettings, ...patch });
  persist(currentSettings);
  notifyListeners();
  return { ...currentSettings };
}

/** Put every preference back to its default. */
export function resetAccessibilitySettings(): AccessibilitySettings {
  return updateAccessibilitySettings({ ...DEFAULT_ACCESSIBILITY_SETTINGS });
}

/** Subscribe to changes. Call the returned function to stop listening. */
export function subscribeAccessibility(listener: Listener): () => void {
  listeners.push(listener);
  return function unsubscribe(): void {
    const index = listeners.indexOf(listener);
    if (index >= 0) {
      listeners.splice(index, 1);
    }
  };
}

/**
 * Class list placed on the root element of every page.
 * `styles/theme.wxss` reacts to these four classes, which is how text size,
 * contrast and motion reach every screen without rewriting each page.
 */
export function accessibilityRootClass(settings: AccessibilitySettings = currentSettings): string {
  const classes = [
    'es-root',
    settings.textScale === 'large' ? 'es-scale-large' : 'es-scale-standard',
    settings.contrast === 'high' ? 'es-contrast-high' : 'es-contrast-normal',
    settings.reduceMotion ? 'es-reduce-motion' : ''
  ];
  return classes.filter(Boolean).join(' ');
}

/**
 * Keep the system navigation bar readable.
 * WeChat only accepts pure black or pure white bar text, so the bar itself
 * carries the contrast change.
 */
export function applyNavigationBarStyle(settings: AccessibilitySettings = currentSettings): void {
  try {
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: settings.contrast === 'high' ? '#ffffff' : '#f7f3ec',
      backgroundColorTop: settings.contrast === 'high' ? '#ffffff' : '#f7f3ec',
      backgroundColorBottom: settings.contrast === 'high' ? '#ffffff' : '#f7f3ec',
      backgroundTextStyle: 'dark'
    });
  } catch (error) {
    console.warn('[everside] could not style the navigation bar', error);
  }
}
