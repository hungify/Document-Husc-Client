import { Avatar, Card, Col, Empty, List, Row, Table, Typography } from "antd";
import { getAgenciesConfig } from "app/selectors/agencies";
import { getCategoriesTreeConfig } from "app/selectors/categories";
import { getRelatedDocuments } from "app/selectors/documents";
import { getTypesOfDocumentsConfig } from "app/selectors/typesOfDocuments";
import { getUrgentLevelsConfig } from "app/selectors/urgentLevels";
import { getFiles } from "app/selectors/documentDetails";
import BadgeRibbonAgency from "components/BadgeRibbonUrgent";
import dayjs from "dayjs";
import ListUploaded from "features/ManageDocuments/components/ListUploaded";
import { fetchDocumentByIds } from "features/ManageDocuments/documentsSlice";
import _ from "lodash";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { findNodeByKey } from "utils/tree";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";

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

const keysPropertyShouldBe = [
  {
    key: "signer",
    label: "Người ký",
  },
  {
    key: "documentNumber",
    label: "Số văn bản",
  },
  {
    key: "issueDate",
    label: "Ngày ban hành",
  },
];
const keysClassificationShouldBe = [
  {
    key: "typesOfDocument",
    label: "Loại văn bản",
  },
  {
    key: "agency",
    label: "Cơ quan ban hành",
  },
  {
    key: "category",
    label: "Chuyên mục",
  },
];

const generateColumns = (formValues) => {
  const columnsProperty = [];
  const columnsClassification = [];
  const keysProperty = keysPropertyShouldBe.map((item) => item.key);
  const keysClassification = keysClassificationShouldBe.map((item) => item.key);

  const keys = Object?.keys(formValues);
  keys.forEach((key) => {
    if (keysProperty.includes(key)) {
      columnsProperty.push({
        title: keysPropertyShouldBe.find((item) => item.key === key).label,
        dataIndex: key,
        render: (text) => (key === "issueDate" ? dayjs(text).format("DD/MM/YYYY") : text),
      });
    } else if (keysClassification.includes(key)) {
      columnsClassification.push({
        title: keysClassificationShouldBe.find((item) => item.key === key).label,
        dataIndex: key,
        render: (text) => text.title || text.label,
      });
    }
  });
  return {
    columnsClassification,
    columnsProperty,
  };
};

export default function PreviewIssueDocument({ formValues }) {
  const dispatch = useDispatch();
  const agenciesConfig = useSelector(getAgenciesConfig);
  const categoriesConfig = useSelector(getCategoriesTreeConfig);
  const typesOfDocumentsConfig = useSelector(getTypesOfDocumentsConfig);
  const urgentLevelsConfig = useSelector(getUrgentLevelsConfig);
  const { slug } = useParams();

  React.useEffect(() => {
    if (formValues) {
      dispatch(fetchDocumentByIds(formValues.relatedDocuments));
    }
  }, [dispatch, formValues]);

  const columns = !_.isEmpty(formValues) && generateColumns(formValues);

  const dataClassification = [
    {
      key: uuidv4(),
      typesOfDocument: _.find(typesOfDocumentsConfig, {
        value: formValues?.typesOfDocument,
      }),
      agency: _.find(agenciesConfig, { value: formValues?.agency }),
      category: findNodeByKey(categoriesConfig, { value: formValues?.category }),
    },
  ];

  const dataProperty = [
    {
      key: uuidv4(),
      urgentLevel: _.find(urgentLevelsConfig, { value: formValues?.urgentLevel }),
      signer: formValues?.signer,
      documentNumber: formValues?.documentNumber,
      issueDate: formValues?.issueDate,
    },
  ];

  const dataContent = [
    {
      key: uuidv4(),
      title: formValues?.title,
      content: formValues?.content,
      summary: formValues?.summary,
      fileList: slug ? formValues?.files : formValues?.files?.fileList,
    },
  ];

  const relatedDocuments = useSelector(getRelatedDocuments) || [];

  return (
    <Container>
      <Row>
        <Col span={24}>
          <WrapForm>
            <CardAnt title={<Typography.Text strong>Thông tin phân loại văn bản</Typography.Text>}>
              <Table
                columns={columns.columnsClassification}
                dataSource={dataClassification}
                pagination={false}
                bordered={true}
              />
            </CardAnt>
            <CardAnt title={<Typography.Text strong>Thuộc tính của văn bản</Typography.Text>}>
              <Table
                columns={columns.columnsProperty}
                dataSource={dataProperty}
                pagination={false}
                bordered={true}
              />
            </CardAnt>

            <CardAnt title={<Typography.Text strong>Nội dung của văn bản</Typography.Text>}>
              <Row>
                {dataContent.map((item) => (
                  <React.Fragment key={item.key}>
                    <Col span={formValues?.documentFrom === "input" ? 24 : 17}>
                      <Typography.Title level={5}>{item.title}</Typography.Title>
                      {formValues?.documentFrom === "input" ? (
                        <Typography.Paragraph>{item?.content}</Typography.Paragraph>
                      ) : (
                        <Typography.Paragraph>{item?.summary}</Typography.Paragraph>
                      )}
                    </Col>
                    {formValues?.documentFrom === "attach" && (
                      <Col span={7}>
                        <Typography.Title level={5}>Danh sách tệp</Typography.Title>
                        <ListUploaded fileList={item?.fileList} />
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
                locale={{
                  emptyText: <Empty description="Danh sách trống" />,
                }}
                dataSource={relatedDocuments}
                renderItem={(item) => (
                  <BadgeRibbonAgency
                    text={item.urgentLevel.label}
                    key={item._id}
                    colorTag={item.urgentLevel.colorTag}
                  >
                    <CardItemAnt>
                      <List.Item>
                        <Row align="middle" justify="space-between">
                          <Col span={24}>
                            <List.Item.Meta
                              avatar={
                                <Avatar size="large">
                                  {item?.publisher?.username?.charAt(0)?.toUpperCase() ?? "?"}
                                </Avatar>
                              }
                              title={item.title}
                            />
                          </Col>
                          <Col span={24}>
                            <Table
                              columns={[
                                ...columns.columnsClassification,
                                ...columns.columnsProperty,
                              ]}
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
