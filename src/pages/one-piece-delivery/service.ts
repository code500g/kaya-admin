import type { RowItem } from './_mock';

export async function getOnePieceDeliveryData(params: any) {
  // 这里调用你的 API 接口
  // 示例：
  // const response = await fetch('/api/one-piece-delivery', {
  //   method: 'POST',
  //   body: JSON.stringify(params),
  //   headers: { 'Content-Type': 'application/json' },
  // });
  // return response.json();

  // 临时返回模拟数据
  return {
    data: [], // 实际数据
    total: 0,
    success: true,
    extra: {
      totalAll: 0,
      totalIn: 0,
      totalOut: 0,
      totalRecycle: 0,
    },
  };
}
