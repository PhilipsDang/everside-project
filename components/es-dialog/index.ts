/**
 * Confirmation dialog.
 *
 * Only for decisions the user has to make. The dialog never closes by tapping
 * the dimmed background, so nothing disappears by accident: there are always
 * two clearly labelled buttons.
 *
 * A page may pass its own wording for the two buttons. When it does not, the
 * labels come from the current language, so 取消 / Cancel and 确定 / OK are
 * always written in the language actually on screen.
 */
import { getStrings } from '../../utils/i18n';
import { bindLocale, unbindLocale } from '../../utils/locale-binding';

Component({
  properties: {
    /** Show or hide the dialog. */
    visible: { type: Boolean, value: false },
    /** Question the user is being asked. */
    title: { type: String, value: '' },
    /** What will happen if the user agrees. */
    message: { type: String, value: '' },
    /** Label of the agreeing button. Empty means the current language's word. */
    confirmText: { type: String, value: '' },
    /** Label of the cancelling button. Empty means the current language's word. */
    cancelText: { type: String, value: '' }
  },

  data: {
    /** The button labels actually shown, after the fallback is applied. */
    labels: { confirm: '', cancel: '' }
  },

  observers: {
    'confirmText, cancelText': function refreshOnProperty(): void {
      this.refreshLabels();
    }
  },

  lifetimes: {
    attached(): void {
      this.refreshLabels();
      bindLocale(this, () => this.refreshLabels());
    },
    detached(): void {
      unbindLocale(this);
    }
  },

  methods: {
    /** A label given by the page wins; otherwise the current language is used. */
    refreshLabels(): void {
      const defaults = getStrings().components.dialog;
      this.setData({
        labels: {
          confirm: this.data.confirmText || defaults.confirm,
          cancel: this.data.cancelText || defaults.cancel
        }
      });
    },

    onConfirm(): void {
      this.triggerEvent('confirm');
    },

    onCancel(): void {
      this.triggerEvent('cancel');
    },

    /** Swallow taps on the dimmed background so the page behind stays put. */
    noop(): void {
      // intentionally empty
    }
  }
});
