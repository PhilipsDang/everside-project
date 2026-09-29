/**
 * Large on/off switch, used for settings that are simply on or off.
 *
 * The whole row is the touch target, and the state is written in words next to
 * the switch, so the meaning never depends on colour alone.
 *
 * Usage: `<es-switch label="减少动画" :checked="reduceMotion" bind:change="onToggle" />`
 */
import { getStrings } from '../../utils/i18n';
import { bindLocale, unbindLocale } from '../../utils/locale-binding';

type SwitchLabels = ReturnType<typeof getStrings>['components']['switch'];

Component({
  properties: {
    /** Name of the setting, for example 减少动画. */
    label: { type: String, value: '' },
    /** One short sentence explaining the setting. */
    description: { type: String, value: '' },
    /** true = on, false = off. */
    checked: { type: Boolean, value: false }
  },

  data: {
    labels: getStrings().components.switch as SwitchLabels
  },

  lifetimes: {
    attached(): void {
      bindLocale(this, () => this.setData({ labels: getStrings().components.switch }));
    },
    detached(): void {
      unbindLocale(this);
    }
  },

  methods: {
    onToggle(): void {
      this.triggerEvent('change', { checked: !this.data.checked });
    }
  }
});
