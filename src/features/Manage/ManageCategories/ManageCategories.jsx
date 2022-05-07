import {
  DeleteTwoTone,
  DownOutlined,
  EditTwoTone,
  ExclamationCircleOutlined,
  PlusCircleTwoTone,
} from "@ant-design/icons";
import { Button, Card, Form, Input, Modal, notification, Tooltip, Tree, Typography } from "antd";
import { getCategoriesConfig } from "app/selectors/categories";
import DrawerCustom from "components/DrawerCustom";
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
`;

const Overlay = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  line-height: 40px;
  background-color: #bae7ff;
`;
const ActionList = styled.div`
  width: 20%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export default function ManageCategories() {
  const categoriesConfig = useSelector(getCategoriesConfig);

  const treeData = [
    {
      title: "root",
      key: "root",
      children: categoriesConfig,
    },
  ];

  const [form] = Form.useForm();
  const [showDrawer, setShowDrawer] = React.useState(false);
  const [showLayer, setShowLayer] = React.useState(false);
  const [selectedNode, setSelectedNode] = React.useState();
  const [isAddMode, setIsAddMode] = React.useState(false);

  React.useEffect(() => {
    if (showDrawer) {
      if (!isAddMode) {
        form.setFieldsValue({
          categoryName: selectedNode?.title,
        });
      } else {
        form.setFieldsValue({
          categoryName: "",
        });
      }
    }
  }, [selectedNode, showDrawer]);

  const handleFieldsChange = (allFields) => {};

  const handleOnSubmit = (values) => {};

  const handleCloseDrawer = () => {
    setShowDrawer(false);
  };

  const handleOnSelect = (selectedKeys, nodeInfo) => {
    setSelectedNode(nodeInfo.selectedNodes[0]);
    setShowLayer(true);
  };

  const handleAddClick = () => {
    setIsAddMode(true);
    setShowDrawer(true);
  };

  const handleEditClick = (item) => {
    setSelectedNode(item);
    setIsAddMode(false);
    setShowDrawer(true);
  };

  const handleDeleteClick = (item) => {
    Modal.confirm({
      title: "Xác nhận",
      icon: <ExclamationCircleOutlined />,
      content: "Bạn có chắc chắn muốn xóa chuyên mục này?",
      okText: "Có",
      cancelText: "Không",
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        })
          .then(() =>
            notification.success({
              duration: 2,
              message: "Xóa thành công",
              description: "Hãy tải lại trang để xem kết quả.",
            })
          )
          .catch(() =>
            notification.error({
              duration: 2,
              message: "Đã xảy ra lỗi",
              description: "Xóa không thành công. Vui lòng thử lại.",
            })
          );
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <Card
      title={<Typography.Text strong>Danh sách chuyên mục</Typography.Text>}
      extra={
        selectedNode && (
          <Tooltip
            placement="topLeft"
            title="Thêm một chuyên mục là con của chuyên mục này"
            arrowPointAtCenter
          >
            <Button onClick={handleAddClick}>
              <PlusCircleTwoTone />
              Thêm mới
            </Button>
          </Tooltip>
        )
      }
    >
      <TreeAnt
        selectedKeys={[selectedNode]}
        showIcon={false}
        showLine={{
          showLeafIcon: false,
          showLine: true,
        }}
        defaultExpandAll={true}
        onSelect={handleOnSelect}
        switcherIcon={<DownOutlined />}
        treeData={treeData}
        titleRender={(item) =>
          showLayer && item.key !== "root" && item.key === selectedNode?.key ? (
            <Overlay>
              <Typography.Text strong>{item.title}</Typography.Text>
              <ActionList>
                <Tooltip
                  placement="top"
                  title="Cập nhật thông tin chuyên mục này"
                  arrowPointAtCenter
                >
                  <Button onClick={() => handleEditClick(item)}>
                    <EditTwoTone />
                  </Button>
                </Tooltip>
                <Tooltip placement="top" title="Xóa chuyên mục này" arrowPointAtCenter>
                  <Button onClick={() => handleDeleteClick(item)} danger>
                    <DeleteTwoTone twoToneColor="#FD5D5D" />
                  </Button>
                </Tooltip>
              </ActionList>
            </Overlay>
          ) : (
            <>
              {item.key === "root" ? (
                <Typography.Text>Danh mục gốc</Typography.Text>
              ) : item?.children?.length > 0 ? (
                <Typography.Text strong>{item.title}</Typography.Text>
              ) : (
                <Typography.Text>{item.title}</Typography.Text>
              )}
            </>
          )
        }
      />
      <DrawerCustom
        title={isAddMode ? "Thêm mới chuyên mục" : "Cập nhật thông tin chuyên mục"}
        placement="right"
        onCloseDrawer={handleCloseDrawer}
        visible={showDrawer}
        size="large"
      >
        <Form
          name="addNewCategory"
          form={form}
          onFinish={handleOnSubmit}
          autoComplete="off"
          onFieldsChange={handleFieldsChange}
        >
          <Form.Item
            name="categoryName"
            label="Tên chuyên mục"
            rules={[{ required: true, message: "Vui lòng nhập vào tên chuyên mục!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              {isAddMode ? "Thêm mới" : "Cập nhật"}
            </Button>
          </Form.Item>
        </Form>
      </DrawerCustom>
    </Card>
  );
}
