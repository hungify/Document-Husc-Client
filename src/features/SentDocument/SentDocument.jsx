import { Avatar, Card, Col, List, Row, Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
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
export default function SentDocument() {
  const navigate = useNavigate();
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
            renderItem={(item) => (
              <>
                <Col span={7} onClick={() => navigate(`detail/${item.id}`)}>
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                      title={<Typography.Text strong>{item.title}</Typography.Text>}
                      description={`Đến: ${item.to.email}`}
                    />
                  </List.Item>
                </Col>
                <Col flex="auto" onClick={() => navigate(`detail/${item.id}`)}>
                  {item.myMessage}
                </Col>
                <Col flex="auto" onClick={() => navigate(`detail/${item.id}`)}>
                  Forward từ {item.publisher.email}
                </Col>
                <Col flex="auto" onClick={() => navigate(`detail/${item.id}`)}>
                  <Typography.Text>22/2/2022</Typography.Text>
                </Col>
              </>
            )}
          />
        </Card>
      </ColAnt>
    </Row>
  );
}
