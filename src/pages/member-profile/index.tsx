import React from 'react';
import { Card, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PageContainer } from '@ant-design/pro-components';

interface RowItem {
  key: string;
  name: string;
  level: string;
  status: string;
  updatedAt: string;
}

const columns: ColumnsType<RowItem> = [
  { title: '会员名称', dataIndex: 'name' },
  { title: '等级', dataIndex: 'level', width: 120 },
  { title: '状态', dataIndex: 'status', width: 120 },
  { title: '更新时间', dataIndex: 'updatedAt', width: 180 },
];

const data: RowItem[] = [
  { key: '1', name: '张三', level: 'VIP', status: '有效', updatedAt: '2024-12-02 12:00' },
  { key: '2', name: '李四', level: '普通', status: '暂停', updatedAt: '2024-12-03 09:10' },
];

const MemberProfile: React.FC = () => {
  return (
    <PageContainer>
      <Card>
        <Table<RowItem> columns={columns} dataSource={data} pagination={false} />
      </Card>
    </PageContainer>
  );
};

export default MemberProfile;
