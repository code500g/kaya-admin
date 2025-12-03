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
  { title: '编号', dataIndex: 'code', width: 160 },
  { title: '名称', dataIndex: 'name' },
  { title: '状态', dataIndex: 'status', width: 120 },
  { title: '更新时间', dataIndex: 'updatedAt', width: 180 },
];

const data: RowItem[] = [
  { key: '1', code: 'INV-001', name: '商品 A', status: '在库', updatedAt: '2024-12-01 10:00' },
  { key: '2', code: 'INV-002', name: '商品 B', status: '补货中', updatedAt: '2024-12-02 14:20' },
  { key: '3', code: 'INV-003', name: '商品 C', status: '在库', updatedAt: '2024-12-03 09:15' },
];

const ProductInventory: React.FC = () => {
  return (
    <PageContainer>
      <Card>
        <Table<RowItem> columns={columns} dataSource={data} pagination={false} />
      </Card>
    </PageContainer>
  );
};

export default ProductInventory;
