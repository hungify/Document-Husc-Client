import {
  DeleteOutlined,
  EditTwoTone,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  PlusCircleTwoTone,
} from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Modal, notification, Row, Typography } from "antd";
import Meta from "antd/lib/card/Meta";
import { getTypesOfDocumentsConfig, getTypesOfDocumentsTotal } from "app/selectors/typesOfDocuments";
import ModalForm from "components/ModalForm";
import {
  fetchCreateTypesOfDocuments,
  fetchUpdateTypesOfDocuments,
} from "features/ManageTypesOfDocuments/typesOfDocumentSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const CardAnt = styled(Card)`
  &:hover {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    background-color: #fafafa;
  }
`;

export default function ManageTypesOfDocuments() {
  const [visible, setVisible] = React.useState(false);
  const [typeOfDocument, setTypeOfDocument] = React.useState(null);
  const typesOfDocuments = useSelector(getTypesOfDocumentsConfig);
  const typesOfDocumentsTotal = useSelector(getTypesOfDocumentsTotal);
  const dispatch = useDispatch();

  const handleOnCreateOrUpdate = ({ label }) => {
    if (typeOfDocument) {
      dispatch(fetchUpdateTypesOfDocuments({ typeOfDocumentId: typeOfDocument.id, label }));
    } else {
      dispatch(fetchCreateTypesOfDocuments(label));
    }
    setVisible(false);
  };

  const handleAddClick = () => {
    setTypeOfDocument(null);
    setVisible(true);
  };

  const handleEditClick = (typeOfDocument) => {
    setTypeOfDocument(typeOfDocument);
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
        onSubmit={handleOnCreateOrUpdate}
        onCancel={() => setVisible(false)}
        size="large"
        title={typeOfDocument ? "Cập nhật thông tin loại văn bản" : "Thêm mới loại văn bản"}
        okText={typeOfDocument ? "Cập nhật" : "Thêm mới"}
        cancelText={typeOfDocument ? "Hủy" : "Đóng"}
        layout="vertical"
        initialValues={{
          label: typeOfDocument ? typeOfDocument.label : null,
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
          label="Tên loại văn bản"
          tooltip={{ title: "Tên loại văn bản của bạn?", icon: <InfoCircleOutlined /> }}
          rules={[{ required: true, message: "Trường này là bắt buộc" }]}
        >
          <Input placeholder="Vui lòng nhập vào tên loại văn bản" />
        </Form.Item>
      </ModalForm>
      <Card
        title={<Typography.Text strong>{typesOfDocumentsTotal} Loại văn bản</Typography.Text>}
        extra={
          <Button onClick={handleAddClick} type="primary" key="create_typeOfDocument">
            <PlusCircleTwoTone /> Thêm mới
          </Button>
        }
      >
        <Row>
          {typesOfDocuments?.map((item) => (
            <Col key={item._id} xs={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
              <CardAnt
                actions={[
                  <Button onClick={() => handleEditClick(item)}>
                    <EditTwoTone key="edit" /> Chỉnh sửa
                  </Button>,
                  <Button onClick={() => handleDeleteClick(item)} icon={<DeleteOutlined />} danger>
                    Xóa
                  </Button>,
                ]}
              >
                <Meta title={item.label} description="Mô tả về loại văn bản" />
              </CardAnt>
            </Col>
          ))}
        </Row>
      </Card>
    </>
  );
}
