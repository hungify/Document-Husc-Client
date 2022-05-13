import {
  DeleteTwoTone,
  DownOutlined,
  EditTwoTone,
  ExclamationCircleOutlined,
  PlusCircleTwoTone,
} from "@ant-design/icons";
import { Button, Card, Form, Input, Modal, notification, Tooltip, Tree, Typography } from "antd";
import { getCategoriesTreeConfig } from "app/selectors/categories";
import ModalForm from "components/ModalForm";
import {
  fetchCreateCategory,
  fetchUpdateCategory,
} from "features/ManageCategories/categoriesSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const categories = useSelector(getCategoriesTreeConfig);
  
  const [showLayer, setShowLayer] = React.useState(false);
  const [selectedNode, setSelectedNode] = React.useState();
  const [visible, setVisible] = React.useState(false);
  const [isAddMode, setIsAddMode] = React.useState(false);

  const dispatch = useDispatch();

  const handleOnSelect = (selectedKeys, nodeInfo) => {
    if (nodeInfo?.selectedNodes.length > 0) {
      setSelectedNode([
        {
          title: nodeInfo?.selectedNodes[0].title,
          key: nodeInfo?.selectedNodes[0].key,
        },
      ]);
      setShowLayer(true);
    }
  };

  const handleCreateOrEdit = (values) => {
    const { title } = values;
    const key = selectedNode[0].key;
    if (isAddMode) {
      dispatch(fetchCreateCategory({ title, parentId: key === "root" ? null : key }));
    } else {
      dispatch(fetchUpdateCategory({ title, categoryId: key }));
    }
    setVisible(false);
  };

  const handleAddClick = () => {
    setVisible(true);
    setIsAddMode(true);
  };

  const handleEditClick = (item) => {
    setSelectedNode([
      {
        title: item.title,
        key: item.key,
      },
    ]);
    setIsAddMode(false);
    setVisible(true);
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
      onCancel() {},
    });
  };

  return (
    <>
      <ModalForm
        initialValues={{
          title: isAddMode ? null : selectedNode && selectedNode[0].title,

        }}
        visible={visible}
        onSubmit={handleCreateOrEdit}
        onCancel={() => setVisible(false)}
        size="large"
        title={isAddMode ? "Thêm mới chuyên mục" : "Cập nhật thông tin chuyên mục"}
        okText={isAddMode ? "Thêm mới" : "Cập nhật"}
        cancelText={isAddMode ? "Hủy" : "Đóng"}
        layout="vertical"
        name="category"
        wrapperCol={{
          xs: { span: 24, offset: 0 },
          sm: { span: 22, offset: 1 },
          md: { span: 20, offset: 2 },
        }}
      >
        <Form.Item
          name="title"
          label="Tên chuyên mục"
          rules={[{ required: true, message: "Vui lòng nhập vào tên chuyên mục!" }]}
        >
          <Input />
        </Form.Item>
      </ModalForm>

      <Card
        title={<Typography.Text strong>Danh sách chuyên mục</Typography.Text>}
        extra={
          selectedNode && (
            <Tooltip
              placement="topLeft"
              title="Thêm một chuyên mục là con của chuyên mục này"
              arrowPointAtCenter
              key="add_category"
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
          selectedKeys={selectedNode?.map((item) => item.key)}
          showIcon={false}
          showLine={{
            showLeafIcon: false,
            showLine: true,
          }}
          defaultExpandAll={true}
          onSelect={handleOnSelect}
          switcherIcon={<DownOutlined />}
          treeData={categories}
          titleRender={(item) =>
            showLayer && item.key !== "root" && item.key === selectedNode[0]?.key ? (
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
      </Card>
    </>
  );
}
