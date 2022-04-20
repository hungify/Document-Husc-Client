import {
  DeleteOutlined,
  EditTwoTone,
  ExclamationCircleOutlined,
  PlusCircleTwoTone,
} from "@ant-design/icons";
import { Button, Card, Col, Modal, notification, Row, Typography } from "antd";
import Meta from "antd/lib/card/Meta";
import AddEditTypeOfDocument from "features/Manage/ManageTypesOfDocuments/AddEditTypeOfDocument";
import React from "react";
import styled from "styled-components";

const CardAnt = styled(Card)`
  &:hover {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    background-color: #fafafa;
  }
`;

export default function ManageTypesOfDocuments() {
  const [visible, setVisible] = React.useState(false);
  const [documentTypeId, setDocumentTypeId] = React.useState(null);

  const handleOnSubmit = (values) => {
    console.log("Received values of form: ", values);
    setVisible(false);
  };

  const handleAddClick = () => {
    setDocumentTypeId(null);
    setVisible(true);
  };

  const handleEditClick = (id) => {
    setDocumentTypeId(id);
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
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <>
      <Card
        title={<Typography.Text strong>20 cơ quan</Typography.Text>}
        extra={
          <Button onClick={handleAddClick} type="primary">
            <PlusCircleTwoTone key="edit" /> Thêm mới
          </Button>
        }
      >
        <AddEditTypeOfDocument
          documentTypeId={documentTypeId}
          visible={visible}
          onCreate={handleOnSubmit}
          onCancel={() => {
            setVisible(false);
          }}
        />
        <Row>
          {Array.from(Array(20).keys()).map((item, i) => (
            <Col key={i + 1} xs={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
              <CardAnt
                actions={[
                  <Button onClick={() => handleEditClick(i)}>
                    <EditTwoTone key="edit" /> Chỉnh sửa
                  </Button>,
                  <Button onClick={() => handleDeleteClick(i)} icon={<DeleteOutlined />} danger>
                    Xóa
                  </Button>,
                ]}
              >
                <Meta title="Quyết định" description="Mô tả về loại văn bản" />
              </CardAnt>
            </Col>
          ))}
        </Row>
      </Card>
    </>
  );
}
