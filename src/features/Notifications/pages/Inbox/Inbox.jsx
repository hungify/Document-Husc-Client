import { Card, Divider, List, Radio } from "antd";
import MailItem from "features/Notifications/components/MailItem";
import React from "react";

const listInboxData = [];
for (let i = 0; i < 23; i++) {
  listInboxData.push({
    id: i + 1,
    href: "",
    title: `Văn bản mới thứ ${i}`,
    message: "Toàn thể khoa hãy triển khoai kế hoạch như trong văn bản.",
    publisher: null,
    from: {
      name: "Nguyễn Mạnh Tuấn",
      avatar: "https://joeschmoe.io/api/v1/random",
      email: `email.receiver.${i}@husc.edu.vn`,
    },
  });
}
export default function Inbox() {
  const [filterType, setFilterType] = React.useState("all");

  return (
    <Card size="small">
      <Radio.Group
        onChange={(e) => {
          setFilterType(e.target.value);
        }}
        value={filterType}
      >
        <Radio value="all">Tất cả</Radio>
        <Radio value="unread">Chưa đọc</Radio>
      </Radio.Group>
      <Divider />
      <List
        size="small"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 10,
        }}
        dataSource={listInboxData}
        renderItem={(item) => <MailItem item={item} filterType={filterType} />}
      />
    </Card>
  );
}
