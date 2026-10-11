/**
 * English.
 *
 * The `Locale` type comes from the Simplified Chinese file, so TypeScript
 * refuses to compile this file if a key is missing, spelled differently, or
 * left over. Run `npm run check:i18n` to see the same report at a glance.
 *
 * House style: short sentences, everyday words, no jargon, nothing that sounds
 * like a medical device. The reader is someone who wants to get something done
 * today, not someone who wants to be impressed.
 */
import type { Locale } from './zh-CN';

export const enUS: Locale = {
  meta: {
    languageName: 'English',
    languageAriaLabel: 'Current language: English'
  },

  brand: {
    name: 'EverSide',
    tagline: 'Your own life, with help close by.',
    previewNote: 'The message-check demonstration is ready. The other features are on the way.'
  },

  welcome: {
    chineseName: 'A phone helper that stays by your side',
    intro:
      'EverSide is a phone helper that stays with you. It helps you tell a real message ' +
      'from a fake one, helps you with everyday jobs, and helps you reach your family ' +
      'when you need them.',
    noticeTitle: 'Big text, strong colours, one step at a time',
    noticeBody:
      'EverSide uses large text and strong colours from the start. The buttons are big, ' +
      'every step is written out in plain words, and nothing counts down or jumps away ' +
      'on its own. You can change the text size and the colours whenever you like.',
    startLabel: 'Get started',
    startAriaLabel: 'Get started, go to the home screen',
    settingsLabel: 'Change display settings',
    familyAssistLabel: 'Get help from a family member',
    familyAssistHint: 'A family member can sit with you and set it up.',
    languageTitle: 'Language',
    languageHint: 'Choose the language that is easiest for you to read.'
  },

  home: {
    title: 'Home',
    greeting: 'Hello',
    subtitle: 'What would you like to do? Here are the four things you can open. Tap one to go in.',
    note: 'Check a message is ready to try. The other three features are still being built.',
    openLabel: 'Open',
    actions: {
      checkSuspiciousMessage: {
        title: 'Check a message',
        description:
          'Got a text, a message or a call and are not sure it is real? Bring it here first.',
        ariaLabel: 'Check a message, tap to start checking'
      },
      dailyTasks: {
        title: 'Help with everyday jobs',
        description: 'Paying a bill, shopping, booking an appointment: we go through it with you.',
        ariaLabel: 'Help with everyday jobs, tap to read more'
      },
      callHelp: {
        title: 'Help with phone calls',
        description: 'When you need to make a call, we help you get your words ready first.',
        ariaLabel: 'Help with phone calls, tap to read more'
      },
      familyGuard: {
        title: 'Family keeping an eye out',
        description: 'Keep in touch with family you trust, and remind each other when it matters.',
        ariaLabel: 'Family keeping an eye out, tap to read more'
      }
    }
  },

  features: {
    pointsTitle: 'What it will do for you',
    comingSoonTitle: 'This feature is still being built',
    comingSoonBody:
      'This feature will be ready in a later update. You will not have to think about it: we will go through it with you, one step at a time.',
    todayTipTitle: 'What you can do today',
    backLabel: 'Go back',
    backAriaLabel: 'Go back to the screen you came from',
    items: {
      checkSuspiciousMessage: {
        title: 'Check a message',
        subtitle: 'Help you see whether a message is real',
        intro:
          'If you get a text, a message or a phone call and you are not sure whether it is ' +
          'genuine, bring it here first. We will look at it with you, so you do not have to ' +
          'face it on your own.',
        points: [
          {
            title: 'Who it is from',
            detail:
              'It shows the difference between a real family member or bank and someone pretending.'
          },
          {
            title: 'Whether to open that link',
            detail: 'Pause, ask someone, and then decide. There is no rush.'
          },
          {
            title: 'Ask family when you are unsure',
            detail: 'Someone you trust can look at it with you before you decide.'
          }
        ],
        todayTip:
          'If you are not sure, do not open the link or call the number yet. Ask someone you trust to look at it with you.'
      },
      dailyTasks: {
        title: 'Help with everyday jobs',
        subtitle: 'Paying, shopping, booking: one step at a time',
        intro:
          'Paying a bill, shopping, booking an appointment, checking a delivery: we go ' +
          'through these with you one step at a time. We always say what the next step is, ' +
          'and you can stop whenever you like.',
        points: [
          {
            title: 'Step by step',
            detail: 'Every step is written in plain words, so you can pause whenever you need to.'
          },
          {
            title: 'Take your time',
            detail: 'We remember how far you got, so you never have to start again.'
          },
          {
            title: 'A word before anything important',
            detail:
              'We will warn you first if a step means paying money or giving personal details.'
          }
        ],
        todayTip:
          'Write down what you need to do today, and cross each thing off as you finish it. It feels much easier that way.'
      },
      callHelp: {
        title: 'Help with phone calls',
        subtitle: 'Help you say what you mean on the phone',
        intro:
          'Asking at the hospital, calling a helpline, or ringing your family: we can help ' +
          'you get your words ready and tell you which button to press, so you do not freeze up.',
        points: [
          {
            title: 'Get your words ready',
            detail: 'We turn what you want to say into a few simple sentences you can read out.'
          },
          {
            title: 'Which button to press',
            detail:
              'The screen will tell you step by step, so you do not have to remember a number.'
          },
          {
            title: 'Write it down afterwards',
            detail: 'We help you note down the important things so you do not forget.'
          }
        ],
        todayTip:
          'If you need to call right now, write what you want to say on a piece of paper and keep it with you.'
      },
      familyGuard: {
        title: 'Family keeping an eye out',
        subtitle: 'Stay in touch with the family you trust',
        intro:
          'Stay in touch with your children, your grandchildren, or anyone else you trust. ' +
          'You can remind each other when something needs a second look, and it makes you ' +
          'both feel more settled.',
        points: [
          {
            title: 'Only people you trust',
            detail: 'You choose who to add. They only see what you agree to share.'
          },
          {
            title: 'Reminders when it matters',
            detail: 'When something needs a second look, the people you trust are there with you.'
          },
          {
            title: 'Turn it off any time',
            detail: 'If you would rather not be contacted, that is your decision.'
          }
        ],
        todayTip:
          'You could agree a regular time to call someone, such as once a week. It is easier to remember, and it feels more settled.'
      }
    }
  },

  familyAssist: {
    title: 'Get help from a family member',
    subtitle: 'Set it up together with someone you trust',
    intro:
      'This page is for when a family member helps. They can sit with you and set the text ' +
      'size, the colours and the sound one step at a time. Once it is set, you will not need ' +
      'their help again.',
    comingSoonBody:
      'It is not ready to use yet. When it is ready, we will explain here how to use it.',
    todayTip:
      'If you want bigger text right now, you can change it yourself with the button below.',
    settingsLabel: 'Open display settings',
    backLabel: 'Go back'
  },

  fraudCheck: {
    input: {
      title: 'Check a message',
      subtitle: 'Put the message that worries you here, and we will look at it together.',
      demoTitle: 'This is a demonstration',
      demoBody:
        'This version uses local demonstration rules and sends nothing over the network. The result is a second pair of eyes, not a guarantee that a message is safe.',
      messageTitle: 'Message',
      messageHint:
        'Paste a text, chat message or words from a call. Never enter a bank password or verification code.',
      messagePlaceholder: 'Type or paste the message here',
      messageAriaLabel: 'Type or paste the message you want to check',
      examplesTitle: 'Try an example',
      examplesHint: 'Tap an example to put it in the message box above.',
      screenshotTitle: 'Message screenshot',
      screenshotHint:
        'You can choose and preview one screenshot. This version cannot read the words in an image yet.',
      chooseScreenshot: 'Choose a screenshot',
      removeScreenshot: 'Remove screenshot',
      screenshotAriaLabel: 'Preview the selected message screenshot',
      clearLabel: 'Clear everything',
      analyzeLabel: 'Check this message',
      emptyTitle: 'There is nothing to check yet',
      emptyBody: 'Enter a message or choose a screenshot first.',
      sensitiveDialogTitle: 'This may contain private information',
      sensitiveDialogBody:
        'We found something that may be a verification code, card number, phone number or email address. The demonstration will hide it before checking locally.',
      sensitiveDialogConfirm: 'Hide it and continue',
      sensitiveDialogCancel: 'Go back and edit',
      imageError: 'The image could not be opened. Please try again.',
      openError: 'The result screen could not be opened. Please try again.'
    },
    examples: {
      bank: {
        label: 'Fake bank warning',
        message:
          'Bank Security Centre: Your account will be frozen. Click this link now and enter your verification code.',
        ariaLabel: 'Load the fake bank warning example'
      },
      family: {
        label: 'Fake family emergency',
        message:
          'This is your grandson. My phone broke and I urgently need you to transfer $2,000. Do not tell anyone else in the family.',
        ariaLabel: 'Load the fake family emergency example'
      },
      investment: {
        label: 'Guaranteed investment',
        message:
          'Private retirement investment opportunity with zero risk and guaranteed returns. Transfer money today to join.',
        ariaLabel: 'Load the guaranteed investment example'
      },
      health: {
        label: 'Miracle health product',
        message:
          'This miracle cure treats every illness and permanently cures high blood pressure in three days. Buy now for a senior discount.',
        ariaLabel: 'Load the miracle health product example'
      },
      appointment: {
        label: 'Ordinary appointment reminder',
        message:
          'Appointment reminder: Your community clinic appointment is confirmed for 10 a.m. tomorrow. Please arrive ten minutes early.',
        ariaLabel: 'Load the ordinary appointment reminder example'
      }
    },
    result: {
      title: 'Check result',
      subtitle: 'Take your time, then decide what to do next.',
      demoBadge: 'Local demonstration result',
      riskTitle: 'Risk assessment',
      summaryTitle: 'Why it received this result',
      warningSignsTitle: 'Warning signs found',
      noWarningSigns:
        'No common scam signs were found, but that does not guarantee the message is safe.',
      actionsTitle: 'What to do now',
      disclaimerTitle: 'Please remember',
      disclaimerBody:
        'An automatic check can be wrong and may miss new scams. For anything involving money, accounts or personal information, verify it again through an official channel.',
      sensitiveTitle: 'Private information protected',
      sensitiveBody:
        'Possible verification codes, card numbers, phone numbers or email addresses were hidden before the check.',
      imageOnlyTitle: 'The screenshot cannot be read yet',
      imageOnlyBody:
        'This version can preview a screenshot but cannot read its words, so the result is “Not Sure.”',
      checkAnother: 'Check another message',
      returnHome: 'Return Home',
      missingTitle: 'The result has been cleared',
      missingBody:
        'To protect your privacy, results are not kept for long. Return and check the message again.',
      backToCheck: 'Return to message check',
      levels: {
        likelySafe: 'Likely Safe',
        suspicious: 'Suspicious',
        notSure: 'Not Sure'
      },
      summaries: {
        likelySafe:
          'The demonstration rules found no obvious danger signs. You should still check who sent it and where it came from.',
        suspicious:
          'This message uses one or more patterns commonly seen in scams. Do not follow the sender’s instructions yet.',
        notSure:
          'There is not enough information to decide. Pause and verify it in another reliable way.'
      }
    },
    indicators: {
      urgentPayment: 'It pressures you to transfer money or pay immediately.',
      verificationCode: 'It asks for a password or verification code.',
      threatPressure: 'It uses threats or extreme urgency to make you act.',
      guaranteedReturn: 'It promises guaranteed returns or no risk.',
      suspiciousLink: 'It asks you to open a link in the message.',
      secrecy: 'It tells you not to tell family or anyone else.',
      miracleHealth: 'It claims a product can cure every illness or guarantee a cure.',
      impersonation: 'It may be pretending to be a bank, government worker or family member.'
    },
    actions: {
      pauseReply: 'Do not reply or rush into anything yet.',
      doNotTransfer: 'Do not transfer money or make a payment.',
      protectCredentials: 'Do not share passwords, verification codes or bank details.',
      verifyOfficially:
        'Open the official website or app yourself and use the contact information shown there.',
      askTrustedPerson: 'Ask a family member or friend you trust to look at it with you.'
    }
  },

  settings: {
    title: 'Display settings',
    subtitle: 'Make EverSide easier for you to see and easier to use.',
    textScaleTitle: 'Text size',
    textScaleHint: 'Bigger text is easier to read.',
    textScaleOptions: { standard: 'Standard', large: 'Extra large' },
    contrastTitle: 'Colours',
    contrastHint: 'Strong colours keep the words apart from the background.',
    contrastOptions: { normal: 'Normal', high: 'High contrast' },
    spokenGuidanceTitle: 'Spoken guidance',
    spokenGuidanceHint: 'When this is on, EverSide will read each step out loud.',
    spokenGuidancePending:
      'Spoken guidance is still being built. We will keep this choice for you.',
    reduceMotionTitle: 'Reduce movement',
    reduceMotionHint: 'Turns off sliding and shrinking effects, so the screen stays calm.',
    savedTitle: 'Your settings are saved',
    savedBody:
      'They are kept on this phone. The next time you open EverSide, it will look the way you left it.',
    resetLabel: 'Go back to the defaults',
    resetDialogTitle: 'Go back to the default settings?',
    resetDialogMessage:
      'The text size, the colours and the movement will go back to how they started. You can change them again at any time.',
    resetDialogConfirm: 'Use the defaults',
    resetDialogCancel: 'Keep my settings',
    resetDone: 'The default settings are back',
    doneLabel: 'Done',
    doneAriaLabel: 'Done, go back to the home screen',
    languageTitle: 'Language',
    languageHint: 'Choose the language that is easiest for you to read.'
  },

  components: {
    dialog: { confirm: 'OK', cancel: 'Cancel' },
    switch: { on: 'On', off: 'Off' },
    bottomNav: {
      home: 'Home',
      homeActive: 'Home, you are on this screen',
      settings: 'Display settings',
      settingsActive: 'Display settings, you are on this screen'
    }
  },

  status: {
    loading: {
      title: 'Getting things ready',
      description: 'Please wait a moment. It will not take long.'
    },
    error: {
      title: 'Something went wrong',
      description: 'That is alright. Shall we try that again?'
    },
    empty: {
      title: 'There is nothing here yet',
      description: 'You do not need to do anything now. You can look again later.'
    }
  },

  common: {
    retry: 'Try again',
    close: 'Close',
    home: 'Home',
    openFailed: 'The page could not be opened. Please try again later.'
  }
};
