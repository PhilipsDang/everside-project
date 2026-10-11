/**
 * Stable order of the five Cycle 2 demonstration cases.
 * Their visible wording is rebuilt from the active locale.
 */
import type { FraudExample, FraudExampleId } from '../types';
import { getStrings } from '../utils/i18n';

const EXAMPLE_IDS: FraudExampleId[] = ['bank', 'family', 'investment', 'health', 'appointment'];

export function buildFraudExamples(): FraudExample[] {
  const copy = getStrings().fraudCheck.examples;
  return EXAMPLE_IDS.map((id) => ({ id, ...copy[id] }));
}
