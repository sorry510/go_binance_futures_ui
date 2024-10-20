import request from '@/utils/request';

export function getNoticeCoins(query = {}) {
  return request({
    url: '/notice/coin',
    method: 'get',
    params: query
  });
}

export function setNoticeCoin(id, data) {
  return request({
    url: `/notice/coin/${id}`,
    method: 'put',
    data
  });
}

export function addNoticeCoin(data) {
  return request({
    url: `/notice/coin`,
    method: 'post',
    data
  });
}

export function delNoticeCoin(id) {
  return request({
    url: `/notice/coin/${id}`,
    method: 'delete'
  });
}

export function enableNoticeCoin(flag = 1) {
  return request({
    url: `/notice/coin/enable/${flag}`,
    method: 'put'
  });
}
