import request from '@/utils/request';

export function getServiceConfig(query = {}) {
  return request({
    url: '/service/config',
    method: 'get',
    params: query
  });
}

