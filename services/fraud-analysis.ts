/**
 * Replaceable Cycle 2 fraud-analysis service.
 *
 * This implementation is deliberately local and deterministic. It sends no
 * network request and returns codes rather than visible wording. A future
 * backend can implement the same interface without changing either page.
 */
import type {
  FraudActionId,
  FraudAnalysisInput,
  FraudAnalysisResult,
  FraudIndicatorId
} from '../types';

export interface FraudAnalysisService {
  analyze(input: FraudAnalysisInput): FraudAnalysisResult;
}

interface IndicatorRule {
  id: FraudIndicatorId;
  pattern: RegExp;
}

const INDICATOR_RULES: IndicatorRule[] = [
  {
    id: 'urgentPayment',
    pattern:
      /转账|汇款|立即付款|马上付款|急需.{0,8}(钱|转)|send money|wire money|transfer.{0,12}(money|funds)|pay immediately|urgent(?:ly)?.{0,16}(pay|transfer)/i
  },
  {
    id: 'verificationCode',
    pattern:
      /验证码|短信码|支付密码|银行密码|verification code|one[- ]time (?:code|password)|\botp\b|bank password/i
  },
  {
    id: 'threatPressure',
    pattern:
      /逮捕|拘捕|账户.{0,6}冻结|最后通知|立即处理|否则|arrest|account.{0,12}(closed|frozen)|final warning|act now|immediately|or else/i
  },
  {
    id: 'guaranteedReturn',
    pattern:
      /稳赚|保证收益|保本高收益|零风险|翻倍|guaranteed returns?|risk[- ]free|zero risk|double your money/i
  },
  {
    id: 'suspiciousLink',
    pattern: /https?:\/\/|www\.|点击.{0,4}链接|点此|click (?:this )?link|tap (?:this )?link/i
  },
  {
    id: 'secrecy',
    pattern: /不要告诉|别告诉|保密|keep (?:this )?secret|do not tell|don't tell/i
  },
  {
    id: 'miracleHealth',
    pattern:
      /包治|根治|神药|治愈所有|百病|miracle cure|cures? every|cures? all|guaranteed cure|permanently cures?/i
  },
  {
    id: 'impersonation',
    pattern:
      /公安|检察院|法院|银行安全|银行客服|我是你.{0,3}(儿子|女儿|孙子|孙女)|police|government (?:agent|office)|bank (?:security|support)|this is your (?:son|daughter|grandson|granddaughter)/i
  }
];

const ORDINARY_APPOINTMENT =
  /预约(?:提醒|已经确认|成功)|门诊预约|appointment reminder|appointment.{0,24}confirmed/i;

const SENSITIVE_PATTERNS = [
  /\b\d{6}\b/g,
  /\b(?:\d[ -]?){13,19}\b/g,
  /\b1[3-9]\d{9}\b/g,
  /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi,
  /\b(?:\+?\d[\d ()-]{7,}\d)\b/g
];

/** Detect likely private data without returning or logging the matched value. */
export function containsSensitiveInformation(text: string): boolean {
  return SENSITIVE_PATTERNS.some((pattern) => {
    pattern.lastIndex = 0;
    return pattern.test(text);
  });
}

/** Hide likely private values before the local rule engine reads the text. */
export function redactSensitiveInformation(text: string): string {
  return SENSITIVE_PATTERNS.reduce((safe, pattern) => {
    pattern.lastIndex = 0;
    return safe.replace(pattern, ' ');
  }, text);
}

function recommendedActions(indicators: FraudIndicatorId[]): FraudActionId[] {
  const actions: FraudActionId[] = ['pauseReply', 'verifyOfficially', 'askTrustedPerson'];
  if (
    indicators.some((id) =>
      ['urgentPayment', 'guaranteedReturn', 'impersonation', 'secrecy'].includes(id)
    )
  ) {
    actions.splice(1, 0, 'doNotTransfer');
  }
  if (indicators.includes('verificationCode')) {
    actions.splice(1, 0, 'protectCredentials');
  }
  return actions;
}

export const localFraudAnalysisService: FraudAnalysisService = {
  analyze(input: FraudAnalysisInput): FraudAnalysisResult {
    const rawText = input.text.trim();
    const sensitiveDetected = containsSensitiveInformation(rawText);
    const safeText = redactSensitiveInformation(rawText);
    const indicators = INDICATOR_RULES.filter((rule) => rule.pattern.test(safeText)).map(
      (rule) => rule.id
    );
    const imageOnly = rawText.length === 0 && input.hasScreenshot;

    let risk: FraudAnalysisResult['risk'] = 'notSure';
    if (indicators.length > 0) {
      risk = 'suspicious';
    } else if (rawText.length > 0 && ORDINARY_APPOINTMENT.test(safeText)) {
      risk = 'likelySafe';
    }

    return {
      risk,
      indicators,
      actions: recommendedActions(indicators),
      sensitiveDetected,
      imageOnly
    };
  }
};
