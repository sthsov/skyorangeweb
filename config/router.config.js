export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login'},
      { path: '/user/login', name: 'login', component: './User/Login'},
      { component: '404'}
    ]
  },
  // 主题应用
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'investor', 'trader', 'shareholder'],
    routes: [
      {path: '/', redirect: '/user/login'},
      // 直接访问默认跳转公告信息
      {
        path: '/bulletion-board',
        name: '公告信息',
        icon: 'notification',
        routes: [
          {
            path: '/bulletion-board/info',
            name: '公告信息',
            component: './BulletionBoard/BulletionBoard',
          },
          {
            path: '/bulletion-board/management',
            name: '公告信息管理',
            component: './BulletionBoard/BulletionBoardManagement',
            authority: ['admin']
          }
        ]
      },
      // 投资者相关页面
      {
        // investor money
        path: '/investor/',
        name: '投资者资金',
        icon: 'money-collect',
        authority: ['investor'],
        routes: [
          // 资金明细
          {
            path: '/investor/info',
            component: './Investor/InvestorMoney',
            name: '投资者资金明细'
          },
          // 资金管理
          {
            path: '/investor/management',
            component: './Investor/InvestorManagement',
            name: '投资者资金管理',
          }
        ]
      },
      {
        // investor info
        path: '/investor-info',
        name: '投资者信息',
        icon: 'user',
        authority: ['investor'],
        routes: [
          // 投资者信息明细
          {
            path: '/investor-info/info',
            name: '投资者信息明细',
            icon: 'solution',
            component: './Investor/InvestorInfoManagement',
          }
        ]
      },
      // 系统管理信息
      {
        // system management
        path: '/system',
        name: '系统管理',
        icon: 'tool',
        authority: ['admin', 'trader','shareholder'],
        routes: [
          // 系统资金概况
          {
            path: '/system/money-situation',
            name: '系统资金概况',
            component: './System/SystemMoney'
          },
          // 投资者管理
          {
            path: '/system/investor-management',
            name: '投资者管理',
            authority: ['admin'],
            routes: [
              // 投资者资金流动明细
              {
                path: '/system/investor-management/money-detail',
                name: '投资者资金流动明细',
                component: './System/SystemInvestor/InvestorMoneyDetail',
                authority: ['admin']
              },
              // 提款申请审批
              {
                path: '/system/investor-management/payout-request',
                name: '提款申请审批',
                component: './System/SystemInvestor/WithDrawals',
                authority: ['admin']
              },
              // 投资者信息管理
              {
                path: '/system/investor-management/info-management',
                name: '投资者信息管理',
                component: './System/SystemInvestor/InvestorInfoManagement',
                authority: ['admin']
              }
            ]
          },
          // 内部管理文件
          {
            path: '/system/file-management',
            name: '内部管理文件',
            component: './Forms/AdvancedForm',
            authority: ['admin']
          }
        ]
      },
      // 交易对象处理
      {
        path: '/tradeitem',
        name: '交易对象信息',
        icon: 'wallet',
        authority: ['trader', 'shareholder', 'admin'],
        routes: [
          {
            path: '/tradeitem/detail',
            name: '交易对象价格明细',
            component: './TradeItemInfo/TradeItemInfoDetail',
            authority: ['trader', 'admin']
          },
          {
            path: '/tradeitem/detail2',
            name: '交易对象价格明细',
            component: './TradeItemInfo/DetailForShareholder',
            authority: ['shareholder']
          },
          {
            path: '/tradeitem/detail/:id',
            name: '单个交易对象',
            component: './TradeItemInfo/SingleDetail',
            hideInMenu: true
          }
        ]
      },
      // 交易情况
      {
        path: '/tradesit',
        name: '交易情况',
        icon: 'solution',
        authority: ['admin'],
        routes: [
          {
            path: '/tradesit/detail',
            name: '正在进行的交易明细',
            component: './TradeSituation/TradeSituationDetail'
          },
          {
            path: '/tradesit/history',
            name: '历史交易记录',
            component: './TradeSituation/ClosedTrade'
          },
          {
            path: '/tradesit/analysis',
            name: '交易统计分析',
            component: './TradeSituation/TradeAnalysis'
          }
        ]
      },
      // 交易方案管理
      {
        path: '/tradeplan',
        name: '交易方案管理',
        icon: 'project',
        authority: ['admin'],
        routes: [
          {
            path: '/tradeplan/total',
            name: '交易方案总体运行情况',
            component: './TradePlan/TradePlanSituation'
          },
          {
            path: '/tradeplan/:id',
            name: '单个交易方案运行情况',
            component: './TradePlan/PlanDetail',
            hideInMenu: true
          },
          {
            path: '/tradeplan/deside/:id',
            name: '单个交易方案决策',
            component: './TradePlan/DesideDetail',
            hideInMenu: true
          }
        ]
      },
      // 交易决策管理
      {
        path: '/tradedecision',
        icon: 'schedule',
        name: '交易决策管理',
        authority: ['admin', 'trader'],
        routes: [
          {
            path: '/tradedecision/admin',
            name: '管理者决策',
            component: './TradeDecision/AdminDecision',
            authority: ['admin']
          },
          {
            path: '/tradedecision/detail',
            name: '判断分析',
            component: './TradeDecision/AdminDecisionDetail'
          }
        ]
      },
      // 404页面
      {component: '404'}
    ]
  },
]
