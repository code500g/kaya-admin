import { request } from '@umijs/max';
import type { UploadFile } from 'antd/es/upload';
import type { TableListItem } from './data';

export type WarehouseOrderPayload = {
  platformCode?: string;
  platformOrderNo?: string;
  storeNo?: string;
  totalPrice?: number;
  currency?: string;
  dispatchType?: string;
  signatureService?: string;
  shippingMethod?: string;
  labelType?: string;
  trackingNos?: string;
  businessType?: string;
  specialInstruction?: string;
  operationInstruction?: string;
  recipientName?: string;
  recipientLastName?: string;
  companyName?: string;
  countryCode?: string;
  city?: string;
  postalCode?: string;
  address1?: string;
  address2?: string;
  state?: string;
  houseNumber?: string;
  phone?: string;
  email?: string;
  products?: {
    name?: string;
    quantity?: number;
    unitPrice?: number;
  }[];
  attachments?: UploadFile[];
  trackingNumbers?: string[];
};

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
    extra?: Record<string, any>;
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
      return {
        data: response.data || [],
        total: response.total || 0,
        success: response.success !== false, // 默认为 true
        pageSize: response.pageSize,
        current: response.current,
        extra: response.extra,
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

/** 提交仓储发货订单 POST /api/warehouse-orders */
export async function submitWarehouseOrder(
  data: WarehouseOrderPayload,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/warehouse-orders', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}
