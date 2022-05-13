import { CaretRightOutlined } from "@ant-design/icons";
import { Card, Col, Collapse, Form, Row, Typography } from "antd";
import SearchBox from "features/SearchGroup/components/SearchBox";
import SearchFilter from "features/SearchGroup/components/SearchFilter";
import SearchTime from "features/SearchGroup/components/SearchTime";
import { setFiltersBy, setSearchForm } from "features/SearchGroup/searchGroupSlice";
import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import dayjs from "dayjs";

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
  const [typesOfDocument, setTypesOfDocument] = React.useState(null);
  const [category, setCategory] = React.useState();
  const [agency, setAgency] = React.useState(null);
  const dispatch = useDispatch();

  const handleFormSearchSubmit = (values) => {
    const { start, end, orderBy, searchText, searchBy } = values;
    const startDate = start && dayjs(start).format("YYYY/MM/DD");
    const endDate = end && dayjs(end).format("YYYY/MM/DD");
    dispatch(
      setSearchForm({
        start: startDate,
        end: endDate,
        orderBy,
        searchText,
        searchBy,
        triggerBy: "documents",
      })
    );
  };

  const handleTypesOfDocumentSelect = (value) => {
    dispatch(setFiltersBy({ typesOfDocument: value, triggerBy: "documents" }));
    setTypesOfDocument(value);
  };
  const handleTypesOfDocumentDeselect = (value) => {
    if (typesOfDocument === value) {
      dispatch(setFiltersBy({ typesOfDocument: null, triggerBy: "documents" }));
      setTypesOfDocument(null);
    }
  };
  const handleAgencySelect = (value) => {
    dispatch(setFiltersBy({ agency: value, triggerBy: "documents" }));
    setAgency(value);
  };
  const handleAgencyDeselect = (value) => {
    if (value === agency) {
      dispatch(setFiltersBy({ agency: null, triggerBy: "documents" }));
      setAgency(null);
    }
  };
  const handleCategorySelect = (value) => {
    if (value) {
      dispatch(setFiltersBy({ category: value, triggerBy: "documents" }));
      setCategory(value);
    } else {
      dispatch(setFiltersBy({ category: null, triggerBy: "documents" }));
      setCategory(null);
    }
  };

  const handleDatePickerChange = (value, dateString) => {
    console.log("From: ", value, ", to: ", dateString);
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
              onTypesOfDocumentDeselect={handleTypesOfDocumentDeselect}
              category={category}
              onCategorySelect={handleCategorySelect}
              agency={agency}
              onAgencySelect={handleAgencySelect}
              onAgencyDeselect={handleAgencyDeselect}
            />
            <Row gutter={[0, 10]} style={{ marginTop: 5 }}>
              <Col span={24}>
                <Typography.Text strong>Tìm theo</Typography.Text>
              </Col>
              <Col span={24}>
                <Form name="lookupDocument" onFinish={handleFormSearchSubmit}>
                  <Row>
                    <Col span={11}>
                      <SearchTime onDatePickerChange={handleDatePickerChange} />
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
