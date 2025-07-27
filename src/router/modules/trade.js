/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const tradeRouter = [
  {
    path: '/futures',
    component: Layout,
    redirect: '/futures/symbols',
    meta: { title: 'futuresTrade', icon: 'table' },
    children: [
      {
        path: 'symbols',
        name: 'Symbols',
        component: () => import('@/views/futures/index'),
        meta: { title: 'futuresTrade', affix: false, noCache: false },
      },
      {
        path: 'list',
        name: 'OrderList',
        component: () => import('@/views/order/index'),
        meta: { title: 'futuresTradeOrder', affix: false, noCache: true },
      },
      {
        path: 'account',
        name: 'futuresAccount',
        component: () => import('@/views/futures/Account'),
        meta: { title: 'futuresAccount', affix: false, noCache: true },
      },
      {
        path: 'account2',
        name: 'futuresAccount2',
        component: () => import('@/views/futures/Account2'),
        meta: { title: 'futuresAccount2', affix: false, noCache: true },
      },
      {
        path: 'strategy-template',
        name: 'strategyTemplate',
        component: () => import('@/views/futures/StrategyTemplate'),
        meta: { title: 'strategyTemplate', affix: false, noCache: true },
      },
      {
        path: 'test-strategy-results',
        name: 'testStrategyResult',
        component: () => import('@/views/order/testOrder'),
        meta: { title: 'testStrategyResult', affix: false, noCache: true },
      },
    ],
  },
  // {
  //   path: '/spots',
  //   component: Layout,
  //   redirect: '/spots/symbols',
  //   meta: { title: 'spotsTrade', icon: 'table' },
  //   children: [
  //     {
  //       path: 'symbols',
  //       name: 'spotSymbols',
  //       component: () => import('@/views/spots/index'),
  //       meta: { title: 'spotsTrade', icon: 'table', affix: false, noCache: false },
  //     },
  //     // {
  //     //   path: 'account',
  //     //   name: 'futuresAccount',
  //     //   component: () => import('@/views/futures/Account'),
  //     //   meta: { title: 'futuresAccount', icon: 'table', affix: false, noCache: true },
  //     //   hidden: true,
  //     // },
  //     // {
  //     //   path: 'strategy-template',
  //     //   name: 'strategyTemplate',
  //     //   component: () => import('@/views/futures/StrategyTemplate'),
  //     //   meta: { title: 'strategyTemplate', icon: 'table', affix: false, noCache: true },
  //     //   hidden: true,
  //     // },
  //     // {
  //     //   path: 'test-strategy-results',
  //     //   name: 'testStrategyResult',
  //     //   component: () => import('@/views/order/testOrder'),
  //     //   meta: { title: 'testStrategyResult', icon: 'table', affix: false, noCache: true },
  //     //   hidden: true,
  //     // },
  //   ],
  // },

  {
    path: '/notice',
    component: Layout,
    redirect: '/notice/coin',
    meta: { title: 'coinNotice', icon: 'table' },
    children: [
      {
        path: 'spot',
        name: 'noticeSpot',
        component: () => import('@/views/notice/spot'),
        meta: { title: 'spotNotice', affix: false, noCache: true },
      },
      {
        path: 'feature',
        name: 'noticeFeature',
        component: () => import('@/views/notice/feature'),
        meta: { title: 'futuresNotice', affix: false, noCache: true },
      },
    ],
  },
  {
    path: '/listen',
    component: Layout,
    redirect: '/listen/coin',
    meta: { title: 'marketListen', icon: 'table' },
    children: [
      {
        path: 'spot',
        name: 'listenSpot',
        component: () => import('@/views/listen/spot'),
        meta: { title: 'spotListen', affix: false, noCache: true },
      },
      {
        path: 'feature',
        name: 'listenFeature',
        component: () => import('@/views/listen/feature'),
        meta: { title: 'futuresListen', affix: false, noCache: true },
      },
    ],
  },
  {
    path: '/funding-rate',
    component: Layout,
    redirect: '/funding-rate',
    meta: { title: 'fundingRate', icon: 'table' },
    children: [
      {
        path: 'funding-rate',
        name: 'fundingRates',
        component: () => import('@/views/listen/fundingRate'),
        meta: { title: 'fundingRate', icon: 'table', affix: false, noCache: true },
      },
      // {
      //   path: 'eat',
      //   name: 'fundingRateEat',
      //   component: () => import('@/views/fund-rate/Eat'),
      //   meta: { title: 'fundingRateEat', icon: 'table', affix: false, noCache: true },
      // },
    ],
  },
  {
    path: '/rush',
    component: Layout,
    redirect: '/rush/new-coin',
    children: [
      {
        path: 'new-coin',
        name: 'RushNewCoin',
        component: () => import('@/views/trade/NewCoin'),
        meta: { title: 'newCoinRush', icon: 'table', affix: false, noCache: true },
      },
    ],
  },
  {
    path: '/trade',
    component: Layout,
    redirect: '/trade/code',
    children: [
      {
        path: 'code',
        name: 'TradeCode',
        component: () => import('@/views/trade/TradeCode'),
        meta: { title: 'systemConfig', icon: 'form', affix: false, noCache: true },
      },
    ],
  },
  {
    path: '/log',
    component: Layout,
    redirect: '/log',
    children: [
      {
        path: 'log',
        component: () => import('@/views/background/log'),
        name: 'logs',
        meta: { title: 'logs', icon: 'chart', noCache: true },
      },
    ],
  },
]
export default tradeRouter
