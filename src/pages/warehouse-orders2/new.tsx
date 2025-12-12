import {
  InboxOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import {
  Button,
  Card,
  Col,
  ConfigProvider,
  Form,
  Input,
  InputNumber,
  message,
  Radio,
  Row,
  Select,
  Space,
  Switch,
  Upload,
} from 'antd';
import type { UploadFile } from 'antd/es/upload';
import React from 'react';
import { submitWarehouseOrder } from './service';

type ProductItem = {
  name?: string;
  quantity?: number;
  unitPrice?: number;
};

type OrderFormValues = {
  platformCode?: string;
  platformOrderNo?: string;
  storeNo?: string;
  totalPrice?: number;
  currency?: string;
  dispatchType?: string;
  signatureService?: string;
  shippingMethod?: string;
  labelType?: string;
  trackingNos?: string;
  businessType?: string;
  specialInstruction?: string;
  operationInstruction?: string;
  recipientName?: string;
  recipientLastName?: string;
  companyName?: string;
  countryCode?: string;
  city?: string;
  postalCode?: string;
  address1?: string;
  address2?: string;
  state?: string;
  houseNumber?: string;
  phone?: string;
  email?: string;
  products?: ProductItem[];
  attachments?: UploadFile[];
};

const { TextArea } = Input;
const { Option } = Select;

const WarehouseOrderCreate: React.FC = () => {
  const [form] = Form.useForm<OrderFormValues>();

  const handleSubmit = async (values: OrderFormValues) => {
    const hide = message.loading('提交中...');
    const payload = {
      ...values,
      trackingNumbers:
        values.trackingNos
          ?.split('\n')
          .map((item) => item.trim())
          .filter(Boolean) || [],
      attachments: values.attachments || [],
    };

    try {
      await submitWarehouseOrder(payload);
      message.success('订单提交成功');
      form.resetFields();
    } catch (error) {
      console.error(error);
      message.error('提交失败，请稍后重试');
    } finally {
      hide();
    }
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <ConfigProvider componentSize="large">
      <PageContainer header={{ title: '' }}>
        <Card>
          <Form<OrderFormValues>
            form={form}
            layout="horizontal"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{
              platformCode: 'amazon',
              dispatchType: 'one-piece',
              signatureService: 'required',
              shippingMethod: 'express',
              labelType: 'together',
              businessType: 'private',
              currency: 'USD',
              products: [
                { name: undefined, quantity: 1, unitPrice: undefined },
              ],
            }}
            onFinish={handleSubmit}
          >
            <Card title="订单基本信息">
              <Row gutter={[8, 0]}>
                <Col xs={24} sm={24} xl={6}>
                  <Form.Item label="平台代码" name="platformCode">
                    <Select placeholder="请选择平台代码">
                      <Option value="amazon">亚马逊</Option>
                      <Option value="ebay">eBay</Option>
                      <Option value="shopify">Shopify</Option>
                      <Option value="other">其他</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} xl={6}>
                  <Form.Item
                    label="销售平台单号"
                    name="platformOrderNo"
                    rules={[{ required: true, message: '请输入销售平台单号' }]}
                  >
                    <Input placeholder="请输入销售平台单号" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} xl={6}>
                  <Form.Item
                    label="店铺号"
                    name="storeNo"
                    rules={[{ required: true, message: '请输入店铺号' }]}
                  >
                    <Input placeholder="请输入店铺号" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} xl={6}>
                  <Form.Item label="总价格" name="Price">
                    <Space>
                      <Form.Item noStyle name="currency">
                        <Select placeholder="请选择币种" disabled>
                          <Option value="USD">USD</Option>
                          <Option value="CNY">CNY</Option>
                          <Option value="EUR">EUR</Option>
                          <Option value="GBP">GBP</Option>
                        </Select>
                      </Form.Item>
                      <Form.Item noStyle name="totalPrice">
                        <InputNumber
                          disabled
                          style={{ width: '100%' }}
                          min={0}
                          placeholder=""
                        />
                      </Form.Item>
                    </Space>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} xl={6}>
                  <Form.Item label="运输方式" name="shippingMethod">
                    <Select placeholder="请选择运输方式">
                      <Option value="express">快递</Option>
                      <Option value="air">空运</Option>
                      <Option value="sea">海运</Option>
                      <Option value="truck">卡车</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} xl={6}>
                  <Form.Item label="快递面单" name="labelType">
                    <Radio.Group>
                      <Radio value="together">壹起拼订单</Radio>
                      <Radio value="customer">客户提供</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} xl={6}>
                  <Form.Item label="业务类型" name="businessType">
                    <Radio.Group>
                      <Radio value="private">私信地址</Radio>
                      <Radio value="overseas">海外仓库</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} xl={6}>
                  <Form.Item label="签名服务" name="signatureService">
                    <Switch
                      checkedChildren="需要"
                      unCheckedChildren="不需要"
                      defaultChecked
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} xl={6}>
                  <Form.Item label="快递单号" name="trackingNos">
                    <TextArea rows={2} placeholder="多个单号请每行填写一个" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} xl={6}>
                  <Form.Item label="特殊说明" name="specialInstruction">
                    <TextArea
                      rows={2}
                      placeholder="请输入特殊说明或特殊分货要求"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} xl={6}>
                  <Form.Item label="操作指令要求" name="operationInstruction">
                    <TextArea rows={2} placeholder="请输入操作指令要求" />
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            <Card title="收件人信息" style={{ marginTop: 16 }}>
              <Row gutter={[8, 0]}>
                <Col xs={24} sm={12} lg={6}>
                  <Form.Item
                    label="收件人名称"
                    name="recipientName"
                    rules={[{ required: true, message: '请输入收件人名称' }]}
                  >
                    <Input placeholder="请输入收件人名称" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                  <Form.Item label="Lastname" name="recipientLastName">
                    <Input placeholder="请输入 Lastname" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                  <Form.Item label="公司名称" name="companyName">
                    <Input placeholder="请输入公司名称" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                  <Form.Item
                    label="国家二字码"
                    name="countryCode"
                    rules={[{ required: true, message: '请输入国家二字码' }]}
                  >
                    <Input placeholder="例如 US、CN" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                  <Form.Item label="州/省" name="state">
                    <Input placeholder="请输入州或省" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                  <Form.Item label="城市名称" name="city">
                    <Input placeholder="请输入城市名称" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                  <Form.Item
                    label="地址第一行"
                    name="address1"
                    rules={[{ required: true, message: '请输入地址第一行' }]}
                  >
                    <Input placeholder="请输入地址第一行" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                  <Form.Item label="地址第二行" name="address2">
                    <Input placeholder="请输入地址第二行" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} lg={6}>
                  <Form.Item label="门牌号" name="houseNumber">
                    <Input placeholder="请输入门牌号" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                  <Form.Item label="邮编" name="postalCode">
                    <Input placeholder="请输入邮编" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                  <Form.Item label="电话" name="phone">
                    <Input placeholder="请输入电话" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                  <Form.Item label="邮箱" name="email">
                    <Input placeholder="请输入邮箱" type="email" />
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            <Card title="产品信息" style={{ marginTop: 16 }}>
              <Form.List name="products">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space
                        key={key}
                        align="baseline"
                        style={{ display: 'flex', marginBottom: 12, gap: 24 }}
                      >
                        <Form.Item
                          {...restField}
                          label="产品名称"
                          name={[name, 'name']}
                          rules={[
                            { required: true, message: '请输入产品名称' },
                          ]}
                        >
                          <Input
                            placeholder="请输入产品名称"
                            style={{ width: 200 }}
                          />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          label="数量"
                          name={[name, 'quantity']}
                          rules={[{ required: true, message: '请输入数量' }]}
                        >
                          <InputNumber min={1} style={{ width: 120 }} />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          label="单价"
                          name={[name, 'unitPrice']}
                        >
                          <InputNumber
                            min={0}
                            style={{ width: 160 }}
                            placeholder="请输入单价"
                          />
                        </Form.Item>
                        {fields.length > 1 && (
                          <Button
                            danger
                            type="text"
                            onClick={() => remove(name)}
                            icon={<MinusCircleOutlined />}
                          >
                            删除
                          </Button>
                        )}
                      </Space>
                    ))}
                    <Button
                      type="dashed"
                      block
                      icon={<PlusOutlined />}
                      onClick={() => add()}
                    >
                      新增产品
                    </Button>
                  </>
                )}
              </Form.List>
            </Card>

            <Card title="附件上传" style={{ marginTop: 16 }}>
              <Row gutter={[24, 0]}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="BOL文件"
                    name="bolFiles"
                    valuePropName="fileList"
                    layout="vertical"
                    wrapperCol={{ span: 24 }}
                  >
                    <Upload.Dragger
                      name="bol"
                      beforeUpload={() => false}
                      multiple
                    >
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">
                        点击或拖拽BOL文件到此处上传
                      </p>
                      {/* <p className="ant-upload-hint">支持上传发票、合同等文件</p> */}
                    </Upload.Dragger>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="DO文件"
                    name="doFiles"
                    valuePropName="fileList"
                    layout="vertical"
                    wrapperCol={{ span: 24 }}
                  >
                    <Upload.Dragger
                      name="do"
                      beforeUpload={() => false}
                      multiple
                    >
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">
                        点击或拖拽DO文件到此处上传
                      </p>
                    </Upload.Dragger>
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            <div
              style={{
                padding: '12px 0',
                marginTop: 16,
                display: 'flex',
                justifyContent: 'center',
                gap: 16,
              }}
            >
              <Button
                htmlType="button"
                onClick={() => {
                  form.resetFields();
                }}
              >
                重 置
              </Button>
              <Button type="primary" htmlType="submit">
                提 交
              </Button>
            </div>
          </Form>
        </Card>
      </PageContainer>
    </ConfigProvider>
  );
};

export default WarehouseOrderCreate;
