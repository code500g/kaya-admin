export type TableListItem = {
  key: number;
  disabled?: boolean;
  href: string;
  avatar: string;
  name: string;
  owner: string;
  desc: string;
  callNo: number;
  status: string;
  updatedAt: Date;
  createdAt: Date;
  progress: number;
  // 业务字段（订单）
  platformCode?: string;
  platformOrderNo?: string;
  batchNo?: string;
  orderNo?: string;
  sku?: string;
  totalPrice?: number;
  totalQuantity?: number;
  orderStatus?: string;
  trackingNo?: string;
  shippingMethod?: string;
  shippingStatus?: string;
  outboundStatus?: number;
  labelUploaded?: boolean;
  interceptStatus?: string;
  fbaId?: string;
  multiOrder?: boolean;
};

export type TableListPagination = {
  total: number;
  pageSize: number;
  current: number;
  outboundStatus?: number;
};

export type TableListData = {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
};

export type TableListParams = {
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  outboundStatus?: number;
  pageSize?: number;
  current?: number;
  currentPage?: number;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
};
