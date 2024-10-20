import request from '@/utils/request';

export function getFeatures(query = {}) {
  return request({
    url: '/rush',
    method: 'get',
    params: query
  });
}

export function setFeature(id, data) {
  return request({
    url: `/rush/${id}`,
    method: 'put',
    data
  });
}

export function addFeature(data) {
  return request({
    url: `/rush`,
    method: 'post',
    data
  });
}

export function delFeature(id) {
  return request({
    url: `/rush/${id}`,
    method: 'delete'
  });
}

export function enableFeature(flag = 1) {
  return request({
    url: `/rush/enable/${flag}`,
    method: 'put'
  });
}
