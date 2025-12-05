import { parse } from 'node:url';
import type { Request, Response } from 'express';
import type { TableListItem, TableListParams } from './data.d';

// mock tableListDataSource - 10 rows of realistic warehouse orders
let tableListDataSource: TableListItem[] = [
  {
    key: 1,
    href: 'https://ant.design',
    avatar:
      'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
    name: '订单 1',
    owner: '仓库A',
    desc: 'FBA补货',
    callNo: 123,
    status: '0',
    updatedAt: new Date(),
    createdAt: new Date(),
    progress: 80,
    platformCode: 'amazon',
    platformOrderNo: 'AMZ-10001',
    batchNo: 'BATCH-001',
    orderNo: 'ORD-0001',
    sku: 'SKU-001',
    totalPrice: 199.99,
    totalQuantity: 3,
    trackingNo: '1Z999AA10123456784',
    shippingMethod: 'air',
    shippingStatus: 'preparing',
    outboundStatus: 0,
    orderStatus: 'delivered',
    labelUploaded: true,
    interceptStatus: 'none',
    fbaId: 'FBA12345',
    multiOrder: false,
  },
  {
    key: 2,
    href: 'https://ant.design',
    avatar:
      'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
    name: '订单 2',
    owner: '仓库B',
    desc: '直邮',
    callNo: 45,
    status: '1',
    updatedAt: new Date(),
    createdAt: new Date(),
    progress: 50,
    platformCode: 'ebay',
    platformOrderNo: 'EB-20002',
    batchNo: 'BATCH-002',
    orderNo: 'ORD-0002',
    sku: 'SKU-002',
    totalPrice: 89.5,
    totalQuantity: 1,
    trackingNo: 'TBA1234567890',
    shippingMethod: 'express',
    shippingStatus: 'preparing',
    outboundStatus: 1,
    orderStatus: 'shipped',
    labelUploaded: false,
    interceptStatus: 'blocked',
    fbaId: 'FBA22345',
    multiOrder: true,
  },
  {
    key: 3,
    href: 'https://ant.design',
    avatar:
      'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
    name: '订单 3',
    owner: '仓库C',
    desc: 'FBA补货',
    callNo: 300,
    status: '2',
    updatedAt: new Date(),
    createdAt: new Date(),
    progress: 30,
    platformCode: 'shopify',
    platformOrderNo: 'SHOP-30003',
    batchNo: 'BATCH-003',
    orderNo: 'ORD-0003',
    sku: 'SKU-003',
    totalPrice: 49.99,
    totalQuantity: 5,
    trackingNo: 'SWX000123456',
    shippingMethod: 'sea',
    shippingStatus: 'preparing',
    outboundStatus: 1,
    orderStatus: 'pending',
    labelUploaded: true,
    interceptStatus: 'none',
    fbaId: 'FBA32345',
    multiOrder: false,
  },
  {
    key: 4,
    href: 'https://ant.design',
    avatar:
      'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
    name: '订单 4',
    owner: '仓库D',
    desc: '自有仓发货',
    callNo: 78,
    status: '0',
    updatedAt: new Date(),
    createdAt: new Date(),
    progress: 60,
    platformCode: 'amazon',
    platformOrderNo: 'AMZ-10004',
    batchNo: 'BATCH-004',
    orderNo: 'ORD-0004',
    sku: 'SKU-004',
    totalPrice: 120.0,
    totalQuantity: 2,
    orderStatus: 'shipped',
    trackingNo: '92612999998887776666',
    shippingMethod: 'air',
    shippingStatus: 'intransit',
    outboundStatus: 1,
    labelUploaded: true,
    interceptStatus: 'none',
    fbaId: 'FBA42345',
    multiOrder: false,
  },
  {
    key: 5,
    href: 'https://ant.design',
    avatar:
      'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
    name: '订单 5',
    owner: '仓库E',
    desc: 'FBA补货',
    callNo: 12,
    status: '1',
    updatedAt: new Date(),
    createdAt: new Date(),
    progress: 90,
    platformCode: 'ebay',
    platformOrderNo: 'EB-20005',
    batchNo: 'BATCH-005',
    orderNo: 'ORD-0005',
    sku: 'SKU-005',
    totalPrice: 15.99,
    totalQuantity: 10,
    trackingNo: 'GF123456789',
    shippingMethod: 'express',
    shippingStatus: 'delivered',
    outboundStatus: 0,
    orderStatus: 'picked',
    labelUploaded: false,
    interceptStatus: 'none',
    fbaId: 'FBA52345',
    multiOrder: true,
  },
  {
    key: 6,
    href: 'https://ant.design',
    avatar:
      'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
    name: '订单 6',
    owner: '仓库F',
    desc: '直邮',
    callNo: 240,
    status: '2',
    updatedAt: new Date(),
    createdAt: new Date(),
    progress: 40,
    platformCode: 'amazon',
    platformOrderNo: 'AMZ-10006',
    batchNo: 'BATCH-006',
    orderNo: 'ORD-0006',
    sku: 'SKU-006',
    totalPrice: 320.5,
    totalQuantity: 1,
    trackingNo: 'HZ123456789',
    shippingMethod: 'sea',
    shippingStatus: 'preparing',
    outboundStatus: 0,
    orderStatus: 'pending',
    labelUploaded: false,
    interceptStatus: 'blocked',
    fbaId: 'FBA62345',
    multiOrder: false,
  },
  {
    key: 7,
    href: 'https://ant.design',
    avatar:
      'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
    name: '订单 7',
    owner: '仓库G',
    desc: '销毁',
    callNo: 33,
    status: '3',
    updatedAt: new Date(),
    createdAt: new Date(),
    progress: 20,
    platformCode: 'shopify',
    platformOrderNo: 'SHOP-30007',
    batchNo: 'BATCH-007',
    orderNo: 'ORD-0007',
    sku: 'SKU-007',
    totalPrice: 77.7,
    totalQuantity: 4,
    trackingNo: 'PG123456789',
    shippingMethod: 'truck',
    shippingStatus: 'intransit',
    outboundStatus: 0,
    orderStatus: 'pending',
    labelUploaded: true,
    interceptStatus: 'none',
    fbaId: 'FBA72345',
    multiOrder: false,
  },
  {
    key: 8,
    href: 'https://ant.design',
    avatar:
      'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
    name: '订单 8',
    owner: '仓库H',
    desc: 'FBA补货',
    callNo: 88,
    status: '1',
    updatedAt: new Date(),
    createdAt: new Date(),
    progress: 70,
    platformCode: 'amazon',
    platformOrderNo: 'AMZ-10008',
    batchNo: 'BATCH-008',
    orderNo: 'ORD-0008',
    sku: 'SKU-008',
    totalPrice: 200.0,
    totalQuantity: 6,
    trackingNo: 'TBA2234567890',
    shippingMethod: 'air',
    shippingStatus: 'delivered',
    outboundStatus: 0,
    orderStatus: 'delivered',
    labelUploaded: true,
    interceptStatus: 'none',
    fbaId: 'FBA82345',
    multiOrder: true,
  },
  {
    key: 9,
    href: 'https://ant.design',
    avatar:
      'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
    name: '订单 9',
    owner: '仓库I',
    desc: '直邮',
    callNo: 66,
    status: '0',
    updatedAt: new Date(),
    createdAt: new Date(),
    progress: 55,
    platformCode: 'ebay',
    platformOrderNo: 'EB-20009',
    batchNo: 'BATCH-009',
    orderNo: 'ORD-0009',
    sku: 'SKU-009',
    totalPrice: 18.8,
    totalQuantity: 2,
    trackingNo: 'UU123456789',
    shippingMethod: 'express',
    shippingStatus: 'intransit',
    outboundStatus: 1,
    orderStatus: 'shipped',
    labelUploaded: false,
    interceptStatus: 'none',
    fbaId: 'FBA92345',
    multiOrder: false,
  },
  {
    key: 10,
    href: 'https://ant.design',
    avatar:
      'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
    name: '订单 10',
    owner: '仓库J',
    desc: 'FBA补货',
    callNo: 155,
    status: '2',
    updatedAt: new Date(),
    createdAt: new Date(),
    progress: 10,
    platformCode: 'amazon',
    platformOrderNo: 'AMZ-10010',
    batchNo: 'BATCH-010',
    orderNo: 'ORD-0010',
    sku: 'SKU-010',
    totalPrice: 999.0,
    totalQuantity: 12,
    trackingNo: '1Z888AA10123456784',
    shippingMethod: 'sea',
    shippingStatus: 'preparing',
    outboundStatus: 1,
    orderStatus: 'exception',
    labelUploaded: true,
    interceptStatus: 'blocked',
    fbaId: 'FBA10345',
    multiOrder: true,
  },
];

