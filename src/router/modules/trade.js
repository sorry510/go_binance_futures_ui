/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const tradeRouter = [
  {
    path: '/symbols',
    component: Layout,
    redirect: '/symbols/symbols',
    children: [
      {
        path: 'symbols',
        name: 'Symbols',
        component: () => import('@/views/trade/index'),
        meta: { title: 'futuresTrade', icon: 'table' }
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    redirect: '/order/list',
    children: [
      {
        path: 'list',
        name: 'OrderList',
        component: () => import('@/views/order/index'),
        meta: { title: 'futuresTradeOrder', icon: 'table' }
      }
    ]
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
        meta: { title: 'newCoinRush', icon: 'table' }
      }
    ]
  },
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
        meta: { title: 'spotNotice' }
      },
      {
        path: 'feature',
        name: 'noticeFeature',
        component: () => import('@/views/notice/feature'),
        meta: { title: 'futuresNotice' }
      }
    ]
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
        meta: { title: 'spotListen' }
      },
      {
        path: 'feature',
        name: 'listenFeature',
        component: () => import('@/views/listen/feature'),
        meta: { title: 'futuresListen' }
      }
    ]
  },
  {
    path: '/funding-rate',
    component: Layout,
    redirect: '/funding-rate',
    children: [
      {
        path: 'funding-rate',
        name: 'fundingRates',
        component: () => import('@/views/listen/fundingRate'),
        meta: { title: 'fundingRate', icon: 'table' }
      }
    ]
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
        meta: { title: 'systemConfig', icon: 'form' }
      }
    ]
  }
]
export default tradeRouter
