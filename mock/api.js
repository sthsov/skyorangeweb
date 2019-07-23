import mockjs from 'mockjs';
import mysql2 from 'mysql2';


const titles = [
  'Alipay',
  'Angular',
  'Ant Design',
  'Ant Design Pro',
  'Bootstrap',
  'React',
  'Vue',
  'Webpack',
];
const avatars = [
  'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png', // Alipay
  'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png', // Angular
  'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png', // Ant Design
  'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png', // Ant Design Pro
  'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png', // Bootstrap
  'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png', // React
  'https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png', // Vue
  'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png', // Webpack
];

const avatars2 = [
  'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
  'https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png',
  'https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png',
  'https://gw.alipayobjects.com/zos/rmsportal/ubnKSIfAJTxIgXOKlciN.png',
  'https://gw.alipayobjects.com/zos/rmsportal/WhxKECPNujWoWEFNdnJE.png',
  'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png',
  'https://gw.alipayobjects.com/zos/rmsportal/psOgztMplJMGpVEqfcgF.png',
  'https://gw.alipayobjects.com/zos/rmsportal/ZpBqSxLxVEXfcUNoPKrz.png',
  'https://gw.alipayobjects.com/zos/rmsportal/laiEnJdGHVOhJrUShBaJ.png',
  'https://gw.alipayobjects.com/zos/rmsportal/UrQsqscbKEpNuJcvBZBu.png',
];

const covers = [
  'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
  'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png',
  'https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png',
  'https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png',
];
const desc = [
  '那是一种内在的东西， 他们到达不了，也无法触及的',
  '希望是一个好东西，也许是最好的，好东西是不会消亡的',
  '生命就像一盒巧克力，结果往往出人意料',
  '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
  '那时候我只会想自己想要什么，从不想自己拥有什么',
];

const user = [
  '付小小',
  '曲丽丽',
  '林东东',
  '周星星',
  '吴加好',
  '朱偏右',
  '鱼酱',
  '乐哥',
  '谭小仪',
  '仲尼',
];

/*
const tradeItems = [
  {
    item: '对象名称1',
    ask: 10000,
    bid: 20000,
    high: 30000,
    low: 5000,
    position: 123456,
    floating: 1234567,
    avgPrice: 123456
  },
  {
    item: '对象名称2',
    ask: 10000,
    bid: 20000,
    high: 30000,
    low: 5000,
    position: 123456,
    floating: 1234567,
    avgPrice: 123456
  },
  {
    item: '对象名称3',
    ask: 10000,
    bid: 20000,
    high: 30000,
    low: 5000,
    position: 123456,
    floating: 1234567,
    avgPrice: 123456
  }
]*/

let tradeItems;

function fakeTradeItems(req, res) {
  const sql = 'SELECT name,chineseName,position,avgPrice,buyRate,sellRate,dayHigh,dayLow FROM 07_item WHERE id<=28 ORDER BY id ASC';
  mysqlCon.query(sql, function (err, result) {
    if(err) {
      console.log('[SELECT ERROR]', err.message);
      return;
    }

    tradeItems = JSON.parse(JSON.stringify(result));
    return res.json(tradeItems);
  });

  //return res.json(tradeItems);
}

function fakeList(count) {
  const list = [];
  for (let i = 0; i < count; i += 1) {
    list.push({
      id: `fake-list-${i}`,
      owner: user[i % 10],
      title: titles[i % 8],
      avatar: avatars[i % 8],
      cover: parseInt(i / 4, 10) % 2 === 0 ? covers[i % 4] : covers[3 - (i % 4)],
      status: ['active', 'exception', 'normal'][i % 3],
      percent: Math.ceil(Math.random() * 50) + 50,
      logo: avatars[i % 8],
      href: 'https://ant.design',
      updatedAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i),
      createdAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i),
      subDescription: desc[i % 5],
      description:
        '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。',
      activeUser: Math.ceil(Math.random() * 100000) + 100000,
      newUser: Math.ceil(Math.random() * 1000) + 1000,
      star: Math.ceil(Math.random() * 100) + 100,
      like: Math.ceil(Math.random() * 100) + 100,
      message: Math.ceil(Math.random() * 10) + 10,
      content:
        '段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。',
      members: [
        {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png',
          name: '曲丽丽',
          id: 'member1',
        },
        {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png',
          name: '王昭君',
          id: 'member2',
        },
        {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png',
          name: '董娜娜',
          id: 'member3',
        },
      ],
    });
  }

  return list;
}

