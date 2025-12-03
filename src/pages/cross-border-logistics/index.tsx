import React from 'react';
import { Card, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PageContainer } from '@ant-design/pro-components';

interface RowItem {
  key: string;
  orderNo: string;
  route: string;
  status: string;
  updatedAt: string;
}

const columns: ColumnsType<RowItem> = [
  { title: '订单号', dataIndex: 'orderNo', width: 180 },
  { title: '路线', dataIndex: 'route' },
  { title: '状态', dataIndex: 'status', width: 140 },
  { title: '更新时间', dataIndex: 'updatedAt', width: 180 },
];

const data: RowItem[] = [
  { key: '1', orderNo: 'CBL-001', route: '中国杭州 → 美国洛杉矶', status: '运输中', updatedAt: '2024-12-02 12:00' },
  { key: '2', orderNo: 'CBL-002', route: '中国宁波 → 德国汉堡', status: '清关中', updatedAt: '2024-12-03 08:45' },
];

const CrossBorderLogistics: React.FC = () => {
  return (
    <PageContainer>
      <Card>
        <Table<RowItem> columns={columns} dataSource={data} pagination={false} />
      </Card>
    </PageContainer>
  );
};

export default CrossBorderLogistics;
