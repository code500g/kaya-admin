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
  { title: '配置项', dataIndex: 'name' },
  { title: '编号', dataIndex: 'code', width: 160 },
  { title: '状态', dataIndex: 'status', width: 120 },
  { title: '更新时间', dataIndex: 'updatedAt', width: 180 },
];

const data: RowItem[] = [
  { key: '1', code: 'CFG-001', name: '物流设置', status: '启用', updatedAt: '2024-12-01 09:30' },
  { key: '2', code: 'CFG-002', name: '通知设置', status: '启用', updatedAt: '2024-12-02 16:10' },
];

const SettingsManagement: React.FC = () => {
  return (
    <PageContainer>
      <Card>
        <Table<RowItem> columns={columns} dataSource={data} pagination={false} />
      </Card>
    </PageContainer>
  );
};

export default SettingsManagement;
