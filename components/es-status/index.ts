/**
 * Accessible loading, error and empty states.
 *
 * Wording comes from utils/status-copy.ts, which reads the active language, and
 * it never suggests the user is to blame. The component redraws itself when the
 * language changes, so the state message is never left in the old language. The
 * spinner stops turning when the user asked for reduced motion.
 *
 * Usage: `<es-status type="error" action-text="..." bind:action="onRetry" />`
 */
import { StatusType } from '../../types';
import { bindLocale, unbindLocale } from '../../utils/locale-binding';
import { StatusCopy, resolveStatusCopy } from '../../utils/status-copy';

Component({
  properties: {
    /** 'loading' = waiting, 'error' = something went wrong, 'empty' = nothing yet. */
    type: { type: String, value: 'empty' },
    /** Overrides the default heading. */
    title: { type: String, value: '' },
    /** Overrides the default explanation. */
    description: { type: String, value: '' },
    /** When set, a big button with this label is shown below the text. */
    actionText: { type: String, value: '' }
  },

  data: {
    copy: {
      title: '',
      description: ''
    } as StatusCopy
  },

  observers: {
    'type, title, description'(type: StatusType, title: string, description: string): void {
      this.refreshCopy(type, title, description);
    }
  },

  lifetimes: {
    /**
     * Resolve once when the component is created, so the wording is never empty
     * even if the page does not pass a title or a description.
     */
    attached(): void {
      this.refreshCopy(this.data.type as StatusType, this.data.title, this.data.description);
      bindLocale(this, () =>
        this.refreshCopy(this.data.type as StatusType, this.data.title, this.data.description)
      );
    },
    detached(): void {
      unbindLocale(this);
    }
  },

  methods: {
    refreshCopy(type: StatusType, title: string, description: string): void {
      this.setData({ copy: resolveStatusCopy(type, title, description) });
    },

    onActionTap(): void {
      this.triggerEvent('action');
    }
  }
});
