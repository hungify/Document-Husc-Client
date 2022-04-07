import { Avatar, Col, List, Row, Typography } from "antd";
import DrawerRead from "features/Notifications/components/DrawerReader";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ColAnt = styled(Col)`
  :not(:first-child) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
const Wrapper = styled.div`
  transition: all 0.3s ease;
  &:hover {
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    background-color: rgba(65, 132, 228, 0.15);
  }
`;

export default function ForwardItem({ item }) {
  const [visible, setVisible] = React.useState(false);

  const handleCloseDrawer = () => {
    setVisible(false);
  };

  return (
    <Wrapper>
      <DrawerRead visible={visible} onCloseDrawer={handleCloseDrawer} />
      <Row align="middle">
        <ColAnt span={7}>
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={
                <Link to={`detail/${item.id}`}>
                  <Typography.Text strong>{item.title}</Typography.Text>
                </Link>
              }
              description={`Đến: ${item.to.email}`}
            />
          </List.Item>
        </ColAnt>
        <ColAnt flex="auto">{item.myMessage}</ColAnt>
        <ColAnt flex="auto">Forward từ {item.publisher.email}</ColAnt>
        <ColAnt flex="auto">
          <Typography.Text>22/2/2022</Typography.Text>
        </ColAnt>
      </Row>
    </Wrapper>
  );
}
