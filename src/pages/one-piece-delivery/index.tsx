import React from 'react';
import { Card, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PageContainer } from '@ant-design/pro-components';

interface RowItem {
  key: string;
  sku: string;
  orderNo: string;
  status: string;
  updatedAt: string;
}

const columns: ColumnsType<RowItem> = [
  { title: '订单号', dataIndex: 'orderNo', width: 180 },
  { title: 'SKU', dataIndex: 'sku' },
  { title: '状态', dataIndex: 'status', width: 140 },
  { title: '更新时间', dataIndex: 'updatedAt', width: 180 },
];

const data: RowItem[] = [
  { key: '1', orderNo: 'OPD-001', sku: 'SKU-10001', status: '待发货', updatedAt: '2024-12-02 14:30' },
  { key: '2', orderNo: 'OPD-002', sku: 'SKU-10002', status: '已发货', updatedAt: '2024-12-03 09:05' },
];

const OnePieceDelivery: React.FC = () => {
  return (
    <PageContainer>
      <Card>
        <Table<RowItem> columns={columns} dataSource={data} pagination={false} />
      </Card>
    </PageContainer>
  );
};

export default OnePieceDelivery;
