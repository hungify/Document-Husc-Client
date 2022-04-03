import { DeleteTwoTone, EditTwoTone, ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Card, Col, Modal, notification, Row, Typography } from "antd";
import Meta from "antd/lib/card/Meta";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ManageCategory() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleCreateClick = () => {
    navigate("post");
  };

  const handleEditClick = (id) => {
    navigate(`post/${id}`);
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
        title={<Typography.Text>Có 20 chuyên mục</Typography.Text>}
        extra={<Button onClick={handleCreateClick}>Tạo mới</Button>}
      >
        <Row gutter={[8, 8]}>
          {Array.from(Array(20).keys()).map((item, i) => (
            <Col key={i} xs={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
              <Card
                actions={[
                  <EditTwoTone key="edit" onClick={() => handleEditClick(i)} />,
                  <DeleteTwoTone key="delete" onClick={() => handleDeleteClick()} />,
                ]}
              >
                <Meta title="Hành chính - Tổng hợp" description="Mô tả về chuyên mục" />
              </Card>
            </Col>
          ))}
        </Row>
      </Card>
    </>
  );
}
