import React from 'react';
import { Card, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PageContainer } from '@ant-design/pro-components';

interface RowItem {
  key: string;
  orderNo: string;
  platformCode: string;
  status: string;
  updatedAt: string;
}

const columns: ColumnsType<RowItem> = [
  { title: '订单号', dataIndex: 'orderNo', width: 180 },
  { title: '平台代码', dataIndex: 'platformCode', width: 160 },
  { title: '状态', dataIndex: 'status', width: 120 },
  { title: '更新时间', dataIndex: 'updatedAt', width: 180 },
];

const data: RowItem[] = [
  { key: '1', orderNo: 'WH-0001', platformCode: 'amazon VC', status: '待发货', updatedAt: '2024-12-02 10:00' },
  { key: '2', orderNo: 'WH-0002', platformCode: 'amazon VC', status: '已发货', updatedAt: '2024-12-03 14:20' },
  { key: '3', orderNo: 'WH-0003', platformCode: 'amazon VC', status: '已签收', updatedAt: '2024-12-03 16:45' },
];

const WarehouseOrders: React.FC = () => {
  return (
    <PageContainer>
      <Card>
        <Table<RowItem> columns={columns} dataSource={data} pagination={false} />
      </Card>
    </PageContainer>
  );
};

export default WarehouseOrders;
