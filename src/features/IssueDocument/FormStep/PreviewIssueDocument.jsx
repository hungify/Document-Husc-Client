import { Avatar, Card, Col, List, Row, Table, Tag, Typography } from "antd";
import pdfFile from "assets/pdf/test.pdf";
import pdfFile2 from "assets/pdf/test2.pdf";
import BadgeRibbonAgency from "components/BadgeRibbonUrgent";
import { selectConfig } from "configs/select";
import ListUploaded from "features/IssueDocument/components/ListUploaded";
import _ from "lodash";
import { mockDocumentListProtect } from "mocks/documents";
import React from "react";
import styled from "styled-components";
import { findElementInTwoArray } from "utils/table";
import { findNodeByKey } from "utils/tree";
import { v4 as uuidv4 } from "uuid";

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
    key: "typesOfDocument",
    dataIndex: "typesOfDocument",
  },
  {
    title: "Cơ quan ban hành",
    dataIndex: "authorityIssued",
    key: "authorityIssued",
  },
  {
    title: "Chuyên mục",
    dataIndex: "category",
    key: "category",
  },
];

const columnsProperty = [
  {
    title: "Số hiệu văn bản",
    dataIndex: "documentNumber",
    key: "documentNumber",
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
    dataIndex: "urgentLevel",
    key: "urgentLevel",
    render: (text) => {
      if (text === "Bình thường") return <Tag color="green">Bình thường</Tag>;
      else if (text === "Khẩn cấp") return <Tag color="red">Khẩn</Tag>;
    },
  },
];

const columnsRelatedDocument = [
  {
    title: "Cơ quan ban hành",
    dataIndex: "authorityIssued",
    key: "authorityIssued",
  },
  {
    title: "Số hiệu văn bản",
    dataIndex: "documentNumber",
    key: "documentNumber",
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
    key: "typesOfDocument",
    dataIndex: "typesOfDocument",
  },
  {},
];

export default function PreviewIssueDocument({ formValues }) {
  const dataClassification = [
    {
      key: uuidv4(),
      typesOfDocument: _.find(selectConfig.typesOfDocuments, {
        value: formValues.typesOfDocuments,
      }).label,
      authorityIssued: _.find(selectConfig.authorityIssued, { value: formValues.authorityIssued })
        .label,
      category: findNodeByKey(selectConfig.categories, { value: formValues.category }).title,
    },
  ];

  const dataProperty = [
    {
      key: uuidv4(),
      urgentLevel: _.find(selectConfig.urgentLevel, { value: formValues.urgentLevel }).label,
      signer: formValues.signer,
      documentNumber: formValues.documentNumber,
      dateIssued: new Date(formValues.dateIssued).toLocaleDateString(),
    },
  ];

  const dataContent = [
    {
      title: formValues.title,
      content: formValues?.content,
      fileList: [
        {
          fileName: "name1.pdf",
          fileUrl: pdfFile,
        },
        {
          fileName: "name2.pdf",
          fileUrl: pdfFile2,
        },
      ],
    },
  ];
  const relatedDocuments = findElementInTwoArray(
    mockDocumentListProtect,
    formValues.relatedDocuments
  );

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
                bordered={true}
              />
            </CardAnt>
            <CardAnt title={<Typography.Text strong>Thuộc tính của văn bản</Typography.Text>}>
              <Table
                columns={columnsProperty}
                dataSource={dataProperty}
                pagination={false}
                bordered={true}
              />
            </CardAnt>

            <CardAnt title={<Typography.Text strong>Nội dung của văn bản</Typography.Text>}>
              <Row>
                {dataContent.map((item) => (
                  <React.Fragment key={item.key}>
                    <Col span={formValues.documentFrom === "input" ? 24 : 18}>
                      <Typography.Title level={5}>{item.title}</Typography.Title>
                      {formValues.documentFrom === "input" ? (
                        <>
                          <Typography.Paragraph>{item.content}</Typography.Paragraph>
                        </>
                      ) : (
                        <Typography.Paragraph>{item.summary}</Typography.Paragraph>
                      )}
                    </Col>
                    {formValues.documentFrom === "attach" && (
                      <Col span={6}>
                        <Typography.Title level={5}>Danh sách tệp</Typography.Title>
                        <ListUploaded fileList={item.fileList} />
                      </Col>
                    )}
                  </React.Fragment>
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
                dataSource={relatedDocuments}
                renderItem={(item) => (
                  <BadgeRibbonAgency text={item.urgentLevel} key={item.key}>
                    <CardItemAnt>
                      <List.Item key={item.key}>
                        <Row align="middle" justify="space-between">
                          <Col span={24}>
                            <List.Item.Meta
                              avatar={
                                <Avatar size="large">
                                  {item?.avatar?.charAt(0)?.toUpperCase() ?? "?"}
                                </Avatar>
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
                      </List.Item>
                    </CardItemAnt>
                  </BadgeRibbonAgency>
                )}
              />
            </CardAnt>
          </WrapForm>
        </Col>
      </Row>
    </Container>
  );
}
