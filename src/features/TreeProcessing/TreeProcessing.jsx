import { DownOutlined } from "@ant-design/icons";
import { Card, Divider, Space, Tree, Typography } from "antd";
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
                <BroadcastIcon style={{ color: "#FF6464" }} />
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
                    <BadgeCheckIcon style={{ color: "#30AADD" }} />
                    <Space direction="horizontal" split={<Divider type="vertical" />}>
                      <Typography.Text type="secondary" italic style={{ fontSize: "15px" }}>
                        Xử lý:
                        {" " +
                          new Date().toLocaleTimeString() +
                          " " +
                          new Date().toLocaleDateString()}
                      </Typography.Text>
                      <Typography.Text type="secondary" italic style={{ fontSize: "15px" }}>
                        Chuyển tiếp:
                        {" " +
                          new Date().toLocaleTimeString() +
                          " " +
                          new Date().toLocaleDateString()}
                      </Typography.Text>
                    </Space>
                  </SpaceAnt>
                ) : (
                  <SpaceAnt size="small">
                    <Typography.Text>{item.title}</Typography.Text>
                    {item.title.charAt(0) === "N" && (
                      <>
                        <BadgeCheckIcon style={{ color: "#30AADD" }} />
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
    </Card>
  );
}