let sourceData;

function getFakeList(req, res) {
  const params = req.query;

  const count = params.count * 1 || 20;

  const result = fakeList(count);
  sourceData = result;
  return res.json(result);
}

function postFakeList(req, res) {
  const { /* url = '', */ body } = req;
  // const params = getUrlParams(url);
  const { method, id } = body;
  // const count = (params.count * 1) || 20;
  let result = sourceData;

  switch (method) {
    case 'delete':
      result = result.filter(item => item.id !== id);
      break;
    case 'update':
      result.forEach((item, i) => {
        if (item.id === id) {
          result[i] = Object.assign(item, body);
        }
      });
      break;
    case 'post':
      result.unshift({
        body,
        id: `fake-list-${result.length}`,
        createdAt: new Date().getTime(),
      });
      break;
    default:
      break;
  }

  return res.json(result);
}

const getNotice = [
  {
    id: 'xxx1',
    title: titles[0],
    logo: avatars[0],
    description: '那是一种内在的东西，他们到达不了，也无法触及的',
    updatedAt: new Date(),
    member: '科学搬砖组',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx2',
    title: titles[1],
    logo: avatars[1],
    description: '希望是一个好东西，也许是最好的，好东西是不会消亡的',
    updatedAt: new Date('2017-07-24'),
    member: '全组都是吴彦祖',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx3',
    title: titles[2],
    logo: avatars[2],
    description: '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
    updatedAt: new Date(),
    member: '中二少女团',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx4',
    title: titles[3],
    logo: avatars[3],
    description: '那时候我只会想自己想要什么，从不想自己拥有什么',
    updatedAt: new Date('2017-07-23'),
    member: '程序员日常',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx5',
    title: titles[4],
    logo: avatars[4],
    description: '凛冬将至',
    updatedAt: new Date('2017-07-23'),
    member: '高逼格设计天团',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx6',
    title: titles[5],
    logo: avatars[5],
    description: '生命就像一盒巧克力，结果往往出人意料',
    updatedAt: new Date('2017-07-23'),
    member: '骗你来学计算机',
    href: '',
    memberLink: '',
  },
];

const getActivities = [
  {
    id: 'trend-1',
    updatedAt: new Date(),
    user: {
      name: '曲丽丽',
      avatar: avatars2[0],
    },
    group: {
      name: '高逼格设计天团',
      link: 'http://github.com/',
    },
    project: {
      name: '六月迭代',
      link: 'http://github.com/',
    },
    template: '在 @{group} 新建项目 @{project}',
  },
  {
    id: 'trend-2',
    updatedAt: new Date(),
    user: {
      name: '付小小',
      avatar: avatars2[1],
    },
    group: {
      name: '高逼格设计天团',
      link: 'http://github.com/',
    },
    project: {
      name: '六月迭代',
      link: 'http://github.com/',
    },
    template: '在 @{group} 新建项目 @{project}',
  },
  {
    id: 'trend-3',
    updatedAt: new Date(),
    user: {
      name: '林东东',
      avatar: avatars2[2],
    },
    group: {
      name: '中二少女团',
      link: 'http://github.com/',
    },
    project: {
      name: '六月迭代',
      link: 'http://github.com/',
    },
    template: '在 @{group} 新建项目 @{project}',
  },
  {
    id: 'trend-4',
    updatedAt: new Date(),
    user: {
      name: '周星星',
      avatar: avatars2[4],
    },
    project: {
      name: '5 月日常迭代',
      link: 'http://github.com/',
    },
    template: '将 @{project} 更新至已发布状态',
  },
  {
    id: 'trend-5',
    updatedAt: new Date(),
    user: {
      name: '朱偏右',
      avatar: avatars2[3],
    },
    project: {
      name: '工程效能',
      link: 'http://github.com/',
    },
    comment: {
      name: '留言',
      link: 'http://github.com/',
    },
    template: '在 @{project} 发布了 @{comment}',
  },
  {
    id: 'trend-6',
    updatedAt: new Date(),
    user: {
      name: '乐哥',
      avatar: avatars2[5],
    },
    group: {
      name: '程序员日常',
      link: 'http://github.com/',
    },
    project: {
      name: '品牌迭代',
      link: 'http://github.com/',
    },
    template: '在 @{group} 新建项目 @{project}',
  },
];