function getOrder(req: Request, res: Response, u: string) {
  let realUrl = u;
  if (
    !realUrl ||
    Object.prototype.toString.call(realUrl) !== '[object String]'
  ) {
    realUrl = req.url;
  }
  const { current = 1, pageSize = 10 } = req.query;
  const params = parse(realUrl, true).query as unknown as TableListParams;

  let dataSource = [...tableListDataSource].slice(
    ((current as number) - 1) * (pageSize as number),
    (current as number) * (pageSize as number),
  );
  if (params.sorter) {
    const sorter = JSON.parse(params.sorter as any);
    dataSource = dataSource.sort((prev: any, next: any) => {
      let sortNumber = 0;
      Object.keys(sorter).forEach((key) => {
        if (sorter[key] === 'descend') {
          if (prev[key] - next[key] > 0) {
            sortNumber += -1;
          } else {
            sortNumber += 1;
          }
          return;
        }
        if (prev[key] - next[key] > 0) {
          sortNumber += 1;
        } else {
          sortNumber += -1;
        }
      });
      return sortNumber;
    });
  }
  if (params.filter) {
    const filter = JSON.parse(params.filter as any) as Record<string, string[]>;
    if (Object.keys(filter).length > 0) {
      dataSource = dataSource.filter((item) => {
        return Object.keys(filter).some((key) => {
          if (!filter[key]) {
            return true;
          }
          if (filter[key].includes(`${item[key as 'status']}`)) {
            return true;
          }
          return false;
        });
      });
    }
  }

  if (params.name) {
    dataSource = dataSource.filter((data) =>
      data.name.includes(params.name || ''),
    );
  }

  let finalPageSize = 10;
  if (params.pageSize) {
    finalPageSize = parseInt(`${params.pageSize}`, 10);
  }

  const result = {
    data: dataSource,
    total: tableListDataSource.length,
    success: true,
    pageSize: finalPageSize,
    current: parseInt(`${params.currentPage}`, 10) || 1,
  };
  console.log('result', result);
  return res.json(result);
}

