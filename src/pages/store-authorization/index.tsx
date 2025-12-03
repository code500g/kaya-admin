import React from 'react';
import { Card, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PageContainer } from '@ant-design/pro-components';

interface RowItem {
  key: string;
  store: string;
  platform: string;
  status: string;
  updatedAt: string;
}

const columns: ColumnsType<RowItem> = [
  { title: '店铺', dataIndex: 'store' },
  { title: '平台', dataIndex: 'platform', width: 160 },
  { title: '授权状态', dataIndex: 'status', width: 140 },
  { title: '更新时间', dataIndex: 'updatedAt', width: 180 },
];

const data: RowItem[] = [
  { key: '1', store: '旗舰店', platform: '天猫', status: '已授权', updatedAt: '2024-12-02 13:00' },
  { key: '2', store: '跨境店', platform: '亚马逊', status: '待授权', updatedAt: '2024-12-03 08:45' },
];

const StoreAuthorization: React.FC = () => {
  return (
    <PageContainer>
      <Card>
        <Table<RowItem> columns={columns} dataSource={data} pagination={false} />
      </Card>
    </PageContainer>
  );
};

export default StoreAuthorization;
