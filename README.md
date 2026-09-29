# EverSide

**Independence, with support by your side.** 独立生活，守护在旁。

EverSide is a voice-first assistant and fraud-protection service for older adults
in China. This repository holds **Cycle 1: the WeChat Mini Program foundation** —
navigation, the visual system, the core screens, the reusable components, the
accessibility settings and **both languages**. It runs entirely on local mock
data: no backend, no AI provider, no API keys, no network calls.

The Mini Program speaks **Simplified Chinese and English**. Chinese is the
default; the user can switch language from the welcome screen or from the
settings, and the choice is remembered. Code, comments and this document are in
English.

---

## 1. What is in this cycle

| Screen               | Route                       | What it does                                                                                               |
| -------------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Welcome              | `pages/welcome/index`       | Brand, short introduction, large 开始使用 button, accessibility notice, link to 家人协助设置               |
| Home                 | `pages/home/index`          | The four large actions: 检查可疑信息, 日常事务帮助, 通话帮助, 亲友守护                                     |
| Feature placeholders | `pages/feature/*`           | One screen per home action: what the feature will do, a clear "not ready yet" message, a large Back button |
| Display settings     | `pages/settings/index`      | Text size, colour contrast, spoken guidance, reduced motion, all saved on the device                       |
| Family helper        | `pages/family-assist/index` | Placeholder for the flow where a relative helps with the setup                                             |

Reusable components live in `components/` (nine of them, listed in section 4).

Not in this cycle, on purpose: fraud analysis, voice processing, trusted
contacts, outgoing calls, and any real AI connection.

## 2. Requirements

- **WeChat Developer Tools** (微信开发者工具), stable version — this is the only
  thing needed to open and run the Mini Program.
- **Node.js 18+** — only for the optional quality checks (type check, format
  check, project checks). The Mini Program itself does not need a build step.

## 3. Opening the project

1. Install WeChat Developer Tools and sign in with a WeChat account.
2. In the tool: **导入项目 / Import project**.
3. Choose **this folder** (the folder that contains `app.json`), not the parent.
4. AppID: choose **测试号 / Test account** (`"touristappid"` is already set in
   `project.config.json`). Any AppID of your own works as well.
5. Click **导入**. The welcome screen opens straight away.

TypeScript needs no extra step: `project.config.json` already sets
`"useCompilerPlugins": ["typescript"]`, so the tool compiles the `.ts` files
itself. Do not generate `.js` files by hand — if both exist, the tool prefers
the `.ts` file.

The project has custom compile modes **Home** and **Settings**
(see 编译模式 in the tool bar) to jump straight to a screen while testing.

## 4. Project structure

```
app.ts / app.json / app.wxss        application entry, routes, global styles
project.config.json                 Developer Tools settings (TypeScript on)
sitemap.json                        search rules

locales/zh-CN.ts                    Simplified Chinese, the reference locale
locales/en-US.ts                    English, typed against the Chinese one
styles/theme.wxss                   the whole visual system (see section 6)
templates/feature-placeholder.wxml  shared WXML for the four feature screens

components/                         reusable components
  es-primary-button                 large primary button  (native <button>)
  es-secondary-button               outlined secondary button
  es-page-header                    big screen title and subtitle
  es-card                           information card
  es-dialog                         confirmation dialog (取消 / 确定)
  es-bottom-nav                     persistent 首页 / 显示设置 bar
  es-status                         loading, error and empty states
  es-choice                         big radio group, used by the settings
  es-switch                         big on/off row, used by the settings

pages/                              screens, one folder per page
  welcome/  home/  settings/  family-assist/
  feature/check-suspicious-message/
  feature/daily-tasks/
  feature/call-help/
  feature/family-guard/

data/                               all Chinese wording, local mock content
types/index.ts                      shared TypeScript types
utils/                              routes, navigation, accessibility store
scripts/validate-project.mjs        project checks (see section 7)
```

## 5. Accessibility settings

Four preferences, stored with `wx.setStorageSync` under the key
`everside.accessibility.v1`, so they survive closing the Mini Program:

| Preference               | Values        | Effect today                                                            |
| ------------------------ | ------------- | ----------------------------------------------------------------------- |
| Text size 文字大小       | 标准 / 超大   | Every text class grows on every screen                                  |
| Contrast 颜色对比        | 普通 / 高对比 | Black on white, stronger borders, stronger focus                        |
| Spoken guidance 语音提示 | on / off      | Saved only; the spoken output comes in a later cycle                    |
| Reduced motion 减少动画  | on / off      | Removes transitions, the spinner animation and the pressed-scale effect |

