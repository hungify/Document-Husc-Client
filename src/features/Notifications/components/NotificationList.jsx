import { List } from "antd";
import ForwardItem from "features/Notifications/components/ForwardItem";
import InboxItem from "features/Notifications/components/InboxItem";
import React from "react";
import { useLocation, useSearchParams } from "react-router-dom";

const listInboxData = [];
for (let i = 0; i < 23; i++) {
  listInboxData.push({
    href: "",
    title: `Văn bản mới thứ ${i}`,
    avatar: "https://joeschmoe.io/api/v1/random",
    summary:
      "t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
  });
}
const listForwardData = [];
for (let i = 0; i < 23; i++) {
  listForwardData.push({
    href: "",
    title: `Văn bản đã chuyển tiếp thứ ${i}`,
    avatar: "https://joeschmoe.io/api/v1/random",
    summary:
      "t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
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
