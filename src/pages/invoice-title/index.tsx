import React from 'react';
import { Card, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PageContainer } from '@ant-design/pro-components';

interface RowItem {
  key: string;
  title: string;
  taxpayerNo: string;
  status: string;
  updatedAt: string;
}

const columns: ColumnsType<RowItem> = [
  { title: '抬头名称', dataIndex: 'title' },
  { title: '税号', dataIndex: 'taxpayerNo', width: 200 },
  { title: '状态', dataIndex: 'status', width: 120 },
  { title: '更新时间', dataIndex: 'updatedAt', width: 180 },
];

const data: RowItem[] = [
  { key: '1', title: '杭州某某科技有限公司', taxpayerNo: '91330100MA1A2B3C4D', status: '默认', updatedAt: '2024-12-02 10:10' },
  { key: '2', title: '个人抬头-张三', taxpayerNo: 'N/A', status: '备用', updatedAt: '2024-12-01 09:55' },
];

const InvoiceTitle: React.FC = () => {
  return (
    <PageContainer>
      <Card>
        <Table<RowItem> columns={columns} dataSource={data} pagination={false} />
      </Card>
    </PageContainer>
  );
};

export default InvoiceTitle;
