import { PageContainer } from '@ant-design/pro-components';
import {
  Button,
  Card,
  Form,
  Input,
  Select,
  Space,
  Table,
  Tabs,
  Tag,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useMemo, useState } from 'react';
import { mockData, type RowItem } from './_mock';

const columns: ColumnsType<RowItem> = [
  { title: '订单号', dataIndex: 'orderNo', width: 160, key: 'orderNo' },
  { title: '业务类型', dataIndex: 'businessType', key: 'businessType' },
  { title: '处理类型', dataIndex: 'handlingType', key: 'handlingType' },
  {
    title: '运输方式',
    dataIndex: 'transport',
    key: 'transport',
    render: (text: RowItem['transport']) => <Tag>{text}</Tag>,
  },
  {
    title: '是否入库',
    dataIndex: 'isStored',
    key: 'isStored',
    render: (text: boolean) =>
      text ? <Tag color="green">是</Tag> : <Tag color="orange">否</Tag>,
    width: 100,
  },
  { title: '制单时间', dataIndex: 'createdAt', key: 'createdAt', width: 160 },
  {
    title: '收货状态',
    dataIndex: 'receiveStatus',
    key: 'receiveStatus',
    render: (text: RowItem['receiveStatus']) => <Tag>{text}</Tag>,
  },
  { title: '目的仓库', dataIndex: 'destWarehouse', key: 'destWarehouse' },
  {
    title: '入库状态',
    dataIndex: 'storageStatus',
    key: 'storageStatus',
    render: (text: RowItem['storageStatus']) => <Tag>{text}</Tag>,
  },
  {
    title: '完结状态',
    dataIndex: 'finishedStatus',
    key: 'finishedStatus',
    render: (text: RowItem['finishedStatus']) => <Tag>{text}</Tag>,
  },
  {
    title: '产品总数量',
    dataIndex: 'productTotalQuantity',
    key: 'productTotalQuantity',
    width: 120,
  },
  { title: '唛头', dataIndex: 'mark', key: 'mark' },
  {
    title: '操作',
    key: 'action',
    render: (_, record) => (
      <Space>
        <a>查看详情</a>
      </Space>
    ),
    width: 100,
  },
];

const OnePieceDelivery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'in' | 'out' | 'recycle'>(
    'all',
  ); // 默认选中所有订单
  const [dataSource] = useState<RowItem[]>(mockData);
  const [filters, setFilters] = useState<{
    orderNo?: string;
    handlingType?: string;
  }>({});
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [form] = Form.useForm();

  // compute counts for tabs
  const counts = useMemo(() => {
    const total = dataSource.length;
    const inCount = dataSource.filter((d) => d.isStored).length;
    const outCount = dataSource.filter((d) => !d.isStored).length;
    const recycleCount = 0;
    return { total, inCount, outCount, recycleCount };
  }, [dataSource]);

  // filteredData depends on activeTab and filters
  const filteredData = useMemo(() => {
    return dataSource.filter((d) => {
      // tab filter
      if (activeTab === 'in' && !d.isStored) return false;
      if (activeTab === 'out' && d.isStored) return false;
      if (activeTab === 'recycle') return false; // mock recycle empty
      // filters
      if (filters.orderNo && !d.orderNo.includes(filters.orderNo)) return false;
      if (filters.handlingType && d.handlingType !== filters.handlingType)
        return false;
      return true;
    });
  }, [dataSource, activeTab, filters]);

  // default select all visible rows when filteredData or activeTab changes
  // useEffect(() => {
  //   setSelectedRowKeys(filteredData.map((d) => d.key));
  // }, [activeTab, filters, filteredData]);

  const onTabChange = (key: string) => {
    setActiveTab(key as any);
    // clear form filters when switching tab? keep current filters but selection updates automatically
  };

  const onSearch = () => {
    const values = form.getFieldsValue();
    setFilters({
      orderNo: values.orderNo || undefined,
      handlingType: values.handlingType || undefined,
    });
  };

  const onReset = () => {
    form.resetFields();
    setFilters({});
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: React.Key[]) => setSelectedRowKeys(keys),
  };

  return (
    <PageContainer>
      <Card>
        <Tabs activeKey={activeTab} onChange={onTabChange}>
          <Tabs.TabPane tab={`所有订单（${counts.total}）`} key="all" />
          <Tabs.TabPane tab={`已入库（${counts.inCount}）`} key="in" />
          <Tabs.TabPane tab={`未入库（${counts.outCount}）`} key="out" />
          <Tabs.TabPane
            tab={`回收站（${counts.recycleCount}）`}
            key="recycle"
          />
        </Tabs>

        <Card style={{ marginTop: 12 }}>
          <Form form={form} layout="inline">
            <Form.Item name="orderNo" label="订单号">
              <Input placeholder="输入订单号" allowClear />
            </Form.Item>
            <Form.Item name="handlingType" label="处理类型">
              <Select
                style={{ width: 180 }}
                placeholder="请选择处理类型"
                allowClear
              >
                <Select.Option value="退换标">退换标</Select.Option>
                <Select.Option value="仓储转运">仓储转运</Select.Option>
                <Select.Option value="一件代发">一件代发</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Space>
                <Button type="primary" onClick={onSearch}>
                  查询
                </Button>
                <Button onClick={onReset}>重置</Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>

        <Card style={{ marginTop: 12 }}>
          <Table<RowItem>
            columns={columns}
            dataSource={filteredData}
            rowSelection={rowSelection}
            pagination={{ pageSize: 10, showSizeChanger: false }}
            rowKey="key"
          />
        </Card>
      </Card>
    </PageContainer>
  );
};

export default OnePieceDelivery;
