import { PlusOutlined } from '@ant-design/icons';
import type {
  ActionType,
  ProColumns,
  ProDescriptionsItemProps,
} from '@ant-design/pro-components';
import {
  FooterToolbar,
  ModalForm,
  PageContainer,
  ProDescriptions,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Descriptions, Drawer, message, Space, Tag } from 'antd';
import React, { useRef, useState } from 'react';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import type { TableListItem, TableListPagination } from './data';
import { addRule, order, removeRule, updateRule } from './service';

/**
 * 添加节点
 *
 * @param fields
 */

const handleAdd = async (fields: TableListItem) => {
  const hide = message.loading('正在添加');

  try {
    await addRule({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (_error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};
/**
 * 更新节点
 *
 * @param fields
 */

const handleUpdate = async (
  fields: FormValueType,
  currentRow?: TableListItem,
) => {
  const hide = message.loading('正在配置');

  try {
    await updateRule({
      ...currentRow,
      ...fields,
    });
    hide();
    message.success('配置成功');
    return true;
  } catch (_error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};
/**
 * 删除节点
 *
 * @param selectedRows
 */

const handleRemove = async (selectedRows: TableListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;

  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (_error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList: React.FC = () => {
  /** 新建窗口的弹窗 */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /** 分布更新窗口的弹窗 */

  const [updateModalVisible, handleUpdateModalVisible] =
    useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>(null);
  const [currentRow, setCurrentRow] = useState<TableListItem>();
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);
  /** 国际化配置 */

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '出库状态',
      dataIndex: 'outboundStatus',
      valueEnum: {
        0: {
          color: 'grey',
          text: '未出库',
        },
        1: {
          color: 'green',
          text: '已出库',
        },
      },
      render: (_, record) =>
        record.outboundStatus === 1 ? (
          <Tag color="default" variant={'filled'}>
            已出库
          </Tag>
        ) : (
          <Tag color="#f50" variant={'filled'}>
            未出库
          </Tag>
        ),
    },
    {
      title: '平台代码',
      dataIndex: 'platformCode',
      width: 120,
      hideInTable: false,
      valueType: 'select',
      valueEnum: {
        amazon: { text: '亚马逊' },
        ebay: { text: 'eBay' },
        shopify: { text: 'Shopify' },
        other: { text: '其他' },
      },
      formItemProps: { label: '平台' },
    },
    {
      title: '销售平台单号',
      dataIndex: 'platformOrderNo',
      width: 160,
    },
    {
      title: '唛头/SO',
      dataIndex: 'batchNo',
      width: 140,
    },
    {
      title: '订单编号',
      dataIndex: 'orderNo',
      width: 140,
    },
    {
      title: 'SKU',
      dataIndex: 'sku',
      width: 140,
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      valueType: 'dateTime',
      sorter: true,
      search: true,
    },
    {
      title: '下单时间',
      dataIndex: 'orderDateRange',
      valueType: 'dateRange',
      hideInTable: true,
      search: {
        transform: (value: string[]) => ({
          orderStart: value?.[0],
          orderEnd: value?.[1],
        }),
      },
    },
    {
      title: '总价格',
      dataIndex: 'totalPrice',
      valueType: 'money',
      width: 120,
    },
    {
      title: '总数量',
      dataIndex: 'totalQuantity',
      sorter: true,
      width: 100,
    },
    {
      title: '订单状态',
      dataIndex: 'orderStatus',
      valueType: 'select',
      valueEnum: {
        all: { text: '不限', status: 'Default' },
        shipped: { text: '草稿', status: 'Default' },
        pending: { text: '已提交', status: 'Processing' },
        delivered: { text: '仓库已发货', status: 'Processing' },
        picked: { text: '快递已提取', status: 'Processing' },
        exception: { text: '已签收', status: 'Success' },
      },
      render: (text, record) => {
        const status = record.orderStatus || text;
        const { color, tagText, variant } = getOrderStatusConfig(status);

        return (
          <Tag color={color} variant={variant}>
            {tagText}
          </Tag>
        );
      },
    },
    {
      title: '快递单号',
      dataIndex: 'trackingNo',
      width: 160,
    },
    {
      title: '运输方式',
      dataIndex: 'shippingMethod',
      valueType: 'select',
      valueEnum: {
        air: { text: '空运' },
        sea: { text: '海运' },
        express: { text: '快递' },
        truck: { text: '卡车' },
      },
    },
    {
      title: '运输状态',
      dataIndex: 'shippingStatus',
      valueEnum: {
        preparing: { text: '待发货', status: 'Warning' },
        intransit: { text: '运输中', status: 'Processing' },
        delivered: { text: '已送达', status: 'Success' },
      },
    },
    {
      title: '面单上传',
      dataIndex: 'labelUploaded',
      valueType: 'select',
      valueEnum: {
        true: { text: '是', status: 'Success' },
        false: { text: '否', status: 'Default' },
      },
      render: (_, record) =>
        record.labelUploaded ? (
          <span style={{ color: '#155DFB' }}>是</span>
        ) : (
          <span>否</span>
        ),
    },
    {
      title: '拦截状态',
      dataIndex: 'interceptStatus',
      valueType: 'select',
      valueEnum: {
        none: { text: '正常', status: 'Default' },
        blocked: { text: '已拦截', status: 'Error' },
      },
    },
    {
      title: 'FBA ID',
      dataIndex: 'fbaId',
      width: 140,
    },
    {
      title: '多单号',
      dataIndex: 'multiOrder',
      hideInTable: true,
      valueType: 'switch',
      fieldProps: {
        checkedChildren: '是',
        unCheckedChildren: '否',
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="copy"
          onClick={() => {
            message.success('已复制订单');
          }}
        >
          复制订单
        </a>,
        <a
          key="detail"
          onClick={() => {
            setCurrentRow(record);
            setShowDetail(true);
          }}
        >
          查看详情
        </a>,
      ],
    },
  ];

  const channelList = [
    ['YWE', 'YW开头'],
    ['UPS', '1Z开头'],
    ['UNI渠道', 'UU / GV开头'],
    ['SpeedX', 'SPX开头'],
    ['HORIZON', 'HZ开头'],
    ['GOFO Express', 'GF开头'],
    ['FEDEX Economy', '61开头'],
    ['PIGGY', 'PG开头'],
    ['DHL Ecommerce', '926129开头'],
    ['FEDEX', '7 / 2 / 8开头，总共12位'],
    ['USPS', '923469 / 92144 / 920019开头'],
    ['Amazon shipping', 'TBA / 936128 / 933468开头'],
    ['ONTRAC', 'D开头'],
    ['SWIFT X', 'SWX开头'],
  ];

  return (
    <PageContainer
      header={{
        title: '仓储发货订单',
      }}
    >
      <Descriptions
        title="单号渠道说明"
        column={7}
        size="small"
        bordered
        style={{ marginBottom: 16 }}
      >
        {channelList.map(([label, desc]) => (
          <Descriptions.Item key={label} label={label}>
            {desc}
          </Descriptions.Item>
        ))}
      </Descriptions>
      <ProTable<TableListItem, TableListPagination>
        headerTitle="仓储发货订单"
        actionRef={actionRef}
        rowKey="key"
        // 搜索表单配置
        search={{
          labelWidth: 'auto',
          defaultCollapsed: false, // 默认展开所有搜索项
          collapsed: false,
          collapseRender: false,
          span: 4, // 每个表单项占用的栅格数（24栅格系统）
          className: 'custom-search-form',
        }}
        form={{
          layout: 'horizontal',
          // 配置表单 label 和 wrapper 的栅格比例
          labelCol: { span: 7 },
          wrapperCol: { span: 17 },
        }}
        toolBarRender={() => [
          <Space key="actions">
            <Button type="primary">
              <PlusOutlined /> 新增订单
            </Button>
            <Button>合并订单</Button>
            <Button>批量备注</Button>
            <Button>批量提交</Button>
            <Button>下载面单</Button>
            <Button>导入</Button>
            <Button>导出</Button>
            <Button>批量导入面单</Button>
            <Button>签收统计导出</Button>
          </Space>,
        ]}
        request={order}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              项 &nbsp;&nbsp;
              <span>
                服务调用次数总计{' '}
                {selectedRowsState.reduce(
                  (pre, item) => pre + (item.callNo ?? 0),
                  0,
                )}{' '}
                万
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
          <Button type="primary">批量审批</Button>
        </FooterToolbar>
      )}
      <ModalForm
        title="新建规则"
        width="400px"
        open={createModalVisible}
        onOpenChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value as TableListItem);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: '规则名称为必填项',
            },
          ]}
          width="md"
          name="name"
        />
        <ProFormTextArea width="md" name="desc" />
      </ModalForm>
      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value, currentRow);

          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);

            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          setCurrentRow(undefined);
        }}
        updateModalVisible={updateModalVisible}
        values={currentRow || {}}
      />

      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<TableListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<TableListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

interface OrderStatusConfig {
  color: string;
  tagText: string;
  variant?: 'outlined' | 'filled' | 'solid';
}

const getOrderStatusConfig = (status: React.ReactNode): OrderStatusConfig => {
  const configMap: Record<string, OrderStatusConfig> = {
    // 草稿状态
    shipped: {
      color: 'rgba(0,0,0,0.88)',
      tagText: '草稿',
      variant: 'filled',
    },
    // 已提交状态
    pending: {
      color: '#108ee9',
      tagText: '已提交',
      variant: 'filled',
    },
    // 仓库已发货
    delivered: {
      color: '#2db7f5',
      tagText: '仓库已发货',
      variant: 'solid',
    },
    // 快递已提取
    picked: {
      color: '#108ee9',
      tagText: '快递已提取',
      variant: 'solid',
    },
    // 已签收
    exception: {
      color: '#87d068',
      tagText: '已签收',
      variant: 'solid',
    },
  };

  const key = String(status ?? '').trim();
  return configMap[key] || configMap.default;
};

export default TableList;
