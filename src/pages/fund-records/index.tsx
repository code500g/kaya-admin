import React from 'react';
import { Card, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PageContainer } from '@ant-design/pro-components';

interface RowItem {
  key: string;
  recordNo: string;
  type: string;
  amount: string;
  updatedAt: string;
}

const columns: ColumnsType<RowItem> = [
  { title: '流水号', dataIndex: 'recordNo', width: 180 },
  { title: '类型', dataIndex: 'type', width: 140 },
  { title: '金额', dataIndex: 'amount', width: 140 },
  { title: '时间', dataIndex: 'updatedAt', width: 180 },
];

const data: RowItem[] = [
  { key: '1', recordNo: 'TX-0001', type: '入账', amount: '+ ¥ 1,200.00', updatedAt: '2024-12-02 12:30' },
  { key: '2', recordNo: 'TX-0002', type: '出账', amount: '- ¥ 500.00', updatedAt: '2024-12-02 16:50' },
  { key: '3', recordNo: 'TX-0003', type: '入账', amount: '+ ¥ 3,000.00', updatedAt: '2024-12-03 09:20' },
];

const FundRecords: React.FC = () => {
  return (
    <PageContainer>
      <Card>
        <Table<RowItem> columns={columns} dataSource={data} pagination={false} />
      </Card>
    </PageContainer>
  );
};

export default FundRecords;
