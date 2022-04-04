import { DeleteTwoTone, EditTwoTone, ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Card, Col, Modal, notification, Row, Typography } from "antd";
import Meta from "antd/lib/card/Meta";
import React from "react";
import AddEditAgency from "./AddEditAgency";

export default function ManageAgency() {
  const [visible, setVisible] = React.useState(false);
  const [agencyId, setAgencyId] = React.useState(null);

  const handleOnSubmit = (values) => {
    console.log("Received values of form: ", values);
    setVisible(false);
  };

  const handleAddClick = () => {
    setAgencyId(null);
    setVisible(true);
  };

  const handleEditClick = (id) => {
    setAgencyId(id);
    setVisible(true);

    // navigate(`post/${id}`);
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
        title={<Typography.Text>Có 20 cơ quan</Typography.Text>}
        extra={<Button onClick={handleAddClick}>Tạo mới</Button>}
      >
        <AddEditAgency
          agencyId={agencyId}
          visible={visible}
          onCreate={handleOnSubmit}
          onCancel={() => {
            setVisible(false);
          }}
        />
        <Row>
          {Array.from(Array(20).keys()).map((item, i) => (
            <Col key={i + 1} xs={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
              <Card
                actions={[
                  <EditTwoTone key="edit" onClick={() => handleEditClick(i)} />,
                  <DeleteTwoTone key="delete" onClick={() => handleDeleteClick()} />,
                ]}
              >
                <Meta title="Đại học khoa học Huế" description="Mô tả về cơ quan" />
              </Card>
            </Col>
          ))}
        </Row>
      </Card>
    </>
  );
}
