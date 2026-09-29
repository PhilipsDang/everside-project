/**
 * Wording for the `es-status` component: loading, error and empty states.
 *
 * All of it comes from the active language, so the three states read
 * correctly in Chinese and in English. The wording is deliberately short and
 * never suggests the user caused a problem.
 */
import { getStrings } from './i18n';
import { StatusType } from '../types';

export interface StatusCopy {
  title: string;
  description: string;
}

function stateFor(type: StatusType): StatusCopy {
  const states = getStrings().status;
  return states[type] || states.empty;
}

/**
 * Resolve the wording for a status.
 * An unknown type falls back to the neutral empty wording instead of breaking.
 */
export function resolveStatusCopy(
  type: StatusType,
  title?: string,
  description?: string
): StatusCopy {
  const defaults = stateFor(type);
  return {
    title: title && title.length > 0 ? title : defaults.title,
    description: description && description.length > 0 ? description : defaults.description
  };
}
