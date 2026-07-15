import productData from "../../../content/data/product.json";

export const PRODUCT_TITLE = "产品 | Hayden Bi Blog";
export const PRODUCT_DESCRIPTION = "个人独立开发的产品与工具集合。";

export type Product = {
  id: string;
  name: string;
  url: string;
  description: string;
  avatar: string;
  status: string;
  addedDate?: string;
  order?: number;
};

// 页面与结构化数据共用同一份过滤和排序结果。
export const activeProducts = (productData.friends as Product[])
  .filter((product) => product.status === "active")
  .sort((a, b) => {
    const orderA = a.order ?? Number.POSITIVE_INFINITY;
    const orderB = b.order ?? Number.POSITIVE_INFINITY;
    if (orderA !== orderB) return orderA - orderB;

    const timeA = a.addedDate ? new Date(a.addedDate).getTime() : 0;
    const timeB = b.addedDate ? new Date(b.addedDate).getTime() : 0;
    return timeB - timeA;
  });
