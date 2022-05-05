import { DownOutlined } from "@ant-design/icons";
import { Alert, Card, Divider, Space, Tree, Typography } from "antd";
import { getMyReadDate } from "app/selectors/documentDetails";
import BadgeCheckIcon from "components/Icons/BadgeCheckIcon";
import BroadcastIcon from "components/Icons/BroadcastIcon";
import dayjs from "dayjs";
import _ from "lodash";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const TreeAnt = styled(Tree)`
  &.ant-tree .ant-tree-treenode {
    width: 99%;
  }
  &.ant-tree .ant-tree-node-content-wrapper {
    width: 100%;
  }
  .ant-tree-switcher.ant-tree-switcher_open {
    align-items: center;
    display: flex;
    justify-content: center;
  }
`;

const Overlay = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  line-height: 40px;
`;
const SpaceAnt = styled(Space)`
  & .ant-space-item {
    display: flex;
    align-items: center;
    height: 100%;
  }
`;

export default function TreeProcessing({ treeData }) {
  const myReadDate = useSelector(getMyReadDate);

  return (
    <Card>
      {myReadDate ? (
        <Alert
          message={
            <Typography.Text strong>
              Bạn đã xử lý văn bản này vào lúc {dayjs(myReadDate).format("DD/MM/YYYY HH:mm")}
            </Typography.Text>
          }
          type="success"
          showIcon
          closable
        />
      ) : (
        <Alert
          message="Xác nhận xứ lý văn bản"
          description="Thông báo cho mọi người là bạn đã xứ lý văn bản này"
          type="warning"
          showIcon
        />
      )}
      <TreeAnt
        showIcon={true}
        switcherIcon={<DownOutlined />}
        showLine={{
          showLeafIcon: false,
          showLine: true,
        }}
        defaultExpandAll={true}
        treeData={treeData}
        titleRender={(tree) => (
          <Overlay key={tree.receiver._id}>
            {tree.root ? (
              <SpaceAnt size="small">
                <Typography.Title level={4}>{tree.receiver.username}</Typography.Title>
                <BroadcastIcon style={{ color: "rgb(255, 77, 79)" }} />
                <Typography.Text type="danger" italic style={{ fontSize: "15px" }}>
                  Ban hành:&nbsp; {dayjs(tree.sendDate).format("DD/MM/YYYY HH:mm")}
                </Typography.Text>
              </SpaceAnt>
            ) : (
              <TreeItem node={tree} />
            )}
          </Overlay>
        )}
      />
    </Card>
  );
}

function TreeItem({ node }) {
  return !_.isEmpty(node.children) ? (
    <SpaceAnt size="small">
      <Typography.Title level={5}>{node.receiver.username}</Typography.Title>
      <BadgeCheckIcon style={{ color: "#30AADD" }} />
      <Space direction="horizontal" split={<Divider type="vertical" />}>
        <Typography.Text type="success" italic style={{ fontSize: "15px" }}>
          Xử lý:&nbsp;{dayjs(node.readDate).format("DD/MM/YYYY HH:mm")}
        </Typography.Text>

        <Typography.Text type="secondary" italic style={{ fontSize: "15px" }}>
          Chuyển tiếp:&nbsp;{dayjs(node.sendDate).format("DD/MM/YYYY HH:mm")}
        </Typography.Text>
      </Space>
    </SpaceAnt>
  ) : (
    <SpaceAnt size="small">
      <Typography.Text>{node?.receiver?.username}</Typography.Text>
      {node.readDate && (
        <>
          <BadgeCheckIcon style={{ color: "#30AADD" }} />
          <Typography.Text type="success" italic style={{ fontSize: "15px" }}>
            Xử lý:&nbsp;{dayjs(node.sendDate).format("DD/MM/YYYY HH:mm")}
          </Typography.Text>
        </>
      )}
    </SpaceAnt>
  );
}