function getFakeCaptcha(req, res) {
  return res.json('captcha-xxx');
}

const historyTrade = [
  {
    tradeID: 0,
    accountID: 0,
    solutionID: 0,
    item: '黄金',
    position: 1000,
    direction: '买',
    price: 100000,
    income: 10000,
    commission: 2000,
    time: '2019-1-1',
    remarks: '这是测试数据'
  },
  {
    tradeID: 1,
    accountID: 1,
    solutionID: 1,
    item: '黄金',
    position: 1000,
    direction: '买',
    price: 100000,
    income: 10000,
    commission: 2000,
    time: '2019-2-1',
    remarks: '这是测试数据'
  },
  {
    tradeID: 2,
    accountID: 2,
    solutionID: 2,
    item: '黄金',
    position: 1000,
    direction: '买',
    price: 100000,
    income: 10000,
    commission: 2000,
    time: '2019-3-1',
    remarks: '这是测试数据'
  },
  {
    tradeID: 3,
    accountID: 3,
    solutionID: 3,
    item: '黄金',
    position: 1000,
    direction: '买',
    price: 100000,
    income: 10000,
    commission: 2000,
    time: '2019-4-1',
    remarks: '这是测试数据'
  },
  {
    tradeID: 4,
    accountID: 4,
    solutionID: 4,
    item: '黄金',
    position: 1000,
    direction: '买',
    price: 100000,
    income: 10000,
    commission: 2000,
    time: '2019-4-10',
    remarks: '这是测试数据'
  },
  {
    tradeID: 5,
    accountID: 5,
    solutionID: 5,
    item: '黄金',
    position: 1000,
    direction: '买',
    price: 100000,
    income: 10000,
    commission: 2000,
    time: '2019-4-11',
    remarks: '这是测试数据'
  }
]

function getHistoryTrade(req, res) {
  return res.json(historyTrade)
}

const fakePlans = [
  {
    solutionID: 1,
    solutionName: '交易方案1',
    status: 1,
    tradeMoney: 2000,
    tradePerson: '交易人1'
  },
  {
    solutionID: 2,
    solutionName: '交易方案2',
    status: 1,
    tradeMoney: 2000,
    tradePerson: '交易人2'
  },
  {
    solutionID: 3,
    solutionName: '交易方案3',
    status: 1,
    tradeMoney: 2000,
    tradePerson: '交易人3'
  },
  {
    solutionID: 4,
    solutionName: '交易方案4',
    status: 1,
    tradeMoney: 8000,
    tradePerson: '交易人4'
  },
  {
    solutionID: 5,
    solutionName: '交易方案5',
    status: 0,
    tradeMoney: 5000,
    tradePerson: '交易人5'
  }
]

function getFakePlans (req, res) {
  return res.json(fakePlans)
}

