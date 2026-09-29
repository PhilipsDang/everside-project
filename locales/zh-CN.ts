/**
 * Simplified Chinese - the reference locale.
 *
 * This file defines the shape of the whole user interface: every key here must
 * exist in every other language file, which the type checker enforces.
 * New wording goes here first, then in the other languages.
 */
export const zhCN = {
  meta: {
    /** Endonym of the active language, used by the language switch. */
    languageName: '中文',
    languageAriaLabel: '当前语言：中文'
  },

  brand: {
    name: 'EverSide',
    tagline: '独立生活，守护在旁。',
    previewNote: '现在看到的是第一个版本，功能正在一个一个准备中。'
  },

  welcome: {
    chineseName: '守在身边的手机助手',
    intro:
      'EverSide 是一位陪着您的手机助手。它帮您看清可疑的消息，陪着您办日常的小事，' +
      '在您需要的时候帮您联系家人。',
    noticeTitle: '字大、清楚、一步一步',
    noticeBody:
      'EverSide 默认用较大的字和清楚的对比。按钮很大，步骤写得很清楚，没有倒计时，' +
      '也不会突然跳走。您随时可以自己调整文字大小和颜色对比。',
    startLabel: '开始使用',
    startAriaLabel: '开始使用，进入首页',
    settingsLabel: '调整显示设置',
    familyAssistLabel: '家人协助设置',
    familyAssistHint: '可以让家人陪您一起设置，不用您自己想办法。',
    languageTitle: '语言',
    languageHint: '选一种您看得最顺手的语言。'
  },

  home: {
    title: '首页',
    greeting: '您好',
    subtitle: '今天想做什么？下面是四个常用的入口，点一下就能进去。',
    note: '这四个功能正在一个一个准备中，现在看到的是它们的介绍页。',
    openLabel: '点这里',
    actions: {
      checkSuspiciousMessage: {
        title: '检查可疑信息',
        description: '收到短信、消息或者来电，不确定是真是假的时候，先拿到这里看看。',
        ariaLabel: '检查可疑信息，点一下打开介绍'
      },
      dailyTasks: {
        title: '日常事务帮助',
        description: '交费、买东西、挂号这些日常小事，我们一步一步陪着您做。',
        ariaLabel: '日常事务帮助，点一下打开介绍'
      },
      callHelp: {
        title: '通话帮助',
        description: '需要打电话的时候，陪着您把要说的话先想清楚。',
        ariaLabel: '通话帮助，点一下打开介绍'
      },
      familyGuard: {
        title: '亲友守护',
        description: '和信任的家人保持联系，需要的时候互相提醒。',
        ariaLabel: '亲友守护，点一下打开介绍'
      }
    }
  },

  features: {
    pointsTitle: '到时候它能帮您做什么',
    comingSoonTitle: '这个功能还在准备中',
    comingSoonBody: '这个功能会在以后的更新里准备好。到时候不用您操心，我们一步一步陪着您做。',
    todayTipTitle: '现在您可以做的',
    backLabel: '返回上一页',
    backAriaLabel: '返回上一页，回到刚才的页面',
    items: {
      checkSuspiciousMessage: {
        title: '检查可疑信息',
        subtitle: '帮您看清楚一条消息是不是真的',
        intro:
          '收到一条短信、一段消息或者一个来电，不确定是真是假的时候，可以先拿到这里看看。' +
          '我们会陪您一起看清楚，不会让您一个人着急。',
        points: [
          {
            title: '看看这是谁发来的',
            detail: '帮您分清常见的冒充家人、冒充银行、冒充工作人员的样子。'
          },
          {
            title: '看看要不要点那个链接',
            detail: '先停一停、问一问，再决定下一步怎么做，不着急。'
          },
          {
            title: '拿不准就找家人',
            detail: '可以请信任的家人一起看过再决定，不用自己一个人扛着。'
          }
        ],
        todayTip: '拿不准的时候，先别点开里面的链接和号码，可以找信任的家人一起看看。'
      },
      dailyTasks: {
        title: '日常事务帮助',
        subtitle: '交费、买东西、挂号，一步一步陪着您',
        intro:
          '交水电费、买东西、去医院挂号、查快递，这些日常小事我们一步一步陪着您做。' +
          '做到哪一步都会告诉您下一步是什么，您随时可以停下来。',
        points: [
          { title: '一步一步教', detail: '每一步都写清楚，看累了或者记不住了，随时可以停下来。' },
          { title: '慢慢来，不着急', detail: '下次打开还记得做到哪里，不用从头再来。' },
          {
            title: '要紧的事先提醒一句',
            detail: '涉及付钱或者填写个人信息的时候，我们会先提醒您。'
          }
        ],
        todayTip: '今天要办的事，可以先写在纸上，办完一件划掉一件，心里会踏实很多。'
      },
      callHelp: {
        title: '通话帮助',
        subtitle: '需要打电话的时候，陪着您把话说清楚',
        intro:
          '去医院问情况、找人工客服、或者给家人打电话，我们可以帮您提前想好要说什么、按哪个键，' +
          '免得一时紧张就忘了。',
        points: [
          { title: '先想好要说什么', detail: '帮您把要说的话理成几句简单的话，照着念就可以。' },
          { title: '电话里该按哪个键', detail: '需要的时候，屏幕上会一步一步告诉您，不用记号码。' },
          { title: '打完电话记一笔', detail: '重要的事情帮您记在小本子上，免得过后忘记。' }
        ],
        todayTip: '如果现在就要打电话，可以先把要说的话写在纸上，拿在手里会踏实一些。'
      },
      familyGuard: {
        title: '亲友守护',
        subtitle: '和信任的家人保持联系',
        intro:
          '和子女、孙辈或者其他您信任的家人保持联系。需要的时候互相提醒，平时心里也更踏实一点。',
        points: [
          { title: '只请信任的家人', detail: '由您来定请谁，他们只会看到您同意让他们看到的内容。' },
          { title: '需要的时候互相提醒', detail: '遇到拿不准的事情，家人能第一时间陪您一起看看。' },
          { title: '随时可以关掉', detail: '不想被打扰的时候，您说了算，说关就关。' }
        ],
        todayTip: '可以先和家人约一个固定打电话的时间，比如每周一次，不用想起才想起来。'
      }
    }
  },

  familyAssist: {
    title: '家人协助设置',
    subtitle: '让家人陪您一起设置',
    intro:
      '这个页面是留给家人帮忙用的。家人可以陪您把文字大小、颜色对比和声音一项一项调好，' +
      '调好以后就不用再麻烦他们了。',
    comingSoonBody: '现在还不能用。等它准备好，我们会在这里告诉您怎么用。',
    todayTip: '想现在就把字调大一点，可以点下面的按钮自己调，不用等家人。',
    settingsLabel: '打开显示设置',
    backLabel: '返回上一页'
  },

  settings: {
    title: '显示设置',
    subtitle: '让 EverSide 更适合您看，也更适合您用。',
    textScaleTitle: '文字大小',
    textScaleHint: '字大一点，看得更清楚。',
    textScaleOptions: { standard: '标准大小', large: '超大字体' },
    contrastTitle: '颜色对比',
    contrastHint: '高对比让文字和背景分得更开。',
    contrastOptions: { normal: '普通', high: '高对比' },
    spokenGuidanceTitle: '语音提示',
    spokenGuidanceHint: '开启以后，EverSide 会用说话的方式告诉您每一步。',
    spokenGuidancePending: '语音提示还在准备中。这个选择会先帮您记下来。',
    reduceMotionTitle: '减少动画',
    reduceMotionHint: '关掉滑动和缩放的动画，画面更安静。',
    savedTitle: '您的设置已经保存好了',
    savedBody: '这些设置保存在这台手机上。下次打开 EverSide，还是您习惯的样子。',
    resetLabel: '恢复默认设置',
    resetDialogTitle: '要恢复默认设置吗？',
    resetDialogMessage: '文字大小、颜色对比和动画都会变回一开始的样子，您随时可以再改回来。',
    resetDialogConfirm: '恢复默认',
    resetDialogCancel: '先不用',
    resetDone: '已经恢复默认设置',
    doneLabel: '完成',
    doneAriaLabel: '完成，回到首页',
    languageTitle: '语言',
    languageHint: '选一种您看得最顺手的语言。'
  },

  components: {
    dialog: { confirm: '确定', cancel: '取消' },
    switch: { on: '已开启', off: '已关闭' },
    bottomNav: {
      home: '首页',
      homeActive: '首页，您现在在这个页面',
      settings: '显示设置',
      settingsActive: '显示设置，您现在在这个页面'
    }
  },

  status: {
    loading: { title: '正在准备', description: '请稍等一下，很快就好。' },
    error: { title: '出了点小问题', description: '没有关系，我们再试一次好吗？' },
    empty: { title: '这里还没有内容', description: '现在不需要您做什么，稍后再来看看吧。' }
  },

  common: {
    retry: '再试一次',
    close: '关闭',
    home: '首页'
  }
};

/** Shape of a complete set of translations. Every language file uses this type. */
export type Locale = typeof zhCN;
