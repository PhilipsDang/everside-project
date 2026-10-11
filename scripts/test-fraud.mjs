#!/usr/bin/env node
/** Focused tests for the deterministic Cycle 2 fraud-analysis service. */
import assert from 'node:assert/strict';
import {
  containsSensitiveInformation,
  localFraudAnalysisService,
  redactSensitiveInformation
} from '../services/fraud-analysis.ts';

const analyze = (text, hasScreenshot = false) =>
  localFraudAnalysisService.analyze({ text, hasScreenshot });

const cases = [
  {
    name: 'Chinese fake bank warning',
    text: '【银行安全中心】您的账户即将冻结，请立即点击链接并输入验证码完成认证。',
    risk: 'suspicious',
    indicator: 'verificationCode'
  },
  {
    name: 'English fake family emergency',
    text: 'This is your grandson. Urgently transfer money and do not tell anyone else.',
    risk: 'suspicious',
    indicator: 'secrecy'
  },
  {
    name: 'Chinese guaranteed investment',
    text: '内部养老投资机会，零风险保证收益，今天转账就能参加。',
    risk: 'suspicious',
    indicator: 'guaranteedReturn'
  },
  {
    name: 'English miracle health product',
    text: 'This miracle cure treats every illness and permanently cures high blood pressure.',
    risk: 'suspicious',
    indicator: 'miracleHealth'
  },
  {
    name: 'Chinese ordinary appointment reminder',
    text: '预约提醒：您明天上午十点的社区门诊预约已经确认。',
    risk: 'likelySafe',
    indicator: null
  },
  {
    name: 'English ordinary appointment reminder',
    text: 'Appointment reminder: Your clinic appointment is confirmed for tomorrow.',
    risk: 'likelySafe',
    indicator: null
  },
  {
    name: 'Unknown neutral message',
    text: 'It was nice speaking with you today.',
    risk: 'notSure',
    indicator: null
  }
];

let assertions = 0;
for (const testCase of cases) {
  const result = analyze(testCase.text);
  assert.equal(result.risk, testCase.risk, testCase.name);
  assertions += 1;
  if (testCase.indicator) {
    assert.ok(result.indicators.includes(testCase.indicator), testCase.name);
    assertions += 1;
  }
  assert.ok(!JSON.stringify(result).includes(testCase.text), `${testCase.name}: raw text leaked`);
  assertions += 1;
}

const imageOnly = analyze('', true);
assert.equal(imageOnly.risk, 'notSure');
assert.equal(imageOnly.imageOnly, true);
assert.deepEqual(imageOnly.indicators, []);
assertions += 3;

const privateText = 'My code is 123456 and my email is person@example.com.';
assert.equal(containsSensitiveInformation(privateText), true);
const redacted = redactSensitiveInformation(privateText);
assert.ok(!redacted.includes('123456'));
assert.ok(!redacted.includes('person@example.com'));
assert.equal(analyze(privateText).sensitiveDetected, true);
assertions += 4;

const suspicious = analyze('Send money now and give me your verification code.');
assert.ok(suspicious.actions.includes('doNotTransfer'));
assert.ok(suspicious.actions.includes('protectCredentials'));
assert.ok(suspicious.actions.includes('verifyOfficially'));
assertions += 3;

console.log(`Fraud-analysis checks passed (${assertions} assertions).`);
