export interface RowItem {
  key: string;
  orderNo: string;
  businessType: string;
  handlingType: '退换标' | '仓储转运' | '一件代发';
  transport: '快递' | '卡车' | '自提' | '销毁';
  isStored: boolean;
  createdAt: string;
  receiveStatus: '未收货' | '部分收货' | '已收货';
  destWarehouse: string;
  storageStatus: number;
  finishedStatus: '未完结' | '已完结';
  productTotalQuantity: number;
  mark: string;
}

export const mockData: RowItem[] = [
  // 1 已入库, 2 未入库, 3 回收站
  {
    key: '1',
    orderNo: 'OPD-001',
    businessType: '退货',
    handlingType: '退换标',
    transport: '快递',
    isStored: true,
    createdAt: '2025-01-02 10:00',
    receiveStatus: '已收货',
    destWarehouse: '仓库A',
    storageStatus: 1,
    finishedStatus: '已完结',
    productTotalQuantity: 5,
    mark: 'MA-001',
  },
  {
    key: '2',
    orderNo: 'OPD-002',
    businessType: '换货',
    handlingType: '仓储转运',
    transport: '卡车',
    isStored: true,
    createdAt: '2025-01-03 09:30',
    receiveStatus: '已收货',
    destWarehouse: '仓库B',
    storageStatus: 1,
    finishedStatus: '已完结',
    productTotalQuantity: 2,
    mark: 'MA-002',
  },
  {
    key: '3',
    orderNo: 'OPD-003',
    businessType: '一件代发',
    handlingType: '一件代发',
    transport: '自提',
    isStored: false,
    createdAt: '2025-01-04 11:20',
    receiveStatus: '未收货',
    destWarehouse: '仓库C',
    storageStatus: 2,
    finishedStatus: '未完结',
    productTotalQuantity: 1,
    mark: 'MA-003',
  },
  {
    key: '4',
    orderNo: 'OPD-004',
    businessType: '退货',
    handlingType: '退换标',
    transport: '销毁',
    isStored: false,
    createdAt: '2025-01-05 15:10',
    receiveStatus: '部分收货',
    destWarehouse: '仓库A',
    storageStatus: 2,
    finishedStatus: '未完结',
    productTotalQuantity: 3,
    mark: 'MA-004',
  },
  {
    key: '5',
    orderNo: 'OPD-005',
    businessType: '仓储转运',
    handlingType: '仓储转运',
    transport: '快递',
    isStored: false,
    createdAt: '2025-01-06 08:45',
    receiveStatus: '未收货',
    destWarehouse: '仓库D',
    storageStatus: 2,
    finishedStatus: '未完结',
    productTotalQuantity: 4,
    mark: 'MA-005',
  },
  {
    key: '6',
    orderNo: 'OPD-006',
    businessType: '仓储转运',
    handlingType: '仓储转运',
    transport: '快递',
    isStored: false,
    createdAt: '2025-01-06 08:45',
    receiveStatus: '未收货',
    destWarehouse: '仓库D',
    storageStatus: 3,
    finishedStatus: '未完结',
    productTotalQuantity: 4,
    mark: 'MA-005',
  },
];
