import {
  DeleteTwoTone,
  EditTwoTone,
  ExclamationCircleOutlined,
  PlusCircleTwoTone,
} from "@ant-design/icons";
import { Button, Card, Col, Modal, notification, Row, Typography } from "antd";
import Meta from "antd/lib/card/Meta";
import AddEditAgency from "features/Manage/ManageAgencies/AddEditAgencies";
import React from "react";
import styled from "styled-components";

const CardAnt = styled(Card)`
  &:hover {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    background-color: #fafafa;
  }
`;

export default function ManageAgencies() {
  const [visible, setVisible] = React.useState(false);
  const [agencyId, setAgencyId] = React.useState(null);

  const handleOnSubmit = (values) => {
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
      },
    });
  };

  return (
    <Card
      title={<Typography.Text strong>20 cơ quan ban hành</Typography.Text>}
      extra={
        <Button onClick={handleAddClick} type="primary" key="add_agency">
          <PlusCircleTwoTone key="edit" /> Thêm mới
        </Button>
      }
    >
      <AddEditAgency
        agencyId={agencyId}
        visible={visible}
        onSubmit={handleOnSubmit}
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
                <Button onClick={() => handleDeleteClick()}>
                  <DeleteTwoTone /> Xóa
                </Button>,
              ]}
            >
              <Meta title="Đại học khoa học Huế" description="Mô tả về cơ quan" />
            </CardAnt>
          </Col>
        ))}
      </Row>
    </Card>
  );
}
