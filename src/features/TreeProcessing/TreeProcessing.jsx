import { DownOutlined } from "@ant-design/icons";
import { Space, Tree, Typography } from "antd";
import BadgeCheckIcon from "components/BadgeCheckIcon";
import BroadcastIcon from "components/BroadcastIcon";
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
  & .ant-tree-show-line .ant-tree-switcher {
    display: flex;
    align-items: center;
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
      titleRender={(item) => (
        <Overlay>
          {item.key === "root" ? (
            <SpaceAnt size="small">
              <Typography.Title level={4}>{item.title}</Typography.Title>
              <BroadcastIcon size="large" />
              <Typography.Text type="secondary" italic style={{ fontSize: "15px" }}>
                Ban hành:
                {" " + new Date().toLocaleTimeString() + " " + new Date().toLocaleDateString()}
              </Typography.Text>
            </SpaceAnt>
          ) : (
            <>
              {item?.children?.length > 0 ? (
                <SpaceAnt size="small">
                  <Typography.Title level={5}>{item.title}</Typography.Title>
                  <BadgeCheckIcon size="large" />
                  <Typography.Text type="secondary" italic style={{ fontSize: "15px" }}>
                    Xử lý:
                    {" " + new Date().toLocaleTimeString() + " " + new Date().toLocaleDateString()}
                  </Typography.Text>
                </SpaceAnt>
              ) : (
                <SpaceAnt size="small">
                  <Typography.Text>{item.title}</Typography.Text>
                  {item.title.charAt(0) === "N" && (
                    <>
                      <BadgeCheckIcon size="large" />
                      <Typography.Text type="secondary" italic style={{ fontSize: "15px" }}>
                        Xử lý:
                        {" " +
                          new Date().toLocaleTimeString() +
                          " " +
                          new Date().toLocaleDateString()}
                      </Typography.Text>
                    </>
                  )}
                </SpaceAnt>
              )}
            </>
          )}
        </Overlay>
      )}
    />
  );
}
