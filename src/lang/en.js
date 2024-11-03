export default {
  route: {
    dashboard: 'Dashboard',
    documentation: 'Documentation',
    guide: 'Guide',
    permission: 'Permission',
    pagePermission: 'Page Permission',
    rolePermission: 'Role Permission',
    directivePermission: 'Directive Permission',
    icons: 'Icons',
    components: 'Components',
    tinymce: 'Tinymce',
    markdown: 'Markdown',
    jsonEditor: 'JSON Editor',
    dndList: 'Dnd List',
    splitPane: 'SplitPane',
    avatarUpload: 'Avatar Upload',
    dropzone: 'Dropzone',
    sticky: 'Sticky',
    countTo: 'Count To',
    componentMixin: 'Mixin',
    backToTop: 'Back To Top',
    dragDialog: 'Drag Dialog',
    dragSelect: 'Drag Select',
    dragKanban: 'Drag Kanban',
    charts: 'Charts',
    keyboardChart: 'Keyboard Chart',
    lineChart: 'Line Chart',
    mixChart: 'Mix Chart',
    example: 'Example',
    nested: 'Nested Routes',
    menu1: 'Menu 1',
    'menu1-1': 'Menu 1-1',
    'menu1-2': 'Menu 1-2',
    'menu1-2-1': 'Menu 1-2-1',
    'menu1-2-2': 'Menu 1-2-2',
    'menu1-3': 'Menu 1-3',
    menu2: 'Menu 2',
    Table: 'Table',
    dynamicTable: 'Dynamic Table',
    dragTable: 'Drag Table',
    inlineEditTable: 'Inline Edit',
    complexTable: 'Complex Table',
    tab: 'Tab',
    form: 'Form',
    createArticle: 'Create Article',
    editArticle: 'Edit Article',
    articleList: 'Article List',
    errorPages: 'Error Pages',
    page401: '401',
    page404: '404',
    errorLog: 'Error Log',
    excel: 'Excel',
    exportExcel: 'Export Excel',
    selectExcel: 'Export Selected',
    mergeHeader: 'Merge Header',
    uploadExcel: 'Upload Excel',
    zip: 'Zip',
    pdf: 'PDF',
    exportZip: 'Export Zip',
    theme: 'Theme',
    clipboardDemo: 'Clipboard',
    i18n: 'I18n',
    externalLink: 'External Link',
    profile: 'Profile',

    futuresAccount: 'Futures Account',
    futuresTrade: 'Futures Trade',
    futuresTradeOrder: 'Futures Trade Order',
    newCoinRush: 'New Coin Rush',
    newSpotRush: 'New Spot Rush',
    newFuturesRush: 'New futures Rush',
    coinNotice: 'Coin Notice',
    spotNotice: 'Spot Notice',
    futuresNotice: 'Futures Notice',
    marketListen: 'Market Listen',
    spotListen: 'Spot Listen',
    futuresListen: 'Futures Listen',
    fundingRate: 'Funding Rate',
    systemConfig: 'System Config'
  },
  navbar: {
    dashboard: 'Dashboard',
    github: 'Github',
    logOut: 'Log Out',
    profile: 'Profile',
    theme: 'Theme',
    size: 'Global Size'
  },
  login: {
    title: 'Login Form',
    logIn: 'Login',
    username: 'Username',
    password: 'Password',
    any: 'any',
    thirdparty: 'Or connect with',
    thirdpartyTips: 'Can not be simulated on local, so please combine you own business simulation! ! !'
  },
  documentation: {
    documentation: 'Documentation',
    github: 'Github Repository'
  },
  permission: {
    addRole: 'New Role',
    editPermission: 'Edit',
    roles: 'Your roles',
    switchRoles: 'Switch roles',
    tips: 'In some cases, using v-permission will have no effect. For example: Element-UI  el-tab or el-table-column and other scenes that dynamically render dom. You can only do this with v-if.',
    delete: 'Delete',
    confirm: 'Confirm',
    cancel: 'Cancel'
  },
  guide: {
    description: 'The guide page is useful for some people who entered the project for the first time. You can briefly introduce the features of the project. Demo is based on ',
    button: 'Show Guide'
  },
  components: {
    documentation: 'Documentation',
    tinymceTips: 'Rich text is a core feature of the management backend, but at the same time it is a place with lots of pits. In the process of selecting rich texts, I also took a lot of detours. The common rich texts on the market have been basically used, and I finally chose Tinymce. See the more detailed rich text comparison and introduction.',
    dropzoneTips: 'Because my business has special needs, and has to upload images to qiniu, so instead of a third party, I chose encapsulate it by myself. It is very simple, you can see the detail code in @/components/Dropzone.',
    stickyTips: 'when the page is scrolled to the preset position will be sticky on the top.',
    backToTopTips1: 'When the page is scrolled to the specified position, the Back to Top button appears in the lower right corner',
    backToTopTips2: 'You can customize the style of the button, show / hide, height of appearance, height of the return. If you need a text prompt, you can use element-ui el-tooltip elements externally',
    imageUploadTips: 'Since I was using only the vue@1 version, and it is not compatible with mockjs at the moment, I modified it myself, and if you are going to use it, it is better to use official version.'
  },
  table: {
    dynamicTips1: 'Fixed header, sorted by header order',
    dynamicTips2: 'Not fixed header, sorted by click order',
    dragTips1: 'The default order',
    dragTips2: 'The after dragging order',
    title: 'Title',
    importance: 'Imp',
    type: 'Type',
    remark: 'Remark',
    search: 'Search',
    add: 'Add',
    export: 'Export',
    save: 'Save',
    reviewer: 'reviewer',
    id: 'ID',
    date: 'Date',
    author: 'Author',
    readings: 'Readings',
    status: 'Status',
    actions: 'Actions',
    edit: 'Edit',
    publish: 'Publish',
    draft: 'Draft',
    delete: 'Delete',
    deleteAll: 'Delete All',
    cancel: 'Cancel',
    confirm: 'Confirm',
    refresh: 'Refresh',
    restartService: 'restart service',
    stopService: 'stop futures service',
    enableAllCoins: 'enable all coins',
    disableAllCoins: 'disable all coins',
    editBatch: 'edit batch',
    totalCount: 'total count',
    all: 'all',
    open: 'open',
    close: 'close',
    test: 'test',
    editSuccess: 'edit success',
    editFail: 'edit fail',
    deleteSuccess: 'delete success',
    deleteFail: 'delete fail',
    deleteConfirm: 'confirm delete',
    actionSuccess: 'action success',
    actionFail: 'action fail',
    confirmRestartService: 'confirm restart service ?',
    confirmStopService: 'confirm stop futures service ?',
    confirmDeleteAll: 'confirm delete all ?',
    confirmSave: 'confirm save ?',
    startTime: 'start time',
    endTime: 'end time',
    today: 'today',
    yesterday: 'yesterday',
    lastWeek: 'last week',
    refreshInterval: 'refresh interval'
  },
  example: {
    warning: 'Creating and editing pages cannot be cached by keep-alive because keep-alive include does not currently support caching based on routes, so it is currently cached based on component name. If you want to achieve a similar caching effect, you can use a browser caching scheme such as localStorage. Or do not use keep-alive include to cache all pages directly. See details'
  },
  errorLog: {
    tips: 'Please click the bug icon in the upper right corner',
    description: 'Now the management system are basically the form of the spa, it enhances the user experience, but it also increases the possibility of page problems, a small negligence may lead to the entire page deadlock. Fortunately Vue provides a way to catch handling exceptions, where you can handle errors or report exceptions.',
    documentation: 'Document introduction'
  },
  excel: {
    export: 'Export',
    selectedExport: 'Export Selected Items',
    placeholder: 'Please enter the file name (default excel-list)'
  },
  zip: {
    export: 'Export',
    placeholder: 'Please enter the file name (default file)'
  },
  pdf: {
    tips: 'Here we use window.print() to implement the feature of downloading PDF.'
  },
  theme: {
    change: 'Change Theme',
    documentation: 'Theme documentation',
    tips: 'Tips: It is different from the theme-pick on the navbar is two different skinning methods, each with different application scenarios. Refer to the documentation for details.'
  },
  tagsView: {
    refresh: 'Refresh',
    close: 'Close',
    closeOthers: 'Close Others',
    closeAll: 'Close All'
  },
  settings: {
    title: 'Page style setting',
    theme: 'Theme Color',
    tagsView: 'Open Tags-View',
    fixedHeader: 'Fixed Header',
    sidebarLogo: 'binance trade bot'
  },
  showPage: {
    open: 'open',
    close: 'close',
    allowLong: 'allow long',
    allowShort: 'allow short',
    strategyTrade: 'strategy trade',
    strategyCoin: 'strategy coin',
    positionMaxCount: 'position max count',
    excludeSymbols: 'excluded automatic trading coins',
    orderType: 'Order Type',
    marketOrderType: 'MARKET',
    limitOrderType: 'LIMIT: (Based on the depth of the price, the average price is taken as the average for placing orders, and it may not be possible to buy)',
    testPusher: 'test pusher',
    externalLinks: 'external links'
  },
  trade: {
    coin: 'coin',
    coinType: 'coin type',
    nowPrice: 'now price',
    klineInterval: 'kline interval',
    marginType: 'margin type',
    usdt: 'USDT',
    leverage: 'leverage',
    profitRate: 'profit%',
    lossRate: 'loss%',
    enable: 'enable',
    ISOLATED: 'ISOLATED',
    CROSSED: 'CROSSED',
    nowProfit: 'now profit',
    time: 'time',
    profit: 'profit',
    amount: 'amount',
    tradeType: 'trade type',
    positionSide: 'position side',
    short: 'short',
    long: 'long',
    buy: 'buy',
    sell: 'sell',
    spot: 'spot',
    futures: 'futures',
    stepSize: 'step size',
    tickSize: 'tick size',
    spotNoticeTips: 'tips: if the amount and usdt are filled in simultaneously, the amount shall prevail',
    futuresNoticeTips: 'tips: when profit price or loss price is 0, it will not be automatically closed',
    noticePrice: 'notice price',
    hasNotice: 'has notice',
    autoTrade: 'auto trade',
    yes: 'yes',
    no: 'no',
    open: 'open',
    close: 'close',
    profitPrice: 'profit price',
    lossPrice: 'loss price',
    changePercent: 'change(%)',
    noticeLimitMin: 'notice limit(min)',
    lastNotice: 'last notice',
    up: 'up',
    down: 'down',
    kcChannels: 'kc channels',
    listenType: 'listen type',
    klineBase: 'kline base',
    keltnerChannels: 'kc chart',
    fundingRateListenTips: 'tips: The futures fund rate changes every 30 seconds, and the historical rate query API is limited to a maximum of 500 queries within 5 minutes',
    fundRate: 'fund rate(%)',
    price: 'price',
    nowFundRate: 'now fund rate(%)',
    history: 'history',
    fundRateHistory: 'fund rate history',

    assets: 'assets',
    account: 'account',
    position: 'position',
    openOrder: 'openOrder',

    technology: 'technology',
    strategy: 'strategy',
    strategyType: 'strategy type',
    custom: 'custom'
  },
  assets: {
    'asset': 'asset',
    'walletBalance': 'Wallet Balance',
    'unrealizedProfit': 'Unrealized Profit',
    'marginBalance': 'Margin Balance',
    'maintMargin': 'Maint Margin',
    'initialMargin': 'Initial Margin',
    'positionInitialMargin': 'Position Initial Margin',
    'openOrderInitialMargin': 'Open Order Initial Margin',
    'crossWalletBalance': 'Cross Wallet Balance',
    'crossUnPnl': 'Cross Un Pnl',
    'availableBalance': 'Available Balance',
    'maxWithdrawAmount': 'Max Withdraw Amount',
    updateTime: 'Update Time'
  },
  position: {
    symbol: 'Symbol',
    initialMargin: 'Initial Margin',
    maintMargin: 'Maint Margin',
    unrealizedProfit: 'Unrealized Profit',
    positionInitialMargin: 'Position Initial Margin',
    openOrderInitialMargin: 'Open Order Initial Margin',
    leverage: 'Leverage',
    isolated: 'Isolated',
    crossed: 'Crossed',
    entryPrice: 'Entry Price',
    maxNotional: 'Max Notional',
    positionSide: 'Position Side',
    positionAmt: 'Position Amt',
    notional: 'Notional',
    isolatedWallet: 'Isolated Wallet',
    isolatedMargin: 'Isolated Margin',
    isAutoAddMargin: 'Is Auto Add Margin',
    liquidationPrice: 'Liquidation Price',
    markPrice: 'Mark Price',
    nowProfit: 'Now Profit(%)',
    updateTime: 'Update Time'
  },
  positionSide: {
    BOTH: 'both',
    LONG: 'long',
    SHORT: 'short'
  },
  side: {
    BUY: 'buy',
    SELL: 'sell'
  },
  order: {
    symbol: 'Symbol',
    orderId: 'Order Id',
    clientOrderId: 'Client Order Id',
    price: 'Price',
    origQty: 'Orig Qty',
    executedQty: 'Executed Qty',
    cumQuote: 'Cum Quote',
    avgPrice: 'Avg Price',
    status: 'Status',
    timeInForce: 'Time In Force',
    type: 'Type',
    side: 'Side',
    stopPrice: 'Stop Price',
    closePosition: 'Close Position',
    positionSide: 'Position Side',
    workingType: 'Working Type',
    priceProtect: 'Price Protect',
    priceMatch: 'Price Match',
    selfTradePreventionMode: 'Self Trade Prevention Mode',
    updateTime: 'Update Time',
    time: 'Time',
    reduceOnly: 'Reduce Only',
    origType: 'Orig Type',
    activatePrice: 'Activate Price',
    priceRate: 'Price Rate',
    goodTillDate: 'Good Till Date',
    orderList: 'Order List',
    orderHistory: 'Order History',
    orderDetail: 'Order Detail',
    cancelOrder: 'Cancel Order',
    cancelAll: 'Cancel All Orders',
    cancelSuccess: 'Cancel Success',
    cancelFail: 'Cancel Fail',
    cancelConfirm: 'Confirm Cancel',
    cancelAllConfirm: 'Confirm Cancel All',
    cancelAllSuccess: 'Cancel All Success',
    cancelAllFail: 'Cancel All Fail',
    cancelAllOrders: 'Cancel All Orders',
    cancelAllOrdersSuccess: 'Cancel All Orders Success',
    cancelAllOrdersFail: 'Cancel All Orders Fail'
  },
  strategy: {
    name: 'name',
    code: 'code',
    type: 'type',
    enable: 'enable',
    fullScreen: 'full screen'
  },
  strategyType: {
    global: 'global',
    custom: 'custom',
    line1: 'line1',
    line2: 'line2',
    line3: 'line3',
    line4: 'line4',
    line5: 'line5',
    line6: 'line6',
    line7: 'line7'
  },
  technology: {
    name: 'name',
    klineInterval: 'kline interval',
    period: 'period',
    std_dev_multiplier: 'std dev multiplier',
    multiplier: 'multiplier',
    enable: 'enable'
  }
}
