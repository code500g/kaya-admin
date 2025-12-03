import React from 'react';
import { Card, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PageContainer } from '@ant-design/pro-components';

interface RowItem {
  key: string;
  code: string;
  name: string;
  status: string;
  updatedAt: string;
}

const columns: ColumnsType<RowItem> = [
  { title: '退货单号', dataIndex: 'code', width: 160 },
  { title: '商品', dataIndex: 'name' },
  { title: '状态', dataIndex: 'status', width: 120 },
  { title: '更新时间', dataIndex: 'updatedAt', width: 180 },
];

const data: RowItem[] = [
  { key: '1', code: 'RT-202312-01', name: '商品 A', status: '处理中', updatedAt: '2024-12-02 11:00' },
  { key: '2', code: 'RT-202312-02', name: '商品 B', status: '完成', updatedAt: '2024-12-03 15:45' },
];

const ReturnsManagement: React.FC = () => {
  return (
    <PageContainer>
      <Card>
        <Table<RowItem> columns={columns} dataSource={data} pagination={false} />
      </Card>
    </PageContainer>
  );
};

export default ReturnsManagement;
