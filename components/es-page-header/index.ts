/**
 * Page header.
 *
 * A large, readable title with an optional subtitle. The system navigation bar
 * keeps the familiar back arrow; this component carries the wording, so the
 * title is always big enough to read comfortably.
 */
Component({
  properties: {
    /** Main title of the screen. */
    title: { type: String, value: '' },
    /** One short sentence that says what the screen is for. */
    subtitle: { type: String, value: '' },
    /** Optional small line, for example a reminder. */
    note: { type: String, value: '' }
  }
});
