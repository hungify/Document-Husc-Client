import {
  DeleteTwoTone,
  EditTwoTone,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  PlusCircleTwoTone,
} from "@ant-design/icons";
import { Button, Card, Empty, Form, Input, List, Modal, Typography } from "antd";
import { getDepartmentsConfig } from "app/selectors/departments";
import ModalForm from "components/ModalForm";
import {
  fetchCreateDepartment,
  fetchDepartments,
  fetchUpdateDepartment,
} from "features/ManageDepartments/departmentsSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const CardAnt = styled(Card)`
  &:hover {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    background-color: #fafafa;
  }
`;

export default function ManageDepartments() {
  const [visible, setVisible] = React.useState(false);
  const [department, setDepartment] = React.useState(null);
  const departments = useSelector(getDepartmentsConfig);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  const handleCreateOrEdit = ({ label }) => {
    if (department) {
      dispatch(fetchUpdateDepartment({ departmentId: department._id, label }));
    } else {
      dispatch(fetchCreateDepartment(label));
    }
    setVisible(false);
  };

  const handleAddClick = () => {
    setDepartment(null);
    setVisible(true);
  };

  const handleEditClick = (department) => {
    setDepartment(department);
    setVisible(true);
  };

  const handleDeleteClick = (departmentId) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      icon: <ExclamationCircleOutlined />,
      content: "Bạn có chắc chắn muốn xóa?",
      okText: "Có",
      cancelText: "Không",
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        });
      },
      onCancel() {},
    });
  };

  return (
    <>
      <ModalForm
        visible={visible}
        onSubmit={handleCreateOrEdit}
        onCancel={() => setVisible(false)}
        size="large"
        title={department ? "Cập nhật thông tin phong/ban" : "Thêm mới phong/ban"}
        okText={department ? "Cập nhật" : "Thêm mới"}
        cancelText={department ? "Hủy" : "Đóng"}
        layout="vertical"
        initialValues={{
          label: department ? department.label : null,
        }}
        name="department"
        wrapperCol={{
          xs: { span: 24, offset: 0 },
          sm: { span: 22, offset: 1 },
          md: { span: 20, offset: 2 },
        }}
      >
        <Form.Item
          name="label"
          label="Tên phòng/ban"
          tooltip={{ title: "Tên phòng/ban của bạn", icon: <InfoCircleOutlined /> }}
          rules={[{ required: true, message: "Trường này là bắt buộc" }]}
        >
          <Input placeholder="Nhập vào tên phòng/ban" />
        </Form.Item>
      </ModalForm>

      <Card
        title={<Typography.Text strong>{departments.length} phòng/ban</Typography.Text>}
        extra={
          <Button onClick={handleAddClick} type="primary" key="add_department">
            <PlusCircleTwoTone /> Thêm mới
          </Button>
        }
      >
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 6,
            xxl: 3,
          }}
          locale={{
            emptyText: <Empty description="Danh sách trống" />,
          }}
          pagination={{}}
          dataSource={departments}
          renderItem={(item) => (
            <List.Item>
              <CardAnt
                actions={[
                  <Button onClick={() => handleEditClick(item)} key="edit-department">
                    <EditTwoTone /> Chỉnh sửa
                  </Button>,
                  <Button
                    onClick={() => handleDeleteClick(item)}
                    danger
                    type="dashed"
                    key="delete-department"
                  >
                    <DeleteTwoTone twoToneColor="#FF4949" />
                    Xóa
                  </Button>,
                ]}
              >
                <Card.Meta title={item.label} description="Mô tả về cơ quan" />
              </CardAnt>
            </List.Item>
          )}
        />
      </Card>
    </>
  );
}
