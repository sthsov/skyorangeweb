import { stringify } from 'qs';
import request from '@/utils/request';
import { async } from 'q';
import { func, any } from 'prop-types';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params = {}) {
  return request(`/api/rule?${stringify(params.query)}`, {
    method: 'POST',
    body: {
      ...params.body,
      method: 'update',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile(id) {
  return request(`/api/profile/basic?id=${id}`);
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'update',
    },
  });
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function accountLogin(params){  
  //const response = await fetch('http://localhost:53527/DataService.ashx?target=login&username='+params.userName+'&password='+params.password);
  const response = await fetch('/Service/DataService.ashx?target=login&username='+params.userName+'&password='+params.password);
  const data = await response.json();   
  let res = { status: 'error', type: '', currentAuthority: 'guest', username: params.userName, };
  if (data['verification'] === 'true'){
    res.status = 'ok';
    res.currentAuthority = data['authority'];
    localStorage.setItem('username', res.username);
    return res;
  }
  return res;

  
}

export async function getTradeItems(){
  const response = await fetch('/Service/DataService.ashx?target=itemLiveInfo');    
  const data = await response.json();
  return data; 
}

export async function getOpeningTrade(){
  const response = await fetch('/Service/DataService.ashx?target=getOpeningTrade');    
  const data = await response.json();
  return data; 
}

export async function getClosedTrade(){
  const response = await fetch('/Service/DataService.ashx?target=getClosedTrade');    
  const data = await response.json();
  return data; 
}


export async function queryNotices(params = {}) {
  return request(`/api/notices?${stringify(params)}`);
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}

export async function getFakeTradeItems() {
  return request('/api/fake_trade_items');
}

export async function getHistoryTrade() {
  return request('/api/fake_history_trade');
}

export async function getTradePlans() {
  return request('/api/fake_plans');
}

export async function getMoneyDetails() {
  return request('/api/money_details');
}

export async function getUserList() {
  return request('/api/user_list');
}

export async function getItemIndicator(){
  return request('/api/item_indicator');
}
