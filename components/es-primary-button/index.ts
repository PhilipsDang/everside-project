/**
 * Large primary button.
 *
 * One primary action per screen, a touch area far bigger than the text, and a
 * clearly visible pressed and disabled state. Uses a native `<button>` so that
 * assistive technology announces it as a button.
 *
 * Usage: `<es-primary-button text="开始使用" bind:submit="onStart" />`
 */
Component({
  properties: {
    /** Chinese label shown inside the button. */
    text: { type: String, value: '' },
    /** Longer wording for screen readers, when the label alone is too short. */
    ariaLabel: { type: String, value: '' },
    /** Disabled buttons cannot be tapped and say so. */
    disabled: { type: Boolean, value: false },
    /** true = fill the row, false = shrink to the content. */
    block: { type: Boolean, value: true }
  },

  methods: {
    onTap() {
      if (this.data.disabled) {
        return;
      }
      this.triggerEvent('submit', { text: this.data.text });
    }
  }
});
