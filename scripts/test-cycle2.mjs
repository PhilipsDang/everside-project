#!/usr/bin/env node
/** Headless page-flow checks for the Cycle 2 WeChat screens. */
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { spawnSync } from 'node:child_process';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUTPUT = mkdtempSync(join(tmpdir(), 'everside-cycle2-'));
const require = createRequire(import.meta.url);

const compile = spawnSync(
  join(ROOT, 'node_modules', '.bin', 'tsc'),
  ['--outDir', OUTPUT, '--noEmit', 'false'],
  { cwd: ROOT, encoding: 'utf8' }
);
if (compile.status !== 0) {
  process.stderr.write(compile.stdout);
  process.stderr.write(compile.stderr);
  process.exit(compile.status ?? 1);
}

let pageDefinition;
let navigatedTo = '';
let previewed = '';
const storageWrites = [];

globalThis.Page = (definition) => {
  pageDefinition = definition;
};
globalThis.getCurrentPages = () => [{ route: 'pages/feature/check-suspicious-message/index' }];
globalThis.wx = {
  chooseMedia(options) {
    options.success({ tempFiles: [{ tempFilePath: 'wxfile://temporary-screenshot.png' }] });
  },
  previewImage(options) {
    previewed = options.current;
  },
  navigateTo(options) {
    navigatedTo = options.url;
    options.success?.({ errMsg: 'navigateTo:ok' });
  },
  navigateBack() {},
  redirectTo() {},
  reLaunch() {},
  showToast() {},
  setNavigationBarTitle() {},
  setNavigationBarColor() {},
  getStorageSync() {
    return undefined;
  },
  setStorageSync(key, value) {
    storageWrites.push({ key, value });
  }
};

function makePage(definition) {
  const page = {
    data: structuredClone(definition.data),
    setData(patch, callback) {
      Object.assign(this.data, patch);
      callback?.();
    }
  };
  for (const [key, value] of Object.entries(definition)) {
    if (typeof value === 'function') {
      page[key] = value;
    }
  }
  return page;
}

let assertions = 0;
try {
  require(join(OUTPUT, 'pages/feature/check-suspicious-message/index.js'));
  const inputPage = makePage(pageDefinition);
  inputPage.onLoad();
  inputPage.onShow();

  assert.equal(inputPage.data.examples.length, 5);
  assert.equal(inputPage.data.copy.input.title, '检查可疑信息');
  assertions += 2;

  inputPage.onAnalyze();
  assert.equal(inputPage.data.validationVisible, true);
  assert.equal(navigatedTo, '');
  assertions += 2;

  inputPage.onChooseScreenshot();
  assert.equal(inputPage.data.screenshotPath, 'wxfile://temporary-screenshot.png');
  inputPage.onPreviewScreenshot();
  assert.equal(previewed, 'wxfile://temporary-screenshot.png');
  inputPage.onRemoveScreenshot();
  assert.equal(inputPage.data.screenshotPath, '');
  assertions += 3;

  inputPage.onExampleTap({ currentTarget: { dataset: { id: 'bank' } } });
  assert.ok(inputPage.data.messageText.includes('银行'));
  assert.equal(inputPage.data.canAnalyze, true);
  assertions += 2;

  const i18n = require(join(OUTPUT, 'utils/i18n.js'));
  i18n.setLanguage('en-US');
  assert.equal(inputPage.data.copy.input.title, 'Check a message');
  assert.equal(inputPage.data.examples[0].label, 'Fake bank warning');
  assertions += 2;

  const sensitiveMessage = 'My verification code is 123456.';
  inputPage.onMessageInput({ detail: { value: sensitiveMessage } });
  inputPage.onAnalyze();
  assert.equal(inputPage.data.sensitiveDialogVisible, true);
  assert.equal(navigatedTo, '');
  inputPage.onSensitiveConfirm();
  assert.equal(navigatedTo, '/pages/feature/check-result/index');
  assert.equal(inputPage.data.messageText, '');
  assertions += 4;

  require(join(OUTPUT, 'pages/feature/check-result/index.js'));
  const resultPage = makePage(pageDefinition);
  resultPage.onLoad();
  resultPage.onShow();
  assert.equal(resultPage.data.hasResult, true);
  assert.equal(resultPage.data.riskLabel, 'Suspicious');
  assert.equal(resultPage.data.sensitiveDetected, true);
  assert.ok(resultPage.data.warningSigns.length > 0);
  assertions += 4;

  i18n.setLanguage('zh-CN');
  assert.equal(resultPage.data.copy.result.title, '检查结果');
  assert.equal(resultPage.data.riskLabel, '可疑');
  assertions += 2;

  const stored = JSON.stringify(storageWrites);
  assert.ok(!stored.includes(sensitiveMessage));
  assert.ok(!stored.includes('temporary-screenshot.png'));
  assertions += 2;

  for (const file of [
    'services/fraud-analysis.ts',
    'utils/fraud-session.ts',
    'pages/feature/check-suspicious-message/index.ts'
  ]) {
    assert.ok(!readFileSync(join(ROOT, file), 'utf8').includes('console.'));
    assertions += 1;
  }

  resultPage.onUnload();
  inputPage.onUnload();
  console.log(`Cycle 2 page-flow checks passed (${assertions} assertions).`);
} finally {
  rmSync(OUTPUT, { recursive: true, force: true });
}
