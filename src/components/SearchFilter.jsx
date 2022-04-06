import { CaretRightOutlined } from "@ant-design/icons";
import {
  Card,
  Checkbox,
  Col,
  Collapse,
  DatePicker,
  Divider,
  Form,
  Input,
  Radio,
  Row,
  Select,
  TreeSelect,
  Typography,
} from "antd";
import { agencies, categories, categoriesTree, documents } from "config/sidebar";
import React from "react";
import styled from "styled-components";

const SearchInput = styled(Input.Search)`
  height: 100%;
  display: block;
`;
const SelectWrapper = styled.div`
  padding: 8px 10px;
`;

const plainOptions = ["Số hiệu văn bản"];
const defaultCheckedList = [];

export default function SearchFilter() {
  const [categoriesTreeValue, setCategoriesTreeValue] = React.useState([]);
  const [agency, setAgency] = React.useState("");
  const [document, setDocument] = React.useState("");
  const [dataDocument, setDataDocument] = React.useState(documents.data);
  const [dataAgency, setDataAgency] = React.useState(agencies.data);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [checkedList, setCheckedList] = React.useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = React.useState(true);
  const [checkAll, setCheckAll] = React.useState(false);
  const [placeholder, setPlaceholder] = React.useState("Tìm theo tiêu đề");

  const handleTreeCategoryChange = (value) => {
    setCategoriesTreeValue(value);
  };

  const handleSearchDocument = (value) => {
    if (value) {
      setDataDocument(dataDocument.filter((item) => item.value.includes(value)));
    } else {
      setDataDocument(categories.data);
    }
  };

  const handleChangeDocument = (value) => {
    setDocument(value);
  };

  const handleChangeAgency = (value) => {
    setAgency(value);
  };

  const handleSearchAgency = (value) => {
    if (value) {
      setDataAgency(dataAgency.filter((item) => item.value.includes(value)));
    } else {
      setDataAgency(agencies.data);
    }
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleCheckboxChange = (list) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
    if (list.length === 0) {
      setPlaceholder("Tìm theo tiêu đề");
    } else {
      setPlaceholder(`Tìm theo ${list.join(", ")}`);
    }
  };

  const handleSelectDateChange = (value) => {};
  const handleOnDateChange = (value) => {};
  const handleOnDateOk = (value) => {};
  return (
    <>
      <Row align="middle">
        <Col flex={1}>
          <Radio.Group size="large">
            <Radio value={1}>Tất cả</Radio>
            <Radio value={2}>Chính xác cụm từ</Radio>
          </Radio.Group>
          <Checkbox.Group
            options={plainOptions}
            value={checkedList}
            onChange={handleCheckboxChange}
          />
        </Col>
        <Col flex={4}>
          <SearchInput
            allowClear
            placeholder={placeholder}
            enterButton="Search"
            size="large"
            onChange={handleSearchTermChange}
            value={searchTerm}
          />
        </Col>
      </Row>
      <Collapse
        bordered={false}
        defaultActiveKey={["1"]}
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
      >
        <Collapse.Panel
          header={
            <Typography.Text keyboard strong>
              Tìm kiếm nâng cao
            </Typography.Text>
          }
        >
          <Row>
            <Col span={7}>
              <SelectWrapper>
                <Select
                  size="large"
                  defaultActiveFirstOption={false}
                  showArrow={true}
                  filterOption={false}
                  notFoundContent={true}
                  allowClear={true}
                  showSearch={true}
                  onSearch={handleSearchDocument}
                  onChange={handleChangeDocument}
                  style={{ width: "100%" }}
                  placeholder="Chọn loại văn bản"
                >
                  {dataDocument.map((document) => (
                    <Select.Option key={document.id} value={document.value}>
                      {document.value}
                    </Select.Option>
                  ))}
                </Select>
              </SelectWrapper>
            </Col>
            <Col span={10}>
              <SelectWrapper>
                <TreeSelect
                  treeData={categoriesTree}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  size="large"
                  value={categoriesTreeValue}
                  onChange={handleTreeCategoryChange}
                  treeCheckable={true}
                  showCheckedStrategy={TreeSelect.SHOW_PARENT}
                  placeholder="Chọn chuyên mục"
                />
              </SelectWrapper>
            </Col>
            <Col span={7}>
              <SelectWrapper>
                <Select
                  size="large"
                  showSearch
                  defaultActiveFirstOption={false}
                  showArrow={true}
                  filterOption={false}
                  notFoundContent={true}
                  allowClear
                  onSearch={handleSearchAgency}
                  onChange={handleChangeAgency}
                  style={{ width: "100%" }}
                  placeholder="Chọn cơ quan ban hành"
                >
                  {dataAgency.map((agency) => (
                    <Select.Option key={agency.id} value={agency.value}>
                      {agency.value}
                    </Select.Option>
                  ))}
                </Select>
              </SelectWrapper>
            </Col>
          </Row>
          <Divider />
          <Row justify="space-around">
            <Col span={6}>
              <Select
                style={{
                  width: "100%",
                }}
                size="large"
                onChange={handleSelectDateChange}
                defaultValue="Ngày phát hành"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Select.Option value="Ngày phát hành">Ngày phát hành</Select.Option>
                <Select.Option value="Ngày cập nhật">Ngày cập nhật</Select.Option>
                <Select.Option value="Ngày áp dụng">Ngày áp dụng</Select.Option>
              </Select>
            </Col>
            <Col span={6}>
              <DatePicker.RangePicker
                size="large"
                format="DD/MM/YYYY"
                onChange={handleOnDateChange}
                onOk={handleOnDateOk}
              />
            </Col>
          </Row>
        </Collapse.Panel>
      </Collapse>
    </>
  );
}
