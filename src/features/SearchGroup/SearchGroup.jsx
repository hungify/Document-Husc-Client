import { CaretRightOutlined } from "@ant-design/icons";
import { Card, Col, Collapse, Form, Row, Typography } from "antd";
import SearchBox from "features/SearchGroup/components/SearchBox";
import SearchFilter from "features/SearchGroup/components/SearchFilter";
import SearchTime from "features/SearchGroup/components/SearchTime";
import React from "react";
import styled from "styled-components";
const Wrapper = styled.div``;

const CardAnt = styled(Card)`
  background-color: rgba(248, 250, 252, 1);
`;

const CardForm = styled(CardAnt)``;

const CollapseAnt = styled(Collapse)`
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  .ant-collapse-header {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  }
`;
const CollapsePanelAnt = styled(Collapse.Panel)``;

export default function SearchGroup() {
  const [typesOfDocument, setTypesOfDocument] = React.useState([]);
  const [categoryOfDocument, setCategoryOfDocument] = React.useState();
  const [agencyOfDocument, setAgencyDocument] = React.useState([]);

  const [form] = Form.useForm();

  const handleFormSearchSubmit = (values) => {
    console.log("🚀 :: values", values);
  };

  const handleTypesOfDocumentSelect = (value) => {
    setTypesOfDocument(value);
  };
  const handleAgencySelect = (value) => {
    setAgencyDocument(value);
  };
  const handleCategorySelect = (value) => {
    setCategoryOfDocument(value);
  };
  const handleCategoryDeSelect = (value) => {
    setCategoryOfDocument(value);
  };

  return (
    <Wrapper>
      <CardForm bordered={false}>
        <CollapseAnt
          bordered={false}
          expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        >
          <CollapsePanelAnt header={<Typography.Text strong>Lọc và tìm kiếm</Typography.Text>}>
            <SearchFilter
              typesOfDocument={typesOfDocument}
              onTypesOfDocumentSelect={handleTypesOfDocumentSelect}
              categoryOfDocument={categoryOfDocument}
              onCategoryDeSelect={handleCategoryDeSelect}
              onCategorySelect={handleCategorySelect}
              agencyOfDocument={agencyOfDocument}
              onAgencySelect={handleAgencySelect}
            />
            <Row gutter={[0, 10]} style={{ marginTop: 5 }}>
              <Col span={24}>
                <Typography.Text strong>Tìm theo</Typography.Text>
              </Col>
              <Col span={24}>
                <Form form={form} name="lookupDocument" onFinish={handleFormSearchSubmit}>
                  <Row>
                    <Col span={11}>
                      <SearchTime />
                    </Col>
                    <Col span={13}>
                      <SearchBox />
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </CollapsePanelAnt>
        </CollapseAnt>
      </CardForm>
    </Wrapper>
  );
}
