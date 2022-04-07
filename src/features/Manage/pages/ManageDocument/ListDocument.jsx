import {
  DeleteTwoTone,
  EditTwoTone,
  PlusCircleTwoTone,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  List,
  Row,
  Tooltip,
  Typography,
  notification,
  Modal,
  Input,
} from "antd";
import pdfFile from "assets/pdf/test.pdf";
import DropdownFilter from "components/DropdownFilter";
import { dropdownConfig } from "config/dropdown";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import SearchFilter from "components/SearchFilter";

const ColAnt = styled(Col)``;

const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    id: new Date().getTime() + i,
    title: `21/NQ-HĐĐH : Nghị quyết về việc công nhận Hiệu trưởng Trường Đại học Y - Dược, Đại học Huế nhiệm kỳ 2020 - 2025: Ông Nguyễn Vũ Quốc Huy`,
    avatar: "https://joeschmoe.io/api/v1/random",
    description:
      "21/NQ-HĐĐH : Nghị quyết về việc công nhận Hiệu trưởng Trường Đại học Y - Dược, Đại học Huế nhiệm kỳ 2020 - 2025: Ông Nguyễn Vũ Quốc Huy",
    content:
      "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
  });
}

export default function ListDocument() {
  const navigate = useNavigate();
  const handleCreateClick = () => {
    navigate("post");
  };
  const handleEditClick = (item) => {
    navigate(`edit/${item.id}`);
  };
  const handleDeleteClick = (item) => {
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
    <Row>
      <ColAnt span={24}>
        <Card
          extra={
            <Tooltip title="Thêm mới môt văn bản?">
              <Button icon={<PlusCircleTwoTone />} type="default" onClick={handleCreateClick}>
                Thêm mới
              </Button>
            </Tooltip>
          }
        >
          <Row gutter={[0, 20]} align="middle">
            <Col span={24}>
              <SearchFilter />
            </Col>
            <Col span={20}>
              <Typography.Text strong>Có tất cả 123 Văn bản</Typography.Text>
            </Col>
            <Col
              span={4}
              style={{
                width: "100%",
                textAlign: "right",
              }}
            >
              <DropdownFilter dataRender={dropdownConfig.documentFilter} />
            </Col>
            <Col span={24}>
              <List
                itemLayout="vertical"
                size="default"
                pagination={{
                  pageSize: 10,
                  onChange: (page) => {
                    console.log(page);
                  },
                  style: {
                    textAlign: "center",
                  },
                }}
                dataSource={listData}
                renderItem={(item) => (
                  <Badge.Ribbon text="Bình thường" color="green" key={item.id}>
                    <Card>
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar src={item.avatar} />}
                          title={<Link to={`/d/${item.id}`}>{item.title}</Link>}
                          description={item.description}
                        />
                        <Row>
                          <Col span={6}>
                            <Typography.Title level={5}>
                              Ban hành: <Typography.Text keyboard>20/02/2022</Typography.Text>
                            </Typography.Title>
                            <Typography.Title level={5}>
                              Số ký hiệu: <Typography.Text keyboard>21/NQ-HĐĐH</Typography.Text>
                            </Typography.Title>
                            <Typography.Title level={5}>
                              Loại văn bản: <Typography.Text keyboard>Nghị Quyết</Typography.Text>
                            </Typography.Title>
                          </Col>
                          <Col span={8}>
                            <Typography.Title level={5}>
                              Cơ quan ban hành:{" "}
                              <Typography.Text keyboard>Đại học Huế</Typography.Text>
                            </Typography.Title>
                            <Typography.Title level={5}>
                              Người ký: <Typography.Text keyboard>Huỳnh Văn Chương</Typography.Text>
                            </Typography.Title>
                            <Typography.Title level={5}>
                              Số lượng tệp: <Typography.Text keyboard>1</Typography.Text>
                              số trang: <Typography.Text keyboard>2</Typography.Text>
                            </Typography.Title>
                          </Col>
                          <Col span={10}>
                            <Typography.Title level={5}>
                              Tệp đính kèm:
                              <Typography.Text keyboard>{pdfFile.split(1, 10)}</Typography.Text>
                            </Typography.Title>
                            <Row>
                              <Col span={11} offset={2}>
                                <Typography.Title level={5}>
                                  <Tooltip title="Cập nhật thông tin văn bản này?">
                                    <Button
                                      onClick={() => handleEditClick(item)}
                                      icon={<EditTwoTone twoToneColor="#FDF6EC" />}
                                      type="primary"
                                    >
                                      Chỉnh sửa
                                    </Button>
                                  </Tooltip>
                                </Typography.Title>
                              </Col>
                              <Col span={11}>
                                <Tooltip title="Xóa văn bản này?">
                                  <Button
                                    onClick={() => handleDeleteClick(item)}
                                    icon={<DeleteTwoTone twoToneColor="#FD5D5D" />}
                                    danger
                                    type="dashed"
                                  >
                                    Xóa
                                  </Button>
                                </Tooltip>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </List.Item>
                    </Card>
                  </Badge.Ribbon>
                )}
              />
            </Col>
          </Row>
        </Card>
      </ColAnt>
    </Row>
  );
}
