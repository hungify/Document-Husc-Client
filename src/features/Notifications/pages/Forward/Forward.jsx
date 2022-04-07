import { Card, Col, List, Row } from "antd";
import MailItem from "features/Notifications/components/MailItem";
import React from "react";
import styled from "styled-components";

const ColAnt = styled(Col)`
  :not(:first-child) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const listForwardData = [];
for (let i = 0; i < 23; i++) {
  listForwardData.push({
    id: i + 1,
    title: `Văn bản đã chuyển tiếp thứ ${i}`,
    myMessage: "This is my message",
    message: "Toàn thể khoa hãy triển khoai kế hoạch như trong văn bản.",
    publisher: {
      name: "Nguyễn Mạnh Tuấn",
      avatar: "https://joeschmoe.io/api/v1/random",
      email: `email.publisher.${i}@husc.edu.vn`,
    },
    to: {
      name: "Hồng Nhung",
      avatar: "https://joeschmoe.io/api/v1/random",
      email: `email.receiver.${i}@husc.edu.vn`,
    },
  });
}
export default function Forward() {
  return (
    <Row>
      <ColAnt span={24}>
        <Card size="small">
          <List
            size="small"
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 10,
            }}
            dataSource={listForwardData}
            renderItem={(item) => <MailItem item={item} />}
          />
        </Card>
      </ColAnt>
    </Row>
  );
}