function postOrder(req: Request, res: Response, u: string, b: Request) {
  let realUrl = u;
  if (
    !realUrl ||
    Object.prototype.toString.call(realUrl) !== '[object String]'
  ) {
    realUrl = req.url;
  }

  const body = b?.body || req.body;
  const { name, desc, key } = body;

  switch (req.method) {
    /* eslint no-case-declarations:0 */
    case 'DELETE':
      tableListDataSource = tableListDataSource.filter(
        (item) => key.indexOf(item.key) === -1,
      );
      break;
    case 'POST':
      (() => {
        const i = Math.ceil(Math.random() * 10000);
        const newRule = {
          key: tableListDataSource.length,
          href: 'https://ant.design',
          avatar: [
            'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
            'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
          ][i % 2],
          name,
          owner: '曲丽丽',
          desc,
          callNo: Math.floor(Math.random() * 1000),
          status: (Math.floor(Math.random() * 10) % 2).toString(),
          updatedAt: new Date(),
          createdAt: new Date(),
          progress: Math.ceil(Math.random() * 100),
        };
        tableListDataSource.unshift(newRule);
        return res.json(newRule);
      })();
      return;

    case 'PUT':
      (() => {
        let newRule = {};
        tableListDataSource = tableListDataSource.map((item) => {
          if (item.key === key) {
            newRule = { ...item, desc, name };
            return { ...item, desc, name };
          }
          return item;
        });
        return res.json(newRule);
      })();
      return;
    default:
      break;
  }

  const result = {
    list: tableListDataSource,
    pagination: {
      total: tableListDataSource.length,
    },
  };

  res.json(result);
}

export default {
  'GET /api/order': getOrder,
  'POST /api/order': postOrder,
  'DELETE /api/order': postOrder,
  'PUT /api/order': postOrder,
};
