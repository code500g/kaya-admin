import {
  PageContainer,
  type ProColumns,
  ProTable,
} from '@ant-design/pro-components';
import {
  Button,
  Card,
  ConfigProvider,
  Form,
  Input,
  Select,
  Space,
  Tabs,
  type TabsProps,
  Tag,
} from 'antd';
import React, { useRef, useState } from 'react';
import type { RowItem } from './_mock';
import { mockData } from './_mock';

const { Search } = Input;
const OnePieceDelivery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'in' | 'out' | 'recycle'>(
    'all',
  );
  const [filters, setFilters] = useState<{
    orderNo?: string;
    handlingType?: string;
  }>({});
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [form] = Form.useForm();
  const [tabCounts, setTabCounts] = useState({
    all: 0,
    in: 0,
    out: 0,
    recycle: 0,
  });

  const actionRef = useRef<any>(null);

  const columns: ProColumns<RowItem>[] = [
    { title: '订单号', dataIndex: 'orderNo', width: 160, key: 'orderNo' },
    { title: '业务类型', dataIndex: 'businessType', key: 'businessType' },
    { title: '处理类型', dataIndex: 'handlingType', key: 'handlingType' },
    {
      title: '运输方式',
      dataIndex: 'transport',
      key: 'transport',
      render: (text) => <Tag>{text as RowItem['transport']}</Tag>,
    },
    {
      title: '是否入库',
      dataIndex: 'isStored',
      key: 'isStored',
      render: (text) =>
        (text as boolean) ? (
          <Tag color="green">是</Tag>
        ) : (
          <Tag color="orange">否</Tag>
        ),
      width: 100,
    },
    { title: '制单时间', dataIndex: 'createdAt', key: 'createdAt', width: 160 },
    {
      title: '收货状态',
      dataIndex: 'receiveStatus',
      key: 'receiveStatus',
      render: (text) => <Tag>{text as RowItem['receiveStatus']}</Tag>,
    },
    { title: '目的仓库', dataIndex: 'destWarehouse', key: 'destWarehouse' },
    {
      title: '入库状态',
      dataIndex: 'storageStatus',
      key: 'storageStatus',
      render: (text) => {
        const status = text as number;
        if (status === 1) return <Tag color="green">已入库</Tag>;
        if (status === 2) return <Tag color="orange">未入库</Tag>;
        if (status === 3) return <Tag color="red">回收站</Tag>;
        return <Tag>未知</Tag>;
      },
    },
    {
      title: '完结状态',
      dataIndex: 'finishedStatus',
      key: 'finishedStatus',
      render: (text) => <Tag>{text as RowItem['finishedStatus']}</Tag>,
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

  const onTabChange = (key: string) => {
    setActiveTab(key as any);
    setFilters({});
    form.resetFields();
    actionRef.current?.reload();
  };

  const onSearch = () => {
    const values = form.getFieldsValue();
    setFilters({
      orderNo: values.orderNo || undefined,
      handlingType: values.handlingType || undefined,
    });
    actionRef.current?.reload();
  };

  const onReset = () => {
    form.resetFields();
    setFilters({});
    actionRef.current?.reload();
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: React.Key[]) => setSelectedRowKeys(keys),
  };

  const tabItems: TabsProps['items'] = [
    {
      key: 'all',
      label: (
        <span>
          所有订单
          <span className="tab-count">（{tabCounts.all}）</span>
        </span>
      ),
    },
    {
      key: 'in',
      label: (
        <span>
          已入库
          <span className="tab-count"> （{tabCounts.in}）</span>
        </span>
      ),
    },
    {
      key: 'out',
      label: (
        <span>
          未入库
          <span className="tab-count"> （{tabCounts.out}）</span>
        </span>
      ),
    },
    {
      key: 'recycle',
      label: (
        <span>
          回收站
          <span className="tab-count"> （{tabCounts.recycle}）</span>
        </span>
      ),
    },
  ];

  // 模拟请求函数
  const mockRequest = async (params: any) => {
    // 模拟网络延迟
    await new Promise((resolve) => setTimeout(resolve, 300));

    // 应用筛选条件
    let filteredData = [...mockData];

    // 根据 storageStatus 数字筛选
    if (params.storageStatus) {
      filteredData = filteredData.filter(
        (item) => item.storageStatus === params.storageStatus,
      );
    }

    // 根据表单筛选条件
    if (params.orderNo) {
      filteredData = filteredData.filter((item) =>
        item.orderNo.toLowerCase().includes(params.orderNo.toLowerCase()),
      );
    }

    if (params.handlingType) {
      filteredData = filteredData.filter(
        (item) => item.handlingType === params.handlingType,
      );
    }

    // 计算各 tab 的数量
    const allCount = mockData.length;
    const inCount = mockData.filter((item) => item.storageStatus === 1).length;
    const outCount = mockData.filter((item) => item.storageStatus === 2).length;
    const recycleCount = mockData.filter(
      (item) => item.storageStatus === 3,
    ).length;

    // 设置 tab 计数
    setTabCounts({
      all: allCount,
      in: inCount,
      out: outCount,
      recycle: recycleCount,
    });

    // 分页处理
    const { current = 1, pageSize = 10 } = params;
    const start = (current - 1) * pageSize;
    const end = start + pageSize;
    const paginatedData = filteredData.slice(start, end);

    return {
      data: paginatedData,
      total: filteredData.length,
      success: true,
    };
  };

  return (
    <ConfigProvider componentSize="large">
      <PageContainer
        header={{
          title: '',
        }}
      >
        <Card>
          <Tabs activeKey={activeTab} items={tabItems} onChange={onTabChange} />

          <Form form={form} layout="inline">
            <Form.Item name="orderNo">
              <Space.Compact>
                <Search placeholder="订单号" allowClear />
              </Space.Compact>
            </Form.Item>

            <Form.Item name="handlingType">
              <Select placeholder="处理类型" allowClear>
                <Select.Option value="不限">不限</Select.Option>
                <Select.Option value="退换标">退换标</Select.Option>
                <Select.Option value="仓储转运">仓储转运</Select.Option>
                <Select.Option value="一件代发">一件代发</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Space>
                <Button onClick={onReset}>重置</Button>
              </Space>
            </Form.Item>
          </Form>

          <ProTable<RowItem>
            actionRef={actionRef}
            columns={columns}
            // rowSelection={rowSelection}
            pagination={{ pageSize: 10, showSizeChanger: false }}
            rowKey="key"
            className="protable-toolbar-justify"
            search={false}
            // options={false}
            toolBarRender={() => [
              <Space key="actions">
                <Button type="primary">新建</Button>
              </Space>,
            ]}
            request={async (params, sorter, filter) => {
              const requestParams = {
                ...params,
                ...sorter,
                ...filter,
                ...filters,
                // 根据 activeTab 设置 storageStatus 数字值
                storageStatus:
                  activeTab === 'in'
                    ? 1
                    : activeTab === 'out'
                      ? 2
                      : activeTab === 'recycle'
                        ? 3
                        : undefined,
              };

              return mockRequest(requestParams);
            }}
            params={{
              ...filters,
              // 根据 activeTab 设置 storageStatus 数字值
              storageStatus:
                activeTab === 'in'
                  ? 1
                  : activeTab === 'out'
                    ? 2
                    : activeTab === 'recycle'
                      ? 3
                      : undefined,
            }}
          />
        </Card>
      </PageContainer>
    </ConfigProvider>
  );
};

export default OnePieceDelivery;
