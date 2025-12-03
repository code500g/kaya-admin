import React from 'react';
import { Card, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PageContainer } from '@ant-design/pro-components';

interface RowItem {
  key: string;
  account: string;
  balance: string;
  status: string;
  updatedAt: string;
}

const columns: ColumnsType<RowItem> = [
  { title: '账户', dataIndex: 'account' },
  { title: '余额', dataIndex: 'balance', width: 140 },
  { title: '状态', dataIndex: 'status', width: 120 },
  { title: '更新时间', dataIndex: 'updatedAt', width: 180 },
];

const data: RowItem[] = [
  { key: '1', account: '结算账户', balance: '¥ 12,345.00', status: '正常', updatedAt: '2024-12-02 18:20' },
  { key: '2', account: '备用账户', balance: '¥ 2,000.00', status: '正常', updatedAt: '2024-12-01 10:05' },
];

const EAccount: React.FC = () => {
  return (
    <PageContainer>
      <Card>
        <Table<RowItem> columns={columns} dataSource={data} pagination={false} />
      </Card>
    </PageContainer>
  );
};

export default EAccount;
