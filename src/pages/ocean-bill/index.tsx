import React from 'react';
import { Card, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PageContainer } from '@ant-design/pro-components';

interface RowItem {
  key: string;
  billNo: string;
  vessel: string;
  status: string;
  updatedAt: string;
}

const columns: ColumnsType<RowItem> = [
  { title: '提单号', dataIndex: 'billNo', width: 180 },
  { title: '船名/航次', dataIndex: 'vessel' },
  { title: '状态', dataIndex: 'status', width: 140 },
  { title: '更新时间', dataIndex: 'updatedAt', width: 180 },
];

const data: RowItem[] = [
  { key: '1', billNo: 'OBL-202312-001', vessel: 'OOCL XYZ / V001', status: '已放单', updatedAt: '2024-12-02 10:10' },
  { key: '2', billNo: 'OBL-202312-002', vessel: 'CMA ABC / V215', status: '待放单', updatedAt: '2024-12-03 09:30' },
];

const OceanBill: React.FC = () => {
  return (
    <PageContainer>
      <Card>
        <Table<RowItem> columns={columns} dataSource={data} pagination={false} />
      </Card>
    </PageContainer>
  );
};

export default OceanBill;
