import {
  DeleteTwoTone,
  EditTwoTone,
  ExclamationCircleOutlined,
  PlusCircleTwoTone,
} from "@ant-design/icons";
import { Button, Card, Empty, List, Modal, notification, Typography } from "antd";
import {
  fetchCreateDepartment,
  fetchDepartments,
  fetchEditDepartment,
} from "app/reducers/configs/departmentsSlice";
import { getDepartmentsConfig, getDepartmentsTotal } from "app/selectors/departments";
import AddEditDepartments from "features/Manage/ManageDepartments/AddEditDepartment";
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
  const departmentsConfig = useSelector(getDepartmentsConfig);
  const departmentsTotal = useSelector(getDepartmentsTotal);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  const handleCreateOrEditDepartment = (values) => {
    if (department) {
      values.departmentId = department._id;
      dispatch(fetchEditDepartment(values));
    } else {
      dispatch(fetchCreateDepartment(values));
    }
    setVisible(false);
  };

  const handleAddClick = (id) => {
    setDepartment(id);
    setVisible(true);
  };

  const handleEditClick = (value) => {
    setDepartment(value);
    setVisible(true);
  };

  const handleDeleteClick = () => {
    Modal.confirm({
      title: "Xác nhận xóa",
      icon: <ExclamationCircleOutlined />,
      content: "Bạn có chắc chắn muốn xóa?",
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
    <Card
      title={<Typography.Text strong>20 cơ quan ban hành</Typography.Text>}
      extra={
        <Button onClick={handleAddClick} type="primary">
          <PlusCircleTwoTone key="edit" /> Thêm mới
        </Button>
      }
    >
      <AddEditDepartments
        department={department}
        visible={visible}
        onSubmit={handleCreateOrEditDepartment}
        onCancel={() => {
          setVisible(false);
        }}
      />
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
        pagination={{
          total: departmentsTotal,
        }}
        dataSource={departmentsConfig}
        renderItem={(item) => (
          <List.Item>
            <AddEditDepartments
              department={department}
              visible={visible}
              onSubmit={handleCreateOrEditDepartment}
              onCancel={() => {
                setVisible(false);
              }}
            />
            <CardAnt
              actions={[
                <Button onClick={() => handleEditClick(item)}>
                  <EditTwoTone key="edit" /> Chỉnh sửa
                </Button>,
                <Button onClick={() => handleDeleteClick(item._id)} danger>
                  <DeleteTwoTone twoToneColor="#FF4949" />
                  Xóa
                </Button>,
              ]}
            >
              <Card.Meta title={item.label} />
            </CardAnt>
          </List.Item>
        )}
      />
    </Card>
  );
}
