/**
 * Persistent bottom navigation.
 *
 * Two targets only - Home and Display settings - and they are visible on every
 * screen except the welcome screen, so returning home is never hidden behind a
 * gesture. Tapping the page you are already on does nothing.
 *
 * The two labels follow the chosen language, so the component redraws itself
 * when the language changes without the page having to do anything.
 */
import { getStrings } from '../../utils/i18n';
import { bindLocale, unbindLocale } from '../../utils/locale-binding';
import { openHome, openSettings } from '../../utils/navigation';

type BottomNavLabels = ReturnType<typeof getStrings>['components']['bottomNav'];

Component({
  properties: {
    /** 'home', 'settings' or 'none' - which item is the current page. */
    active: { type: String, value: 'none' }
  },

  data: {
    copy: getStrings().components.bottomNav as BottomNavLabels
  },

  lifetimes: {
    attached(): void {
      bindLocale(this, () => this.setData({ copy: getStrings().components.bottomNav }));
    },
    detached(): void {
      unbindLocale(this);
    }
  },

  methods: {
    onHomeTap(): void {
      if (this.data.active === 'home') {
        return;
      }
      openHome();
    },

    onSettingsTap(): void {
      if (this.data.active === 'settings') {
        return;
      }
      openSettings();
    }
  }
});
