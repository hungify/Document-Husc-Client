import { DownOutlined } from "@ant-design/icons";
import { Alert, Card, Divider, Space, Tree, Typography } from "antd";
import BadgeCheckIcon from "components/Icons/BadgeCheckIcon";
import BroadcastIcon from "components/Icons/BroadcastIcon";
import { treeReceiver } from "mocks/treeReceiver";
import React from "react";
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

export default function TreeProcessing() {
  const [selectedNode, setSelectedNode] = React.useState();
  const handleOnSelect = (selectedKeys, nodeInfo) => {
    setSelectedNode(nodeInfo.selectedNodes[0]);
  };

  return (
    <Card>
      {Math.random() > 0 ? (
        <Alert
          message={
            <Typography.Text strong>
              Bạn đã xử lý văn bản này vào lúc 10:10 PM 20/09/2022
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
        selectedKeys={[selectedNode]}
        showIcon={true}
        switcherIcon={<DownOutlined />}
        showLine={{
          showLeafIcon: false,
          showLine: true,
        }}
        defaultExpandAll={true}
        onSelect={handleOnSelect}
        treeData={treeReceiver}
        titleRender={(tree) => (
          <Overlay>
            {tree.key === "root" ? (
              <SpaceAnt size="small">
                <Typography.Title level={4}>{tree.name}</Typography.Title>
                <BroadcastIcon style={{ color: "rgb(255, 77, 79)" }} />
                <Typography.Text type="danger" italic style={{ fontSize: "15px" }}>
                  Ban hành: {tree.publishDate}
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
  return node.children.length > 0 ? (
    <SpaceAnt size="small">
      <Typography.Title level={5}>{node.name}</Typography.Title>
      <BadgeCheckIcon style={{ color: "#30AADD" }} />
      <Space direction="horizontal" split={<Divider type="vertical" />}>
        {node.readDate && (
          <Typography.Text type="success" italic style={{ fontSize: "15px" }}>
            Xử lý: {node.readDate}
          </Typography.Text>
        )}
        {node.forwardDate && (
          <Typography.Text type="secondary" italic style={{ fontSize: "15px" }}>
            Chuyển tiếp: {node.forwardDate}
          </Typography.Text>
        )}
      </Space>
    </SpaceAnt>
  ) : (
    <SpaceAnt size="small">
      <Typography.Text>{node.name}</Typography.Text>
      {node?.readDate && (
        <>
          <BadgeCheckIcon style={{ color: "#30AADD" }} />
          <Typography.Text type="success" italic style={{ fontSize: "15px" }}>
            Xử lý: {node.readDate}
          </Typography.Text>
        </>
      )}
    </SpaceAnt>
  );
}
