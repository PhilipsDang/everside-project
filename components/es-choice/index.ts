/**
 * Choice group, used for settings with a small number of options.
 *
 * Every option is a big target, the selected one is filled in as well as marked,
 * and the group is announced as a radio group.
 *
 * Usage:
 * `<es-choice label="文字大小" :options="options" :value="textScale" bind:change="onTextScale" />`
 */
import { ChoiceOption } from '../../types';

type ChoiceEvent = WechatMiniprogram.BaseEvent<WechatMiniprogram.IAnyObject, { value: string }>;

Component({
  properties: {
    /** Name of the setting, for example 文字大小. */
    label: { type: String, value: '' },
    /** One short sentence explaining the setting. */
    hint: { type: String, value: '' },
    /** Value of the option that is selected right now. */
    value: { type: String, value: '' },
    /** Options to choose from. */
    options: {
      type: Array,
      value: [] as ChoiceOption[]
    }
  },

  methods: {
    onSelect(event: ChoiceEvent): void {
      const next = event.currentTarget.dataset.value;
      if (!next || next === this.data.value) {
        return;
      }
      this.triggerEvent('change', { value: next });
    }
  }
});
