export default {
  route: {
    dashboard: '首页',
    documentation: '文档',
    guide: '引导页',
    permission: '权限测试页',
    rolePermission: '角色权限',
    pagePermission: '页面权限',
    directivePermission: '指令权限',
    icons: '图标',
    components: '组件',
    tinymce: '富文本编辑器',
    markdown: 'Markdown',
    jsonEditor: 'JSON 编辑器',
    dndList: '列表拖拽',
    splitPane: 'Splitpane',
    avatarUpload: '头像上传',
    dropzone: 'Dropzone',
    sticky: 'Sticky',
    countTo: 'Count To',
    componentMixin: '小组件',
    backToTop: '返回顶部',
    dragDialog: '拖拽 Dialog',
    dragSelect: '拖拽 Select',
    dragKanban: '可拖拽看板',
    charts: '图表',
    keyboardChart: '键盘图表',
    lineChart: '折线图',
    mixChart: '混合图表',
    example: '综合实例',
    nested: '路由嵌套',
    menu1: '菜单1',
    'menu1-1': '菜单 1-1',
    'menu1-2': '菜单 1-2',
    'menu1-2-1': '菜单 1-2-1',
    'menu1-2-2': '菜单 1-2-2',
    'menu1-3': '菜单 1-3',
    menu2: '菜单 2',
    Table: 'Table',
    dynamicTable: '动态 Table',
    dragTable: '拖拽 Table',
    inlineEditTable: 'Table 内编辑',
    complexTable: '综合 Table',
    tab: 'Tab',
    form: '表单',
    createArticle: '创建文章',
    editArticle: '编辑文章',
    articleList: '文章列表',
    errorPages: '错误页面',
    page401: '401',
    page404: '404',
    errorLog: '错误日志',
    excel: 'Excel',
    exportExcel: '导出 Excel',
    selectExcel: '导出 已选择项',
    mergeHeader: '导出 多级表头',
    uploadExcel: '上传 Excel',
    zip: 'Zip',
    pdf: 'PDF',
    exportZip: 'Export Zip',
    theme: '换肤',
    clipboardDemo: 'Clipboard',
    i18n: '国际化',
    externalLink: '外链',
    profile: '个人中心',

    futuresAccount: '合约账户',
    futuresTrade: '合约交易',
    futuresTradeOrder: '合约订单',
    newCoinRush: '新币抢购',
    newSpotRush: '币币抢购',
    newFuturesRush: '合约抢购',
    coinNotice: '币种通知',
    spotNotice: '现货通知',
    futuresNotice: '合约通知',
    marketListen: '行情监听',
    spotListen: '现货监听',
    futuresListen: '合约监听',
    fundingRate: '资金费率',
    fundingRateEat: '资金费率套利',
    systemConfig: '系统设置',
    strategyTemplate: '策略模板',
  },
  navbar: {
    dashboard: '首页',
    github: '项目地址',
    logOut: '退出登录',
    profile: '个人中心',
    theme: '换肤',
    size: '布局大小',
  },
  login: {
    title: '系统登录',
    logIn: '登录',
    username: '账号',
    password: '密码',
    any: '随便填',
    thirdparty: '第三方登录',
    thirdpartyTips: '本地不能模拟，请结合自己业务进行模拟！！！',
  },
  documentation: {
    documentation: '文档',
    github: 'Github 地址',
  },
  permission: {
    addRole: '新增角色',
    editPermission: '编辑权限',
    roles: '你的权限',
    switchRoles: '切换权限',
    tips: '在某些情况下，不适合使用 v-permission。例如：Element-UI 的 el-tab 或 el-table-column 以及其它动态渲染 dom 的场景。你只能通过手动设置 v-if 来实现。',
    delete: '删除',
    confirm: '确定',
    cancel: '取消',
  },
  guide: {
    description: '引导页对于一些第一次进入项目的人很有用，你可以简单介绍下项目的功能。本 Demo 是基于',
    button: '打开引导',
  },
  components: {
    documentation: '文档',
    tinymceTips: '富文本是管理后台一个核心的功能，但同时又是一个有很多坑的地方。在选择富文本的过程中我也走了不少的弯路，市面上常见的富文本都基本用过了，最终权衡了一下选择了Tinymce。更详细的富文本比较和介绍见',
    dropzoneTips: '由于我司业务有特殊需求，而且要传七牛 所以没用第三方，选择了自己封装。代码非常的简单，具体代码你可以在这里看到 @/components/Dropzone',
    stickyTips: '当页面滚动到预设的位置会吸附在顶部',
    backToTopTips1: '页面滚动到指定位置会在右下角出现返回顶部按钮',
    backToTopTips2: '可自定义按钮的样式、show/hide、出现的高度、返回的位置 如需文字提示，可在外部使用Element的el-tooltip元素',
    imageUploadTips: '由于我在使用时它只有vue@1版本，而且和mockjs不兼容，所以自己改造了一下，如果大家要使用的话，优先还是使用官方版本。',
  },
  table: {
    dynamicTips1: '固定表头, 按照表头顺序排序',
    dynamicTips2: '不固定表头, 按照点击顺序排序',
    dragTips1: '默认顺序',
    dragTips2: '拖拽后顺序',
    title: '标题',
    importance: '重要性',
    type: '类型',
    remark: '点评',
    search: '搜索',
    add: '添加',
    export: '导出',
    save: '保存',
    reviewer: '审核人',
    id: '序号',
    date: '时间',
    author: '作者',
    readings: '阅读数',
    status: '状态',
    actions: '操作',
    edit: '编辑',
    publish: '发布',
    draft: '草稿',
    delete: '删除',
    deleteAll: '删除所有',
    cancel: '取 消',
    confirm: '确 定',
    refresh: '刷新',
    restartService: '重启服务',
    stopService: '停止服务',
    enableAllCoins: '启用所有币种',
    disableAllCoins: '停用所有币种',
    editBatch: '批量修改',
    totalCount: '总数',
    all: '全部',
    open: '开启',
    close: '关闭',
    test: '测试',
    editSuccess: '修改成功',
    editFail: '修改失败',
    deleteSuccess: '删除成功',
    deleteFail: '删除失败',
    deleteConfirm: '确认删除',
    actionSuccess: '操作成功',
    actionFail: '操作失败',
    confirmRestartService: '确认重启服务?',
    confirmStopService: '确认停止合约服务?',
    confirmDeleteAll: '确认删除所有?',
    confirmSave: '确认要进行保存吗?',
    startTime: '开始时间',
    endTime: '结束时间',
    today: '今天',
    yesterday: '昨天',
    lastWeek: '最近一周',
    refreshInterval: '刷新间隔',
    startBot: '机器人开启',
    end: '机器人结束',
  },
  example: {
    warning: '创建和编辑页面是不能被 keep-alive 缓存的，因为keep-alive 的 include 目前不支持根据路由来缓存，所以目前都是基于 component name 来进行缓存的。如果你想类似的实现缓存效果，可以使用 localStorage 等浏览器缓存方案。或者不要使用 keep-alive 的 include，直接缓存所有页面。详情见',
  },
  errorLog: {
    tips: '请点击右上角bug小图标',
    description: '现在的管理后台基本都是spa的形式了，它增强了用户体验，但同时也会增加页面出问题的可能性，可能一个小小的疏忽就导致整个页面的死锁。好在 Vue 官网提供了一个方法来捕获处理异常，你可以在其中进行错误处理或者异常上报。',
    documentation: '文档介绍',
  },
  excel: {
    export: '导出',
    selectedExport: '导出已选择项',
    placeholder: '请输入文件名(默认excel-list)',
  },
  zip: {
    export: '导出',
    placeholder: '请输入文件名(默认file)',
  },
  pdf: {
    tips: '这里使用   window.print() 来实现下载pdf的功能',
  },
  theme: {
    change: '换肤',
    documentation: '换肤文档',
    tips: 'Tips: 它区别于 navbar 上的 theme-pick, 是两种不同的换肤方法，各自有不同的应用场景，具体请参考文档。',
  },
  tagsView: {
    refresh: '刷新',
    close: '关闭',
    closeOthers: '关闭其它',
    closeAll: '关闭所有',
  },
  settings: {
    title: '系统布局配置',
    theme: '主题色',
    tagsView: '开启 Tags-View',
    fixedHeader: '固定 Header',
    sidebarLogo: '币安自动化交易',
  },
  showPage: {
    open: '开启',
    close: '关闭',
    allowLong: '允许做多',
    allowShort: '允许做空',
    strategyTrade: '交易策略',
    strategyCoin: '选币策略',
    positionMaxCount: '最大持仓数量',
    excludeSymbols: '排除自动交易的币',
    orderType: '自动下单类型',
    marketOrderType: '市价',
    limitOrderType: '限价(根据价格深度取平均价挂单，有可能无法买入)',
    testPusher: '测试推送',
    testStrategy: '测试策略',
    externalLinks: '外部链接',
  },
  trade: {
    name: '名称',
    coin: '币种',
    coinType: '币种类型',
    nowPrice: '当前价格',
    klineInterval: 'K线类型',
    marginType: '模式',
    usdt: 'USDT',
    leverage: '杠杆',
    profitRate: '止盈%',
    lossRate: '止损%',
    enable: '启用',
    ISOLATED: '逐仓',
    CROSSED: '全仓',
    nowProfit: '当前盈亏',
    time: '时间',
    profit: '盈利',
    amount: '数量',
    tradeType: '交易类型',
    positionSide: '持仓方向',
    short: '做空',
    long: '做多',
    buy: '买入',
    sell: '卖出',
    spot: '现货',
    futures: '合约',
    stepSize: '数量精度',
    tickSize: '价格精度',
    spotNoticeTips: 'tips: 如果交易金额和交易数量同时填写,以交易数量为准',
    futuresNoticeTips: 'tips: 止盈价格或止损价格为 0 时代表不自动平仓',
    noticePrice: '通知价格',
    hasNotice: '已通知',
    autoTrade: '自动交易',
    yes: '是',
    no: '否',
    open: '开仓',
    close: '平仓',
    profitPrice: '止盈价格',
    lossPrice: '止损价格',
    changePercent: '涨跌幅(%)',
    noticeLimitMin: '通知间隔(min)',
    lastNotice: '最后通知',
    up: '上涨',
    down: '下跌',
    listenType: '监听类型',
    klineBase: 'k线变化',
    keltnerChannels: 'kc通道',
    fundingRateListenTips: 'tips: 合约资金费率变化 30 秒更新一次, 历史费率查询 api 限制 5min 中内最多查询 500 次',
    fundRate: '资金费率(%)',
    price: '价格',
    nowFundRate: '当前费率(%)',
    history: '历史',
    fundRateHistory: '资金费率历史',
    fundRateEatTips: '!!! 这是一个实验性功能，尚未完善，不保证能够稳定运行，盈亏自负 !!!',

    assets: '资产',
    account: '账户信息',
    position: '仓位',
    openOrder: '当前委托',

    technology: '技术指标',
    strategy: '策略',
    strategyType: '策略类型',
    custom: '自定义',
    startTime: '开始时间',
    endTime: '结束时间',
    strategyTemplate: '策略模板',
  },
  assets: {
    'asset': '资产',
    'walletBalance': '余额',
    'unrealizedProfit': '未实现盈亏',
    'marginBalance': '保证金余额',
    'maintMargin': '维持保证金',
    'initialMargin': '起始保证金',
    'positionInitialMargin': '持仓所需起始保证金',
    'openOrderInitialMargin': '当前挂单所需起始保证金',
    'crossWalletBalance': '全仓账户余额',
    'crossUnPnl': '全仓持仓未实现盈亏',
    'availableBalance': '可用余额',
    'maxWithdrawAmount': '最大可转出余额',
    'updateTime': '更新时间',
  },
  position: {
    symbol: '交易对',
    initialMargin: '当前所需起始保证金',
    maintMargin: '维持保证金',
    unrealizedProfit: '持仓未实现盈亏',
    positionInitialMargin: '持仓所需起始保证金',
    openOrderInitialMargin: '当前挂单所需起始保证金',
    leverage: '杠杆',
    isolated: '逐仓',
    crossed: '全仓',
    entryPrice: '开仓价格',
    maxNotional: '最大持仓数量',
    positionSide: '持仓方向',
    positionAmt: '持仓数量',
    notional: '当前持仓usdt',
    isolatedWallet: '逐仓账户余额',
    isolatedMargin: '逐仓账户保证金',
    isAutoAddMargin: '自动追加保证金',
    liquidationPrice: '强平价格',
    markPrice: '标记价格',
    nowProfit: '收益率(%)',
    updateTime: '更新时间',
  },
  positionSide: {
    BOTH: '双向',
    LONG: '做多',
    SHORT: '做空',
  },
  side: {
    BUY: '买入',
    SELL: '卖出',
  },
  order: {
    symbol: '交易对',
    orderId: '订单号',
    clientOrderId: '用户订单号',
    price: '委托价格',
    origQty: '委托数量',
    executedQty: '成交数量',
    cumQuote: '成交金额',
    avgPrice: '成交均价',
    status: '状态',
    timeInForce: '有效方法',
    type: '订单类型',
    side: '买卖方向',
    stopPrice: '触发价',
    closePosition: '条件全平仓',
    positionSide: '持仓方向',
    workingType: '条件价格触发类型',
    priceProtect: '条件单触发保护',
    priceMatch: '盘口价格下单模式',
    selfTradePreventionMode: '订单自成交保护模式',
    updateTime: '更新时间',
    time: '订单时间',
    reduceOnly: '仅减仓',
    origType: '触发前订单类型',
    activatePrice: '跟踪止损激活价格',
    priceRate: '跟踪止损回调比例',
    goodTillDate: 'GTD自动取消时间',
    orderList: '当前委托',
    orderHistory: '历史委托',
    orderDetail: '订单详情',
    cancelOrder: '取消订单',
    cancelAll: '取消所有订单',
    cancelSuccess: '取消成功',
    cancelFail: '取消失败',
    cancelConfirm: '确认取消',
    cancelAllConfirm: '确认取消所有',
    cancelAllSuccess: '全部取消成功',
    cancelAllFail: '全部取消失败',
    cancelAllOrders: '取消所有订单',
    cancelAllOrdersSuccess: '取消所有订单成功',
    cancelAllOrdersFail: '取消所有订单失败',
  },
  strategy: {
    name: '名称',
    code: '代码',
    type: '类型',
    enable: '启用',
    fullScreen: '全屏',
  },
  strategyType: {
    global: '全局',
    custom: '自定义',
    line1: 'line1',
    line2: 'line2',
    line3: 'line3',
    line4: 'line4',
    line5: 'line5',
    line6: 'line6',
    line7: 'line7',
  },
  technology: {
    name: '名称',
    klineInterval: 'K线类型',
    period: '周期',
    std_dev_multiplier: '带宽',
    multiplier: '多元',
    enable: '启用',
  },
}
