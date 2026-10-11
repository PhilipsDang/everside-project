/** Message and screenshot input for the Cycle 2 local fraud-check demonstration. */
import { buildFraudExamples } from '../../../data/fraud-examples';
import {
  containsSensitiveInformation,
  localFraudAnalysisService
} from '../../../services/fraud-analysis';
import { FraudExample, FraudExampleId } from '../../../types';
import { accessibilityRootClass } from '../../../utils/accessibility-store';
import { clearFraudResult, setFraudResult } from '../../../utils/fraud-session';
import { getStrings } from '../../../utils/i18n';
import { bindLocale, unbindLocale } from '../../../utils/locale-binding';
import { applyPageTitle } from '../../../utils/page-title';
import { ROUTES } from '../../../utils/routes';

type InputEvent = WechatMiniprogram.CustomEvent<{ value: string }>;
type ExampleEvent = WechatMiniprogram.BaseEvent<
  WechatMiniprogram.IAnyObject,
  { id: FraudExampleId }
>;

Page({
  data: {
    a11yClass: '',
    copy: getStrings().fraudCheck,
    examples: [] as FraudExample[],
    messageText: '',
    screenshotPath: '',
    canAnalyze: false,
    validationVisible: false,
    sensitiveDialogVisible: false
  },

  onLoad(): void {
    clearFraudResult();
    bindLocale(this, () => this.syncFromStore());
  },

  onUnload(): void {
    unbindLocale(this);
    this.setData({ messageText: '', screenshotPath: '' });
  },

  onShow(): void {
    this.syncFromStore();
  },

  onReady(): void {
    applyPageTitle(this.data.copy.input.title);
  },

  syncFromStore(): void {
    const copy = getStrings().fraudCheck;
    this.setData({
      copy,
      examples: buildFraudExamples(),
      a11yClass: accessibilityRootClass()
    });
    applyPageTitle(copy.input.title);
  },

  updateReadyState(messageText: string, screenshotPath: string): void {
    this.setData({
      canAnalyze: messageText.trim().length > 0 || screenshotPath.length > 0,
      validationVisible: false
    });
  },

  onMessageInput(event: InputEvent): void {
    const messageText = event.detail.value;
    this.setData({ messageText });
    this.updateReadyState(messageText, this.data.screenshotPath);
  },

  onExampleTap(event: ExampleEvent): void {
    const example = this.data.examples.find((item) => item.id === event.currentTarget.dataset.id);
    if (!example) {
      return;
    }
    this.setData({ messageText: example.message });
    this.updateReadyState(example.message, this.data.screenshotPath);
  },

  onChooseScreenshot(): void {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (response) => {
        const screenshotPath = response.tempFiles[0]?.tempFilePath ?? '';
        if (!screenshotPath) {
          return;
        }
        this.setData({ screenshotPath });
        this.updateReadyState(this.data.messageText, screenshotPath);
      },
      fail: (error) => {
        if (error.errMsg.includes('cancel')) {
          return;
        }
        wx.showToast({ title: this.data.copy.input.imageError, icon: 'none', duration: 2500 });
      }
    });
  },

  onPreviewScreenshot(): void {
    if (!this.data.screenshotPath) {
      return;
    }
    wx.previewImage({ current: this.data.screenshotPath, urls: [this.data.screenshotPath] });
  },

  onRemoveScreenshot(): void {
    this.setData({ screenshotPath: '' });
    this.updateReadyState(this.data.messageText, '');
  },

  onClear(): void {
    this.setData({ messageText: '', screenshotPath: '', validationVisible: false });
    this.updateReadyState('', '');
  },

  onAnalyze(): void {
    if (!this.data.canAnalyze) {
      this.setData({ validationVisible: true });
      return;
    }
    if (containsSensitiveInformation(this.data.messageText)) {
      this.setData({ sensitiveDialogVisible: true });
      return;
    }
    this.runAnalysis();
  },

  onSensitiveCancel(): void {
    this.setData({ sensitiveDialogVisible: false });
  },

  onSensitiveConfirm(): void {
    this.setData({ sensitiveDialogVisible: false });
    this.runAnalysis();
  },

  runAnalysis(): void {
    const result = localFraudAnalysisService.analyze({
      text: this.data.messageText,
      hasScreenshot: this.data.screenshotPath.length > 0
    });
    setFraudResult(result);
    wx.navigateTo({
      url: ROUTES.checkResult,
      success: () => {
        this.setData({ messageText: '', screenshotPath: '', canAnalyze: false });
      },
      fail: () => {
        clearFraudResult();
        wx.showToast({ title: this.data.copy.input.openError, icon: 'none', duration: 2500 });
      }
    });
  }
});
