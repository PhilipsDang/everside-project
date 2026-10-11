/**
 * Information card.
 *
 * A calm, bordered surface for a group of related words. Content goes in the
 * default slot.
 *
 * Usage:
 * `<es-card title="这个功能会做什么" tone="note"> ... </es-card>`
 */
Component({
  properties: {
    /** Card heading. Leave empty for a card without a heading. */
    title: { type: String, value: '' },
    /** Small line under the heading. */
    subtitle: { type: String, value: '' },
    /** 'default' = white card, 'note' = soft green card for friendly notes. */
    tone: { type: String, value: 'default' }
  }
});
