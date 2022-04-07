import { List } from "antd";
import ForwardItem from "features/Notifications/components/ForwardItem";
import InboxItem from "features/Notifications/components/InboxItem";
import React from "react";
import { useLocation } from "react-router-dom";

const listInboxData = [];
for (let i = 0; i < 23; i++) {
  listInboxData.push({
    id: i + 1,
    href: "",
    title: `Văn bản mới thứ ${i}`,
    avatar: "https://joeschmoe.io/api/v1/random",
    summary: "Toàn thể khoa hãy triển khoai kế hoạch như trong văn bản.",
  });
}
const listForwardData = [];
for (let i = 0; i < 23; i++) {
  listForwardData.push({
    id: i + 1,
    href: "",
    title: `Văn bản đã chuyển tiếp thứ ${i}`,
    avatar: "https://joeschmoe.io/api/v1/random",
    summary: "Toàn thể khoa hãy triển khoai kế hoạch như trong văn bản.",
  });
}

export default function NotificationList({ filterType }) {
  const { pathname } = useLocation();
  const pathnames = pathname.split("/");
  const slug = pathnames[pathnames.length - 1];

  return (
    <List
      itemLayout="vertical"
      size="small"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 10,
      }}
      dataSource={slug === "inbox" ? listInboxData : listForwardData}
      renderItem={(item) =>
        slug === "inbox" ? (
          <InboxItem item={item} filterType={filterType} />
        ) : (
          <ForwardItem item={item} />
        )
      }
    />
  );
}
