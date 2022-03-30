import { Checkbox, Col, DatePicker, Input, Row, Select, TreeSelect } from "antd";
import { agencies, categories, documents } from "mocks";
import React from "react";
import styled from "styled-components";

const RowAnt = styled(Row)`
  display: flex;
  align-items: center;
`;
const SearchInput = styled(Input.Search)`
  height: 100%;
  display: block;
`;
const SelectWrapper = styled.div`
  padding: 8px 10px;
`;

const treeData = [
  {
    title: "Node1",
    value: "0-0",
    key: "0-0",
    children: [
      {
        title: "Child Node1",
        value: "0-0-0",
        key: "0-0-0",
      },
    ],
  },
  {
    title: "Node2",
    value: "0-1",
    key: "0-1",
    children: [
      {
        title: "Child Node3",
        value: "0-1-0",
        key: "0-1-0",
      },
      {
        title: "Child Node4",
        value: "0-1-1",
        key: "0-1-1",
      },
      {
        title: "Child Node5",
        value: "0-1-2",
        key: "0-1-2",
      },
    ],
  },
];
const plainOptions = ["Số hiệu văn bản"];
const defaultCheckedList = [];

export default function SearchFilter() {
  const [value, setValue] = React.useState([]);
  const [agency, setAgency] = React.useState("");
  const [document, setDocument] = React.useState("");
  const [dataDocument, setDataDocument] = React.useState(documents.data);
  const [dataAgency, setDataAgency] = React.useState(agencies.data);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [checkedList, setCheckedList] = React.useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = React.useState(true);
  const [checkAll, setCheckAll] = React.useState(false);
  const [placeholder, setPlaceholder] = React.useState("Tìm theo tiêu đề");

  const handleTreeChange = (value) => {
    setValue(value);
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
      <RowAnt>
        <Col span={8}>
          <SelectWrapper>
            <Select
              size="large"
              showSearch
              defaultActiveFirstOption={false}
              showArrow={true}
              filterOption={false}
              notFoundContent={true}
              allowClear
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
        <Col span={8}>
          <TreeSelect
            treeData={treeData}
            style={{
              width: "100%",
              height: "100%",
              padding: "8px 10px",
            }}
            size="large"
            value={value}
            onChange={handleTreeChange}
            treeCheckable={true}
            showCheckedStrategy={TreeSelect.SHOW_PARENT}
            placeholder="Chọn chuyên mục"
          />
        </Col>
        <Col span={8}>
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
      </RowAnt>
      <RowAnt>
        <Col span={4}>
          <Checkbox.Group
            options={plainOptions}
            value={checkedList}
            onChange={handleCheckboxChange}
          />
        </Col>
        <Col span={4}>
          <Select
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
            format="DD-MM-YYYY"
            onChange={handleOnDateChange}
            onOk={handleOnDateOk}
          />
        </Col>
        <Col span={9} offset={1}>
          <SearchInput
            allowClear
            placeholder={placeholder}
            enterButton="Search"
            size="large"
            onChange={handleSearchTermChange}
            value={searchTerm}
          />
        </Col>
      </RowAnt>
    </>
  );
}
