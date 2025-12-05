// @ts-expect-error
/* eslint-disable */
import { request } from '@umijs/max';
import type { TableListItem } from './data';

/** 获取规则列表 GET /api/order */
export async function order(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: TableListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
    pageSize?: number;
    current?: number;
  }>('/api/order', {
    method: 'GET',
    params: {
      current: params.current || 1,
      pageSize: params.pageSize || 10,
      ...params,
    },
    ...(options || {}),
  })
    .then((response: any) => {
      console.log('service.ts 接收到响应:', response);

      return {
        data: response.data || [],
        total: response.total || 0,
        success: response.success !== false, // 默认为 true
        pageSize: response.pageSize,
        current: response.current,
      };
    })
    .catch((error: any) => {
      console.error('service.ts 请求失败:', error);
      return {
        data: [],
        total: 0,
        success: false,
      };
    });
}

/** 新建规则 PUT /api/order */
export async function updateRule(
  data: { [key: string]: any },
  options?: { [key: string]: any },
) {
  return request<TableListItem>('/api/order', {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/order */
export async function addRule(
  data: { [key: string]: any },
  options?: { [key: string]: any },
) {
  return request<TableListItem>('/api/order', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/order */
export async function removeRule(
  data: { key: number[] },
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/order', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}
