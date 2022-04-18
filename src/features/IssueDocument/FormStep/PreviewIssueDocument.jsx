import { Avatar, Badge, Card, Col, List, Row, Space, Table, Tag, Typography } from "antd";
import pdfFile from "assets/pdf/test.pdf";
import BadgeRibbonAgency from "components/BadgeRibbonUrgent";
import ListDocument from "components/DocumentList";
import DocumentSummary from "components/DocumentSummary";
import ListUploaded from "features/IssueDocument/components/ListUploaded";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 10px 20px;
`;
const WrapForm = styled.div`
  padding: 20px;
  box-shadow: 0 0 40px rgb(0 0 0 / 16%);
  border-radius: 12px;
`;

const CardAnt = styled(Card)`
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;

const CardItemAnt = styled(Card)`
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  :not(:last-child) {
    margin-bottom: 10px;
  }
`;

const columnsClassification = [
  {
    title: "Loại văn bản",
    key: "typeOfDocument",
    dataIndex: "typeOfDocument",
  },
  {
    title: "Cơ quan ban hành",
    dataIndex: "agencyIssued",
    key: "agencyIssued",
  },
  {
    title: "Chuyên mục",
    dataIndex: "category",
    key: "category",
  },
];

const dataClassification = [
  {
    key: "1",
    typesOfDocument: "Văn bản chính",
    agencyIssued: "Đại Học Huế",
    category: "Đạo tạo đại học",
  },
];

const columnsProperty = [
  {
    title: "Số hiệu văn bản",
    dataIndex: "textNumber",
    key: "textNumber",
  },
  {
    title: "Ngày ban hành",
    dataIndex: "dateIssued",
    key: "dateIssued",
  },

  {
    title: "Người ký",
    dataIndex: "signer",
    key: "signer",
  },

  {
    title: "Mức độ khẩn",
    dataIndex: "degreeOfUrgency",
    key: "degreeOfUrgency",
    render: (text) => {
      if (text === "Bình thường") return <Tag color="green">Bình thường</Tag>;
      else if (text === "Khẩn cấp") return <Tag color="red">Khẩn</Tag>;
    },
  },
];

const dataProperty = [
  {
    key: "1",
    textNumber: "21/NQ-HĐĐH",
    dateIssued: "01/01/2020",
    signer: "Nguyễn Quỳnh Chương",
    degreeOfUrgency: "Bình thường",
  },
];

const dataContent = [
  {
    title: "Ant Design Title 1",
    content:
      "Ant Design, a design language for background applications, is refined by Ant UED Team.",
    fileList: [
      {
        fileName: "name1.pdf",
        fileUrl: pdfFile,
      },
      {
        fileName: "name1.pdf",
        fileUrl: pdfFile,
      },
      {
        fileName: "name1.pdf",
        fileUrl: pdfFile,
      },
    ],
  },
];

const columnsRelatedDocument = [
  {
    title: "Cơ quan ban hành",
    dataIndex: "agencyIssued",
    key: "agencyIssued",
  },
  {
    title: "Số hiệu văn bản",
    dataIndex: "textNumber",
    key: "textNumber",
  },
  {
    title: "Ngày ban hành",
    dataIndex: "dateIssued",
    key: "dateIssued",
  },
  {
    title: "Chuyên mục",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Người ký",
    dataIndex: "signer",
    key: "signer",
  },
  {
    title: "Loại văn bản",
    key: "typeOfDocument",
    dataIndex: "typeOfDocument",
  },
];
const dataRelatedDocument = [];
for (let i = 0; i < 2; i++) {
  dataRelatedDocument.push({
    id: new Date().getTime() + i,
    title: `21/NQ-HĐĐH : Nghị quyết về việc công nhận Hiệu trưởng Trường Đại học Y - Dược, Đại học Huế nhiệm kỳ 2020 - 2025`,
    avatar: "Admin",
    textNumber: "21/NQ-HĐĐH",
    typeOfDocument: "Nghị quuyết",
    signer: "Nguyễn Vũ Quốc Huy",
    dateIssued: "2020-05-01",
    category: "Đạo tạo đại học",
    agencyIssued: "Đại Học Huế",
    urgency: i % 2 === 0 ? "Bình thường" : "Khẩn",
    content:
      "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
  });
}

export default function PreviewIssueDocument({ form, onSubmitForm, formValues }) {
  return (
    <Container>
      <Row>
        <Col span={24}>
          <WrapForm>
            <CardAnt title={<Typography.Text strong>Thông tin phân loại văn bản</Typography.Text>}>
              <Table
                columns={columnsClassification}
                dataSource={dataClassification}
                pagination={false}
              />
            </CardAnt>
            <CardAnt title={<Typography.Text strong>Thuộc tính của văn bản</Typography.Text>}>
              <Table columns={columnsProperty} dataSource={dataProperty} pagination={false} />
            </CardAnt>

            <CardAnt title={<Typography.Text strong>Nội dung của văn bản</Typography.Text>}>
              <Row>
                {dataContent.map((item, index) => (
                  <>
                    <Col span={18}>
                      <Typography.Title level={5}>{item.title}</Typography.Title>
                      <Typography.Paragraph>{item.content}</Typography.Paragraph>
                    </Col>
                    <Col span={6}>
                      <Typography.Title level={5}>Danh sách tệp</Typography.Title>
                      <ListUploaded fileList={item.fileList} />
                    </Col>
                  </>
                ))}
              </Row>
            </CardAnt>

            <CardAnt title={<Typography.Text strong>Văn bản liên quan</Typography.Text>}>
              <List
                itemLayout="vertical"
                pagination={{
                  pageSize: 10,
                  defaultCurrent: 1,
                  hideOnSinglePage: true,
                }}
                dataSource={dataRelatedDocument}
                renderItem={(item) => (
                  <CardItemAnt>
                    <List.Item key={item.id}>
                      <BadgeRibbonAgency text={item.urgency} key={item.id}>
                        <Row align="middle" justify="space-between">
                          <Col span={24}>
                            <List.Item.Meta
                              avatar={
                                <Avatar size="large">{item.avatar.charAt(0).toUpperCase()}</Avatar>
                              }
                              title={item.title}
                            />
                          </Col>
                          <Col span={24}>
                            <Table
                              columns={columnsRelatedDocument}
                              dataSource={[item]}
                              pagination={false}
                              bordered
                            />
                          </Col>
                        </Row>
                      </BadgeRibbonAgency>
                    </List.Item>
                  </CardItemAnt>
                )}
              />
            </CardAnt>
          </WrapForm>
        </Col>
      </Row>
    </Container>
  );
}
