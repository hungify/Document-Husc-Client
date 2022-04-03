import { AntDesignOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Card, Col, Divider, List, Radio, Row, Tooltip, Typography } from "antd";
import UserLayout from "layout/UserLayout/UserLayout";
import React from "react";
import styled from "styled-components";

const RowAnt = styled(Row)`
  align-items: center;
`;
const ColAnt = styled(Col)`
  :not(:first-child) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const ListItemAnt = styled(List.Item)`
  transition: all 0.3s ease;
  &:hover {
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    background-color: rgba(65, 132, 228, 0.15);
  }
`;

const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: "",
    title: `Văn bản thứ ${i}`,
    avatar: "https://joeschmoe.io/api/v1/random",
    summary:
      "t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
  });
}

export default function InboxList() {
  const [selectionType, setSelectionType] = React.useState("checkbox");
  return (
    <>
      <Row>
        <ColAnt span={24}>
          <Card title="Card title" size="small">
            <Radio.Group
              onChange={({ target: { value } }) => {
                setSelectionType(value);
              }}
              value={selectionType}
            >
              <Radio value="all">Tất cả</Radio>
              <Radio value="unread">Chưa đọc</Radio>
            </Radio.Group>
            <Divider />
            <List
              itemLayout="vertical"
              size="small"
              pagination={{
                onChange: (page) => {
                  console.log(page);
                },
                pageSize: 10,
              }}
              dataSource={listData}
              renderItem={(item) => (
                <>
                  <ListItemAnt>
                    <RowAnt>
                      <ColAnt span={16}>
                        <List.Item.Meta
                          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                          title={<Typography.Text strong>{item.title}</Typography.Text>}
                          description={item.summary}
                        />
                      </ColAnt>
                      <ColAnt span={4}>
                        <Avatar.Group
                          maxCount={2}
                          maxPopoverTrigger="click"
                          maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                        >
                          <Avatar src="https://joeschmoe.io/api/v1/random" />
                          <Avatar style={{ backgroundColor: "#f56a00" }}>K</Avatar>
                          <Tooltip title="Ant User" placement="top">
                            <Avatar
                              style={{ backgroundColor: "#87d068" }}
                              icon={<UserOutlined />}
                            />
                          </Tooltip>
                          <Avatar
                            style={{ backgroundColor: "#1890ff" }}
                            icon={<AntDesignOutlined />}
                          />
                        </Avatar.Group>
                      </ColAnt>
                      <ColAnt span={4}>
                        <Typography.Text>2 day ago</Typography.Text>
                      </ColAnt>
                    </RowAnt>
                  </ListItemAnt>
                </>
              )}
            />
          </Card>
        </ColAnt>
      </Row>
    </>
  );
}
