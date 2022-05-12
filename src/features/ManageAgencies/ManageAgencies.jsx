import {
  DeleteTwoTone,
  EditTwoTone,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  PlusCircleTwoTone,
} from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Modal, notification, Row, Typography } from "antd";
import Meta from "antd/lib/card/Meta";
import { getAgenciesConfig } from "app/selectors/agencies";
import ModalForm from "components/ModalForm";
import { fetchCreateAgencies, fetchUpdateAgencies } from "features/ManageAgencies/agenciesSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const CardAnt = styled(Card)`
  &:hover {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    background-color: #fafafa;
  }
`;

export default function ManageAgencies() {
  const [visible, setVisible] = React.useState(false);
  const [agency, setAgency] = React.useState(null);
  const agencies = useSelector(getAgenciesConfig);
  const dispatch = useDispatch();

  const handleOnCreateOrEdit = ({ label }) => {
    if (agency) {
      dispatch(fetchUpdateAgencies({ agencyId: agency._id, label }));
    } else {
      dispatch(fetchCreateAgencies(label));
    }
    setVisible(false);
  };

  const handleAddClick = () => {
    setAgency(null);
    setVisible(true);
  };

  const handleEditClick = (agency) => {
    setAgency(agency);
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
    <>
      <ModalForm
        visible={visible}
        onSubmit={handleOnCreateOrEdit}
        onCancel={() => setVisible(false)}
        size="large"
        title={agency ? "Cập nhật thông tin cơ quan" : "Thêm mới cơ quan"}
        okText={agency ? "Cập nhật" : "Thêm mới"}
        cancelText={agency ? "Hủy" : "Đóng"}
        layout="vertical"
        initialValues={{
          label: agency ? agency.label : null,
        }}
        name="agency"
        wrapperCol={{
          xs: { span: 24, offset: 0 },
          sm: { span: 22, offset: 1 },
          md: { span: 20, offset: 2 },
        }}
      >
        <Form.Item
          name="label"
          label="Tên cơ quan"
          tooltip={{ title: "Tên cơ quan ban hành của bạn?", icon: <InfoCircleOutlined /> }}
          rules={[{ required: true, message: "Trường này là bắt buộc" }]}
        >
          <Input placeholder="Vui lòng nhập vào cơ quan ban hành" />
        </Form.Item>
      </ModalForm>

      <Card
        title={<Typography.Text strong>20 cơ quan ban hành</Typography.Text>}
        extra={
          <Button onClick={handleAddClick} type="primary" key="add_agency">
            <PlusCircleTwoTone key="edit" /> Thêm mới
          </Button>
        }
      >
        <Row>
          {agencies?.map((item) => (
            <Col key={item._id} xs={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
              <CardAnt
                actions={[
                  <Button onClick={() => handleEditClick(item)}>
                    <EditTwoTone key="edit" /> Chỉnh sửa
                  </Button>,
                  <Button onClick={() => handleDeleteClick(item)} danger type="dashed">
                    <DeleteTwoTone /> Xóa
                  </Button>,
                ]}
              >
                <Meta title={item.label} description="Mô tả về cơ quan" />
              </CardAnt>
            </Col>
          ))}
        </Row>
      </Card>
    </>
  );
}
