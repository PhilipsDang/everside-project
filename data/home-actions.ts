/**
 * Structure of the home screen.
 *
 * This file says *what exists* - which actions, and where they lead. The wording
 * of each action comes from the active language in `locales/`, so the same
 * structure reads correctly in Chinese and in English.
 */
import { ChoiceOption, HomeAction, OptionLabels } from '../types';
import { getStrings } from '../utils/i18n';
import { ROUTES } from '../utils/routes';

/** One home action, before its wording is filled in. */
interface HomeActionDefinition {
  /** Key of this action inside `home.actions` in the locale files. */
  key: 'checkSuspiciousMessage' | 'dailyTasks' | 'callHelp' | 'familyGuard';
  route: string;
}

const ACTION_DEFINITIONS: HomeActionDefinition[] = [
  { key: 'checkSuspiciousMessage', route: ROUTES.checkSuspiciousMessage },
  { key: 'dailyTasks', route: ROUTES.dailyTasks },
  { key: 'callHelp', route: ROUTES.callHelp },
  { key: 'familyGuard', route: ROUTES.familyGuard }
];

/**
 * The four home actions in the language in use right now.
 * Call it again after the language changes to rebuild the list.
 */
export function buildHomeActions(): HomeAction[] {
  const actions = getStrings().home.actions;
  return ACTION_DEFINITIONS.map((definition) => {
    const action = actions[definition.key];
    return {
      id: definition.key,
      title: action.title,
      description: action.description,
      route: definition.route,
      ariaLabel: action.ariaLabel
    };
  });
}

/**
 * Turn the labels of a small set of options into the list the `es-choice`
 * component renders. The order always follows the locale file, so the options
 * never jump around when the language changes.
 */
export function buildChoiceOptions(labels: OptionLabels): ChoiceOption[] {
  return Object.keys(labels).map((value) => ({ value, label: labels[value] }));
}
