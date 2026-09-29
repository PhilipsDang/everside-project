/**
 * Language of the Mini Program.
 *
 * Cycle 1 supports Simplified Chinese and English:
 *   - the first launch is always Simplified Chinese, whatever the phone is set
 *     to, because that is the language this service is written for;
 *   - the choice is saved on the device, so it survives a restart;
 *   - changing it takes effect immediately, with no restart and no reload;
 *   - a key that a translation is missing falls back to Simplified Chinese
 *     instead of leaving a blank space on the screen.
 *
 * All wording lives in `locales/`. Nothing in `pages/` or `components/` may
 * contain text of its own; `npm run check:i18n` fails if it does.
 */
import { enUS } from '../locales/en-US';
import { Locale, zhCN } from '../locales/zh-CN';
import { ChoiceOption } from '../types';
import { deepMerge, diffKeys, readPath } from './locale-objects';

const STORAGE_KEY = 'everside.locale.v1';

/** Language used on first launch, and whenever a translation is missing. */
export const FALLBACK_LANGUAGE = 'zh-CN';

/** Languages the Mini Program ships with, in the order they are offered. */
export const SUPPORTED_LANGUAGES = ['zh-CN', 'en-US'] as const;

export type LanguageCode = (typeof SUPPORTED_LANGUAGES)[number];

/**
 * Endonyms, shown in the language switch.
 * A language is always written in its own name, so someone who cannot read the
 * current language can still find their own.
 */
export const LANGUAGE_LABELS: Record<LanguageCode, string> = {
  'zh-CN': '中文',
  'en-US': 'English'
};

const DICTIONARIES: Record<LanguageCode, Locale> = {
  'zh-CN': zhCN,
  'en-US': enUS
};

type Listener = (language: LanguageCode) => void;

const listeners: Listener[] = [];
let currentLanguage: LanguageCode = FALLBACK_LANGUAGE;
const merged = new Map<LanguageCode, Locale>();

function isLanguageCode(value: unknown): value is LanguageCode {
  return typeof value === 'string' && (SUPPORTED_LANGUAGES as readonly string[]).includes(value);
}

/** Dictionary of one language, with the fallback language filling any gaps. */
function stringsFor(language: LanguageCode): Locale {
  const cached = merged.get(language);
  if (cached) {
    return cached;
  }
  const result =
    language === FALLBACK_LANGUAGE
      ? DICTIONARIES[FALLBACK_LANGUAGE]
      : deepMerge(DICTIONARIES[FALLBACK_LANGUAGE], DICTIONARIES[language]);
  merged.set(language, result);
  return result;
}

function persist(language: LanguageCode): void {
  try {
    wx.setStorageSync(STORAGE_KEY, language);
  } catch (error) {
    // A full or blocked storage must never stop the Mini Program.
    console.warn('[everside] could not save the language', error);
  }
}

function notifyListeners(): void {
  listeners.slice().forEach((listener) => listener(currentLanguage));
}

/** Read the saved language. Call once, from `app.onLaunch`. */
export function initLocale(): LanguageCode {
  try {
    const stored = wx.getStorageSync(STORAGE_KEY);
    currentLanguage = isLanguageCode(stored) ? stored : FALLBACK_LANGUAGE;
  } catch (error) {
    console.warn('[everside] could not read the language', error);
    currentLanguage = FALLBACK_LANGUAGE;
  }
  return currentLanguage;
}

/** Language in use right now. */
export function getLanguage(): LanguageCode {
  return currentLanguage;
}

/**
 * Switch language, save it, and tell every page and component to redraw.
 * An unknown code is ignored rather than breaking the screen.
 */
export function setLanguage(language: string): LanguageCode {
  if (!isLanguageCode(language) || language === currentLanguage) {
    return currentLanguage;
  }
  currentLanguage = language;
  persist(language);
  notifyListeners();
  return currentLanguage;
}

/** Every string of the active language, ready to hand to a page. */
export function getStrings(): Locale {
  return stringsFor(currentLanguage);
}

/** One string of the active language, with the fallback language behind it. */
export function t(path: string): string {
  return readPath(getStrings(), path);
}

/** The two languages as options for the `es-choice` component. */
export function languageOptions(): ChoiceOption[] {
  return SUPPORTED_LANGUAGES.map((code) => ({ value: code, label: LANGUAGE_LABELS[code] }));
}

/** Subscribe to language changes. Call the returned function to stop listening. */
export function subscribeLocale(listener: Listener): () => void {
  listeners.push(listener);
  return function unsubscribe(): void {
    const index = listeners.indexOf(listener);
    if (index >= 0) {
      listeners.splice(index, 1);
    }
  };
}

/**
 * Keys this language is missing, and keys it adds that the fallback language
 * does not know. Used by the development check and by a warning in the console.
 */
export function findTranslationGaps(language: LanguageCode): {
  missing: string[];
  extra: string[];
  empty: string[];
} {
  return diffKeys(DICTIONARIES[FALLBACK_LANGUAGE], DICTIONARIES[language]);
}
