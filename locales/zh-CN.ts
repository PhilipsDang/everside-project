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
    previewNote: '检查可疑信息的演示已经可以使用，其他功能正在一个一个准备中。'
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
    note: '“检查可疑信息”已经可以演示；其他三个功能仍在准备中。',
    openLabel: '点这里',
    actions: {
      checkSuspiciousMessage: {
        title: '检查可疑信息',
        description: '收到短信、消息或者来电，不确定是真是假的时候，先拿到这里看看。',
        ariaLabel: '检查可疑信息，点一下开始检查'
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

  fraudCheck: {
    input: {
      title: '检查可疑信息',
      subtitle: '把让您担心的消息放在这里，我们一起看看。',
      demoTitle: '这是演示版本',
      demoBody:
        '现在使用的是本地演示规则，不会把内容发到网络。结果只能作为第二双眼睛，不能保证消息一定安全。',
      messageTitle: '消息内容',
      messageHint: '可以粘贴短信、聊天消息或来电内容。不要输入银行卡密码或验证码。',
      messagePlaceholder: '在这里输入或粘贴消息',
      messageAriaLabel: '输入或粘贴需要检查的消息',
      examplesTitle: '试试演示案例',
      examplesHint: '点一个案例，它会自动放进上面的输入框。',
      screenshotTitle: '消息截图',
      screenshotHint: '可以选择一张截图预览。这个版本还不能识别图片里的文字。',
      chooseScreenshot: '选择截图',
      removeScreenshot: '移除截图',
      screenshotAriaLabel: '查看已经选择的消息截图',
      clearLabel: '清除内容',
      analyzeLabel: '开始检查',
      emptyTitle: '还没有可以检查的内容',
      emptyBody: '请输入一段消息，或者选择一张截图。',
      sensitiveDialogTitle: '这里可能有私密信息',
      sensitiveDialogBody:
        '我们发现了可能的验证码、银行卡号、电话号码或邮箱地址。演示会先遮住这些内容，再在本机检查。',
      sensitiveDialogConfirm: '遮住后继续',
      sensitiveDialogCancel: '返回修改',
      imageError: '暂时无法打开图片，请再试一次。',
      openError: '结果页面暂时打不开，请再试一次。'
    },
    examples: {
      bank: {
        label: '假冒银行通知',
        message: '【银行安全中心】您的账户即将冻结，请立即点击链接并输入验证码完成认证。',
        ariaLabel: '载入假冒银行通知演示案例'
      },
      family: {
        label: '假冒家人求助',
        message: '我是你孙子，手机坏了。现在急需转账两万元，不要告诉其他家人。',
        ariaLabel: '载入假冒家人求助演示案例'
      },
      investment: {
        label: '保证收益投资',
        message: '内部养老投资机会，零风险保证收益，今天转账就能参加。',
        ariaLabel: '载入保证收益投资演示案例'
      },
      health: {
        label: '神奇保健产品',
        message: '祖传神药包治百病，三天根治高血压，现在购买享受老人专属优惠。',
        ariaLabel: '载入神奇保健产品演示案例'
      },
      appointment: {
        label: '普通预约提醒',
        message: '预约提醒：您明天上午十点的社区门诊预约已经确认，请提前十分钟到达。',
        ariaLabel: '载入普通预约提醒演示案例'
      }
    },
    result: {
      title: '检查结果',
      subtitle: '慢慢看完，再决定下一步。',
      demoBadge: '本地演示结果',
      riskTitle: '风险判断',
      summaryTitle: '为什么这样判断',
      warningSignsTitle: '发现的警示信号',
      noWarningSigns: '没有发现常见的诈骗信号，但这不代表消息一定安全。',
      actionsTitle: '建议您现在这样做',
      disclaimerTitle: '请记住',
      disclaimerBody:
        '自动检查可能出错，也可能漏掉新的诈骗方法。涉及钱、账户或个人信息时，请通过官方渠道再次确认。',
      sensitiveTitle: '已保护私密信息',
      sensitiveBody: '检查前已经遮住可能的验证码、银行卡号、电话号码或邮箱地址。',
      imageOnlyTitle: '暂时无法读取截图文字',
      imageOnlyBody: '这个版本只能预览截图，还不能识别里面的文字，所以结果是“拿不准”。',
      checkAnother: '检查另一条消息',
      returnHome: '返回首页',
      missingTitle: '检查结果已经清除',
      missingBody: '为了保护隐私，结果不会长期保存。请返回并重新检查。',
      backToCheck: '返回检查页面',
      levels: {
        likelySafe: '可能安全',
        suspicious: '可疑',
        notSure: '拿不准'
      },
      summaries: {
        likelySafe: '没有发现演示规则认识的明显危险信号。仍请核对发件人和消息来源。',
        suspicious: '这条消息包含一种或多种常见诈骗手法。先不要按对方要求操作。',
        notSure: '现有信息不足以判断真假。先停下来，通过其他可靠方式确认。'
      }
    },
    indicators: {
      urgentPayment: '催促您马上转账或付款',
      verificationCode: '索要密码或验证码',
      threatPressure: '用威胁或紧迫感逼您立即行动',
      guaranteedReturn: '承诺保证收益或完全没有风险',
      suspiciousLink: '要求打开消息里的链接',
      secrecy: '要求您不要告诉家人或其他人',
      miracleHealth: '声称某种产品可以包治或根治疾病',
      impersonation: '可能冒充银行、政府工作人员或家人'
    },
    actions: {
      pauseReply: '先不要回复，也不要着急操作。',
      doNotTransfer: '不要转账或付款。',
      protectCredentials: '不要提供密码、验证码或银行卡资料。',
      verifyOfficially: '自己打开官方网站或官方应用，查找真正的联系方式进行确认。',
      askTrustedPerson: '请一位您信任的家人或朋友一起看看。'
    }
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
    home: '首页',
    openFailed: '页面暂时打不开，请稍后再试。'
  }
};

/** Shape of a complete set of translations. Every language file uses this type. */
export type Locale = typeof zhCN;
