import friendsData from "../../../content/data/friends.json";

export const FRIENDS_TITLE = "友链 | Hayden Bi Blog";
export const FRIENDS_DESCRIPTION =
  "精选友链与伙伴站点，按优先级与时间排序，只展示 active 的链接。";

export type Friend = {
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
export const activeFriends = (friendsData.friends as Friend[])
  .filter((friend) => friend.status === "active")
  .sort((a, b) => {
    const orderA = a.order ?? Number.POSITIVE_INFINITY;
    const orderB = b.order ?? Number.POSITIVE_INFINITY;
    if (orderA !== orderB) return orderA - orderB;

    const timeA = a.addedDate ? new Date(a.addedDate).getTime() : 0;
    const timeB = b.addedDate ? new Date(b.addedDate).getTime() : 0;
    return timeA - timeB;
  });