const moneyDetails = [
  {
    realName: '张三',
    amount: 1000,
    action: '存款',
    time: '2019-4-13',
    remarks: '备注'
  },
  {
    realName: '张三',
    amount: 3000,
    action: '取款',
    time: '2019-4-13',
    remarks: '备注'
  },
  {
    realName: '张三',
    amount: 1000,
    action: '交易',
    time: '2019-4-13',
    tradeID: '1',
    remarks: '备注'
  },
  {
    realName: '张三',
    amount: 5000,
    action: '存款',
    time: '2019-4-13',
    remarks: '备注'
  },
  {
    realName: '张三',
    amount: 3000,
    action: '取款',
    time: '2019-4-13',
    remarks: '备注'
  },
  {
    realName: '李四',
    amount: 4000,
    action: '交易',
    time: '2019-4-13',
    tradeID: '2',
    remarks: '备注'
  },
  {
    realName: '李四',
    amount: 1000,
    action: '存款',
    time: '2019-4-13',
    remarks: '备注'
  },
  {
    realName: '李四',
    amount: 1000,
    action: '取款',
    time: '2019-4-13',
    remarks: '备注'
  },
  {
    realName: '李四',
    amount: 1000,
    action: '存款',
    time: '2019-4-13',
    remarks: '备注'
  },
  {
    realName: '李四',
    amount: 1000,
    action: '交易',
    time: '2019-4-13',
    tradeID: '3',
    remarks: '备注'
  },
]

function getMoneyDetails(req, res) {
  return res.json(moneyDetails);
}

const userList = [
  {
    loginName:'investor',
    password: 'skyorange',
    realName: '张三',
    email: '123456@email.com',
    phone: '12345678901',
    lastLoginTime: '2019-4-14'
  },
  {
    loginName:'trader',
    password: 'skyorange',
    realName: '张三',
    email: '123456@email.com',
    phone: '12345678901',
    lastLoginTime: '2019-4-14'
  },
  {
    loginName:'shareholder',
    password: 'skyorange',
    realName: '张三',
    email: '123456@email.com',
    phone: '12345678901',
    lastLoginTime: '2019-4-14'
  },
  {
    loginName:'admin',
    password: 'skyorange',
    realName: '张三',
    email: '123456@email.com',
    phone: '12345678901',
    lastLoginTime: '2019-4-14'
  }
]

function getUserList(req, res) {
  return res.json(userList);
}

function getItemIndicator(req, res){

}

const mysqlCon = mysql2.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'qwer1234',
  port: '3306',
  database: 'bmsiase2017'
});

function testMysqlCon(){
  const sql = 'SELECT * FROM 07_item WHERE name=\'AUDUSD\'';
  mysqlCon.query(sql, function (err, result) {
    if(err) {
      console.log('[SELECT ERROR]', err.message);
      return;
    }
    console.log('-------------------SELECT-----------------------');
    // node环境下显示返回值带有RowDataPacket
    // 用下面的方法可以显示正确的独享
    // 实际上可以使用结果对变量赋值
    console.log(JSON.parse(JSON.stringify(result)));
    console.log('------------------------------------------------------------\n\n');
  });
}




export default {
  'GET /api/project/notice': getNotice,
  'GET /api/activities': getActivities,
  'POST /api/forms': (req, res) => {
    res.send({ message: 'Ok' });
  },
  'GET /api/tags': mockjs.mock({
    'list|100': [{ name: '@city', 'value|1-100': 150, 'type|0-2': 1 }],
  }),
  'GET /api/fake_list': getFakeList,
  'POST /api/fake_list': postFakeList,
  'GET /api/captcha': getFakeCaptcha,
  'GET /api/fake_trade_items': fakeTradeItems,
  'GET /api/fake_history_trade': getHistoryTrade,
  'GET /api/fake_plans': getFakePlans,
  'GET /api/money_details': getMoneyDetails,
  'GET /api/user_list': getUserList,
  'GET /api/item_indicator': getItemIndicator
};