How it reaches the screen: `utils/accessibility-store.ts` turns the preferences
into four classes — `es-root`, `es-scale-large`, `es-contrast-high`,
`es-reduce-motion` — and every page puts them on its root element in `onShow`.
`styles/theme.wxss` reacts to those classes, and every page and component
imports that one file. That is why a change is visible everywhere at once, and
why a new screen cannot accidentally miss it.

## 6. Languages

|            |                                                                    |
| ---------- | ------------------------------------------------------------------ |
| Languages  | Simplified Chinese (`zh-CN`) and English (`en-US`)                 |
| Default    | Simplified Chinese, on the very first launch                       |
| Switch     | the 语言 / Language card on the welcome screen and in the settings |
| Remembered | yes, saved on the device under `everside.locale.v1`                |
| Applied    | immediately, with no restart and no reload                         |
| Fallback   | a key a language is missing is shown in Simplified Chinese         |

How it is put together:

- **All wording lives in `locales/`.** Nothing in `pages/` or `components/`
  contains text of its own, in any language. `npm run check:i18n` fails if it does.
- **The keys are shared and checked twice.** `locales/zh-CN.ts` is the reference
  and exports the `Locale` type, so `locales/en-US.ts` cannot compile with a
  missing, renamed or extra key. `npm run check:i18n` reports the same gaps for
  humans, and also catches empty values and options written in a different order
  (which would make the buttons jump around when the language changes).
- **Screens take their wording from the store.** A page calls
  `syncFromStore()` when it opens, and `utils/locale-binding.ts` calls it again
  the moment the language changes, so a switch is seen everywhere at once.
- **Components follow on their own.** `es-bottom-nav`, `es-switch`, `es-status`
  and `es-dialog` listen for the change themselves; every other component takes
  its text as properties, so it follows its page.
- **Navigation bar titles are set in code**, from the same store, so they change
  with the language too.
- The language switch shows each language **in its own name** (中文 / English),
  so it can be found even if the current language cannot be read.

Longer English text is expected: buttons and the bottom bar wrap and grow
instead of squeezing, and nothing has a fixed height.

## 7. The visual system

`styles/theme.wxss` is the only file with colours, text sizes and interaction
states. Page and component WXSS files contain layout only. The rule keeps high
contrast from being half applied, and `npm run validate` enforces it.

Tone: calm, warm and grown-up — a warm paper background, deep teal for actions,
generous spacing, and wording that never blames the user. Nothing childish,
nothing that looks like a medical device.

## 8. Checks

```bash
npm install        # once
npm run check      # format check + type check + translation check + project checks
```

or one by one:

```bash
npm run format:check    # prettier
npm run typecheck       # tsc --noEmit
npm run check:i18n      # translation keys, and no text in WXML or in screens
npm run validate        # project structure and navigation integrity
```

`npm run validate` fails when a page is missing a file or is not registered, a
screen links to a route that does not exist, a WXML file uses a component it
did not declare, or a WXSS file forgets to import the design system.

## 9. Manual test list

1. Open the Mini Program. The welcome screen appears **in Simplified Chinese**,
   with the brand, the accessibility notice and a large 开始使用 button.
2. Tap **语言 / Language** and choose **English** — the whole screen changes at
   once, with no restart. Choose 中文 again and it changes back.
3. Tap **开始使用 / Get started** — the home screen opens with the four large
   actions, in the language you chose.
4. Tap each action in turn — every one opens its own placeholder screen with a
   title, an explanation, a "still being prepared" message, a large
   **返回上一页 / Go back** button and a bottom bar with **首页 / Home**.
5. Tap **Go back** — you go back. Tap **Home** — you always land on home, even
   if the screen was opened directly.
6. Open **显示设置 / Display settings** from the bottom bar, switch the language
   there too, choose **超大字体 / Extra large** and **高对比 / High contrast** —
   the whole app changes immediately, and every screen keeps the change.
7. Close and reopen the Mini Program — the language and the display settings are
   both still there.
8. Turn 减少动画 / Reduce movement on — the spinner stops turning and the buttons
   no longer shrink when pressed.
9. Tap **恢复默认设置 / Go back to the defaults** — a confirmation dialog appears
   in the current language, and nothing changes unless you confirm.
