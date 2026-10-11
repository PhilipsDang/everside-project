/**
 * Ephemeral hand-off between the input and result screens.
 * Only classification codes are kept. The submitted text and image path never
 * enter this module and nothing is written to device storage.
 */
import type { FraudAnalysisResult } from '../types';

let currentResult: FraudAnalysisResult | null = null;

function copyResult(result: FraudAnalysisResult): FraudAnalysisResult {
  return {
    ...result,
    indicators: [...result.indicators],
    actions: [...result.actions]
  };
}

export function setFraudResult(result: FraudAnalysisResult): void {
  currentResult = copyResult(result);
}

export function getFraudResult(): FraudAnalysisResult | null {
  return currentResult ? copyResult(currentResult) : null;
}

export function clearFraudResult(): void {
  currentResult = null;
}
