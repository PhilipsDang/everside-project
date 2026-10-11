/**
 * Keeps a page or a component in step with the chosen language.
 *
 * A screen calls `bindLocale(this, ...)` when it is created and
 * `unbindLocale(this)` when it goes away. The change callback then runs the
 * same code path as returning to the screen, so there is a single place where
 * a page decides what "the current language" means.
 *
 * The unsubscribe functions are kept in a WeakMap rather than on the instance,
 * so nothing is added to the data of the page or the component.
 */
import { subscribeLocale } from './i18n';

const unsubscribes = new WeakMap<object, () => void>();

/** Re-run `refresh` every time the language changes. */
export function bindLocale(target: object, refresh: () => void): void {
  unbindLocale(target);
  unsubscribes.set(target, subscribeLocale(refresh));
}

/** Stop listening. Safe to call even when nothing was bound. */
export function unbindLocale(target: object): void {
  const unsubscribe = unsubscribes.get(target);
  if (unsubscribe) {
    unsubscribe();
    unsubscribes.delete(target);
  }
}
