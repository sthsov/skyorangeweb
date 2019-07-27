import request from '@/utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  const username = localStorage.getItem('username'); 
  //const response = await fetch('http://localhost:53527/DataService.ashx?target=userinfo&username=' + username);
  const response = await fetch('/Service/DataService.ashx?target=userinfo&username=' + username);
  const data = await response.json();
  return {
    ...data,
    avatar: 'https://skyorange.com/icon/user.svg',
  };
  // return {
  //   name: '已登录用户',
  //   //avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
  //   avatar: 'https://skyorange.com/icon/user.svg',
  //   userid: '00000001',
  //   email: '......',
  //   signature: '......',
  //   title: '......',
  //   group: '......',
  //   tags: [
  //     {
  //       key: '0',
  //       label: '......',
  //     },
  //   ],
  //   notifyCount: 12,
  //   unreadCount: 11,
  //   country: 'China',
  //   geographic: {
  //     province: {
  //       label: '......',
  //       key: '400000',
  //     },
  //     city: {
  //       label: '......',
  //       key: '400000',
  //     },
  //   },
  //   address: '......',
  //   phone: '023-68366666',
  // };
}
