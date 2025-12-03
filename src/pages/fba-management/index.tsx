import { InboxOutlined } from "@ant-design/icons";
import { PageContainer } from "@ant-design/pro-components";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Table,
  Upload,
  message,
} from "antd";
import React from "react";

const { Option } = Select;

const FbaManagement: React.FC = () => {
  const [form] = Form.useForm();
  const [planData, setPlanData] = React.useState<
    {
      key: number;
      code: number;
      mark: string;
      shipmentId: number;
      refId: number;
      qty?: number;
      weight?: number;
      volume?: number;
      warehouseCode: string;
      deliveryMethod: string;
      remark: string;
    }[]
  >([
    {
      key: Date.now(),
      code: 1,
      mark: "",
      shipmentId: 0,
      refId: 0,
      qty: undefined,
      weight: undefined,
      volume: undefined,
      warehouseCode: "",
      deliveryMethod: "",
      remark: "",
    },
  ]);

  const addPlanRow = () => {
    const newKey = Date.now();
    setPlanData((prev) => [
      ...prev,
      {
        key: newKey,
        code: prev.length + 1,
        mark: "",
        shipmentId: 0,
        refId: 0,
        qty: undefined,
        weight: undefined,
        volume: undefined,
        warehouseCode: "",
        deliveryMethod: "",
        remark: "",
      },
    ]);
  };

  const removePlanRow = (key: number) => {
    setPlanData((prev) => prev.filter((item) => item.key !== key));
  };

  const onFinish = (values: any) => {
    // 简单演示，实际可接入接口
    console.log("提交数据: ", { ...values, plan: planData });
    message.success("提交成功");
  };

  return (
    <PageContainer header={{ title: "新增订单" }}>
      <Card>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            orderType: "standard",
            clearance: "normal",
          }}
        >
          <Row gutter={[24, 12]}>
            <Col xs={24} sm={12} lg={6}>
              <Form.Item label="订单类型" name="orderType">
                <Select>
                  <Option value="standard">标准</Option>
                  <Option value="expedited">加急</Option>
                  <Option value="returns">退货</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Form.Item
                label="委托日期"
                name="entrustDate"
                rules={[{ required: true, message: "请选择委托日期" }]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Form.Item
                label="FBA仓库"
                name="fbaWarehouse"
                rules={[{ required: true, message: "请输入FBA仓库" }]}
              >
                <Input placeholder="请输入FBA仓库" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Form.Item
                label="发往国家"
                name="destinationCountry"
                rules={[{ required: true, message: "请输入发往国家" }]}
              >
                <Input placeholder="请输入发往国家" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Form.Item label="柜型" name="cabinetType">
                <Select placeholder="请选择柜型">
                  <Option value="20GP">20GP</Option>
                  <Option value="40GP">40GP</Option>
                  <Option value="40HQ">40HQ</Option>
                  <Option value="45HQ">45HQ</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Form.Item label="清关方式" name="clearance">
                <Select>
                  <Option value="normal">一般清关</Option>
                  <Option value="express">快件清关</Option>
                  <Option value="ddu">DDU</Option>
                  <Option value="ddp">DDP</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <Form.Item label="目的地" name="destination">
                <Input placeholder="请输入目的地" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Form.Item label="出口报关行" name="exportBroker">
                <Input placeholder="请输入出口报关行" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Form.Item label="目的港清关代理" name="destBroker">
                <Input placeholder="请输入目的港清关代理" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Form.Item label="BOND" name="bond">
                <Input placeholder="请输入 BOND" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Form.Item label="ETA" name="eta">
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Form.Item label="ETD" name="etd">
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <Form.Item label="专线" name="dedicatedLine">
                <Input placeholder="请输入专线" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Form.Item label="航名/航次" name="voyage">
                <Input placeholder="请输入航名/航次" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Form.Item label="封条号" name="sealNumber">
                <Input placeholder="请输入封条号" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Form.Item label="航空公司" name="airline">
                <Input placeholder="请输入航空公司" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <Form.Item label="航空单号" name="airwayBillNo">
                <Input placeholder="请输入航空单号" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Form.Item label="提单号" name="billNo">
                <Input placeholder="请输入提单号" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Form.Item label="SO" name="so">
                <Input placeholder="请输入 SO" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[24, 12]}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="BOL文件"
                name="bolFiles"
                valuePropName="fileList"
              >
                <Upload.Dragger name="bol" beforeUpload={() => false}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">点击或拖拽文件到此处上传</p>
                </Upload.Dragger>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="DO文件" name="doFiles" valuePropName="fileList">
                <Upload.Dragger name="do" beforeUpload={() => false}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">点击或拖拽文件到此处上传</p>
                </Upload.Dragger>
              </Form.Item>
            </Col>
          </Row>

          <Space style={{ marginBottom: 12 }}>
            <Button
              color="default"
              variant="solid"
              size="large"
              onClick={addPlanRow}
            >
              添加派送计划
            </Button>
          </Space>
          <Table
            rowKey="key"
            dataSource={planData}
            pagination={false}
            columns={[
              { title: "编号", dataIndex: "code", width: 80 },
              {
                title: "唛头/SO",
                dataIndex: "mark",
                render: (_, record, idx) => (
                  <Input
                    value={record.mark}
                    onChange={(e) => {
                      const val = e.target.value;
                      setPlanData((prev) =>
                        prev.map((item, i) =>
                          i === idx ? { ...item, mark: val } : item
                        )
                      );
                    }}
                  />
                ),
              },
              {
                title: "ShipementID",
                dataIndex: "shipmentId",
                width: 110,
                render: (_, record, idx) => (
                  <InputNumber
                    style={{ width: "100%" }}
                    value={record.shipmentId}
                    onChange={(val) => {
                      setPlanData((prev) =>
                        prev.map((item, i) =>
                          i === idx ? { ...item, shipmentId: val || 0 } : item
                        )
                      );
                    }}
                  />
                ),
              },
              {
                title: "Ref ID",
                dataIndex: "refId",
                width: 110,
                render: (_, record, idx) => (
                  <InputNumber
                    style={{ width: "100%" }}
                    value={record.refId}
                    onChange={(val) => {
                      setPlanData((prev) =>
                        prev.map((item, i) =>
                          i === idx ? { ...item, refId: val || 0 } : item
                        )
                      );
                    }}
                  />
                ),
              },
              {
                title: "Qty",
                dataIndex: "qty",
                width: 110,
                render: (_, record, idx) => (
                  <InputNumber
                    style={{ width: "100%" }}
                    value={record.qty}
                    onChange={(val) => {
                      setPlanData((prev) =>
                        prev.map((item, i) =>
                          i === idx ? { ...item, qty: val || undefined } : item
                        )
                      );
                    }}
                  />
                ),
              },
              {
                title: "重量",
                dataIndex: "weight",
                width: 110,
                render: (_, record, idx) => (
                  <InputNumber
                    style={{ width: "100%" }}
                    value={record.weight}
                    onChange={(val) => {
                      setPlanData((prev) =>
                        prev.map((item, i) =>
                          i === idx
                            ? { ...item, weight: val || undefined }
                            : item
                        )
                      );
                    }}
                  />
                ),
              },
              {
                title: "方数",
                dataIndex: "volume",
                width: 110,
                render: (_, record, idx) => (
                  <InputNumber
                    style={{ width: "100%" }}
                    value={record.volume}
                    onChange={(val) => {
                      setPlanData((prev) =>
                        prev.map((item, i) =>
                          i === idx
                            ? { ...item, volume: val || undefined }
                            : item
                        )
                      );
                    }}
                  />
                ),
              },
              {
                title: "仓库代码",
                dataIndex: "warehouseCode",
                render: (_, record, idx) => (
                  <Input
                    value={record.warehouseCode}
                    onChange={(e) => {
                      const val = e.target.value;
                      setPlanData((prev) =>
                        prev.map((item, i) =>
                          i === idx ? { ...item, warehouseCode: val } : item
                        )
                      );
                    }}
                  />
                ),
              },
              {
                title: "派送方式",
                dataIndex: "deliveryMethod",
                render: (_, record, idx) => (
                  <Input
                    value={record.deliveryMethod}
                    onChange={(e) => {
                      const val = e.target.value;
                      setPlanData((prev) =>
                        prev.map((item, i) =>
                          i === idx ? { ...item, deliveryMethod: val } : item
                        )
                      );
                    }}
                  />
                ),
              },
              {
                title: "备注",
                dataIndex: "remark",
                render: (_, record, idx) => (
                  <Input
                    value={record.remark}
                    onChange={(e) => {
                      const val = e.target.value;
                      setPlanData((prev) =>
                        prev.map((item, i) =>
                          i === idx ? { ...item, remark: val } : item
                        )
                      );
                    }}
                  />
                ),
              },
              {
                title: "操作",
                dataIndex: "action",
                width: 100,
                render: (_, record) => (
                  <Button
                    danger
                    type="link"
                    onClick={() => removePlanRow(record.key)}
                  >
                    删除
                  </Button>
                ),
              },
            ]}
            style={{ marginBottom: 16 }}
            scroll={{ x: 1200 }}
          />

          <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
            <Button type="primary" size="large" htmlType="submit">
              提交数据
            </Button>
            <Button size="large" onClick={() => form.resetFields()}>
              返回列表
            </Button>
          </div>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default FbaManagement;
