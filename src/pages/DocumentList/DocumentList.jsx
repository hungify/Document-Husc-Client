import { ExpandOutlined, LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  Divider,
  Layout,
  List,
  Row,
  Space,
  Typography,
} from "antd";
import pdfFile from "assets/pdf/test.pdf";
import { SaveFile } from "components/SaveFile/SaveFile";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
const RowAnt = styled(Row)`
  margin-top: 20px;
`;
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

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);
export default function DocumentList() {
  return (
    <Layout>
      <RowAnt>
        <ColAnt span={24}>123 Văn bản</ColAnt>
        <Divider
          type="horizontal"
          style={{
            width: "100%",
          }}
        />
      </RowAnt>
      <Row>
        <ColAnt span={24}>
          <List
            itemLayout="vertical"
            size="small"
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 10,
            }}
            dataSource={listData}
            renderItem={(item) => (
              <Badge.Ribbon text="Bình thường" color="green" key={item.id}>
                <Card>
                  <List.Item
                    actions={[
                      <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                      <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                      <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                    ]}
                  >
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
                          Cơ quan ban hành: <Typography.Text keyboard>Đại học Huế</Typography.Text>
                        </Typography.Title>
                        <Typography.Title level={5}>
                          Người ký: <Typography.Text keyboard>Huỳnh Văn Chương</Typography.Text>
                        </Typography.Title>
                        <Typography.Title level={5}>
                          Số trang: <Typography.Text keyboard>2</Typography.Text>
                        </Typography.Title>
                      </Col>
                      <Col span={10}>
                        <Typography.Title level={5}>
                          File đính kèm:
                          <Typography.Text keyboard>{pdfFile}</Typography.Text>
                        </Typography.Title>
                        <Row>
                          <Col span={11}>
                            <Typography.Title level={5}>
                              <Button
                                type="primary"
                                shape="round"
                                icon={<ExpandOutlined />}
                                size={"large"}
                                onClick={() => {
                                  window.open(pdfFile, {
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                  });
                                }}
                              >
                                Xem trước
                              </Button>
                            </Typography.Title>
                          </Col>
                          <Col span={11} offset={2}>
                            <Typography.Title level={5}>
                              <SaveFile file={pdfFile} />
                            </Typography.Title>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </List.Item>
                </Card>
              </Badge.Ribbon>
            )}
          />
        </ColAnt>
      </Row>
    </Layout>
  );
}
