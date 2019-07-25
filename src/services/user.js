import request from '@/utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  //return request('/api/currentUser');
  return {
    name: '已登录用户',
    //avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    avatar: 'https://skyorange.com/icon/user.svg',
    userid: '00000001',
    email: '......',
    signature: '......',
    title: '......',
    group: '......',
    tags: [
      {
        key: '0',
        label: '......',
      },
    ],
    notifyCount: 12,
    unreadCount: 11,
    country: 'China',
    geographic: {
      province: {
        label: '......',
        key: '400000',
      },
      city: {
        label: '......',
        key: '400000',
      },
    },
    address: '......',
    phone: '023-68366666',
  };
}
