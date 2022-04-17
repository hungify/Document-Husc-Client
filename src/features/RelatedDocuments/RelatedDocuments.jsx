import { DownloadOutlined, ExpandOutlined } from "@ant-design/icons";
import { Avatar, Badge, Card, Col, List, Row, Typography } from "antd";
import ButtonFlexible from "components/ButtonTooltip";
import { saveAs } from "file-saver";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import pdfFile from "assets/pdf/test.pdf";

const WrapCard = styled(Card)`
  background-color: rgba(248, 250, 252, 1);
`;

const CardItemAnt = styled(Card)`
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
`;

const listData = [];
for (let i = 0; i < 10; i++) {
  listData.push({
    id: new Date().getTime() + i,
    title: `21/NQ-HĐĐH : Nghị quyết về việc công nhận Hiệu trưởng Trường Đại học Y - Dược, Đại học Huế nhiệm kỳ 2020 - 2025`,
    avatar: "Admin",
    textNumber: "21/NQ-HĐĐH",
    signer: "Nguyễn Vũ Quốc Huy",
    dateIssued: "2020-05-01",
    authorityIssuing: "Đại Học Huế",
    urgency: "Bình thường",
    content:
      "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
  });
}

export default function RelatedDocuments() {
  const handlePreviewFileClick = (item) => {
    window.open(item, {
      target: "_blank",
      rel: "noopener noreferrer",
    });
  };
  const handleSaveFileClick = (item) => {
    saveAs(item, "name_cua_file.pdf");
  };

  return (
    <WrapCard bordered={false}>
      <List
        itemLayout="vertical"
        size="default"
        pagination={{
          pageSize: 10,
          defaultCurrent: 1,
          hideOnSinglePage: true,
          onChange: (page) => {
            console.log(page);
          },
        }}
        dataSource={listData}
        renderItem={(item) => (
          <List.Item>
            <Badge.Ribbon text="Bình thường" color="green" key={item.id}>
              <CardItemAnt bordered={false}>
                <Row align="middle" justify="space-between">
                  <Col span={24}>
                    <List.Item.Meta
                      avatar={<Avatar size="large">{item.avatar.charAt(0).toUpperCase()}</Avatar>}
                      title={<Link to={`/detail/${item.id}`}>{item.title}</Link>}
                    />
                  </Col>
                  <Col span={7}>
                    <Typography.Title level={5}>
                      Số hiệu văn bản:
                      <Typography.Text keyboard>{item.textNumber}</Typography.Text>
                    </Typography.Title>
                  </Col>
                  <Col span={7}>
                    <Typography.Title level={5}>
                      Người ký: <Typography.Text keyboard>{item.signer}</Typography.Text>
                    </Typography.Title>
                  </Col>
                  <Col span={7}>
                    <Typography.Title level={5}>
                      Ngày Ban hành: <Typography.Text keyboard>{item.dateIssued}</Typography.Text>
                    </Typography.Title>
                  </Col>
                  <Col span={1}>
                    <Typography.Title level={5}>
                      <ButtonFlexible
                        type="primary"
                        shape="round"
                        icon={<ExpandOutlined />}
                        onButtonClick={handlePreviewFileClick}
                        document={pdfFile}
                      />
                    </Typography.Title>
                  </Col>
                  <Col span={1}>
                    <Typography.Title level={5}>
                      <ButtonFlexible
                        type="primary"
                        shape="round"
                        icon={<DownloadOutlined />}
                        onButtonClick={handleSaveFileClick}
                        document={pdfFile}
                      />
                    </Typography.Title>
                  </Col>
                </Row>
              </CardItemAnt>
            </Badge.Ribbon>
          </List.Item>
        )}
      />
    </WrapCard>
  );
}
