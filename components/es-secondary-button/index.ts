/**
 * Secondary button.
 *
 * Used for the second choice on a screen. Same generous touch area and clear
 * pressed and disabled states as the primary button, with an outline instead
 * of a filled background so the two are never confused.
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
