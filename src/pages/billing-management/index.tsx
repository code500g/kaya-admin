import React from 'react';
import { Card, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PageContainer } from '@ant-design/pro-components';

interface RowItem {
  key: string;
  billNo: string;
  amount: string;
  status: string;
  updatedAt: string;
}

const columns: ColumnsType<RowItem> = [
  { title: '账单号', dataIndex: 'billNo', width: 160 },
  { title: '金额', dataIndex: 'amount', width: 140 },
  { title: '状态', dataIndex: 'status', width: 120 },
  { title: '更新时间', dataIndex: 'updatedAt', width: 180 },
];

const data: RowItem[] = [
  { key: '1', billNo: 'BILL-001', amount: '¥ 9,999.00', status: '待支付', updatedAt: '2024-12-02 08:30' },
  { key: '2', billNo: 'BILL-002', amount: '¥ 5,200.00', status: '已支付', updatedAt: '2024-12-01 19:40' },
];

const BillingManagement: React.FC = () => {
  return (
    <PageContainer>
      <Card>
        <Table<RowItem> columns={columns} dataSource={data} pagination={false} />
      </Card>
    </PageContainer>
  );
};

export default BillingManagement;
