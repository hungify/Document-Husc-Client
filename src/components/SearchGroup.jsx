import { CaretRightOutlined } from "@ant-design/icons";
import {
  Card,
  Checkbox,
  Col,
  Collapse,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Space,
  TreeSelect,
  Typography,
} from "antd";
import SearchAdvanced from "components/SearchAdvanced";
import SelectForm from "components/SelectForm";
import TreeSelectForm from "components/TreeSelectForm";
import { agencies, categories, documents } from "configs/sidebar";
import React from "react";
import styled from "styled-components";

const SearchInput = styled(Input.Search)`
  height: 100%;
  display: block;
`;
const treeData = [
  {
    title: "Node1",
    value: "0-0",
    children: [
      {
        title: "Child Node1",
        value: "0-0-1",
      },
      {
        title: "Child Node2",
        value: "0-0-2",
      },
    ],
  },
  {
    title: "Node2",
    value: "0-1",
  },
];

const plainOptions = ["Cụm từ chính xác", "Số hiệu văn bản"];

export default function SearchFilter() {
  const [categoriesTreeValue, setCategoriesTreeValue] = React.useState(categories.data);
  const [agency, setAgency] = React.useState("");
  const [document, setDocument] = React.useState("");
  const [dataDocument, setDataDocument] = React.useState(documents.data);
  const [dataAgency, setDataAgency] = React.useState(agencies.data);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [checkedList, setCheckedList] = React.useState([]);
  const [indeterminate, setIndeterminate] = React.useState(true);
  const [checkAll, setCheckAll] = React.useState(false);
  const [placeholder, setPlaceholder] = React.useState("Tìm theo tiêu đề");

  const handleDocumentTypeSelect = (value) => {
    setDocument(value);
  };

  const handleAgencySelect = (value) => {
    setAgency(value);
  };

  const handleTreeCategorySelect = (value) => {
    setCategoriesTreeValue([...categoriesTreeValue, value]);
  };

  // const handleDocumentSearch = (value) => {
  //   if (value) {
  //     setDataDocument(dataDocument.filter((item) => item.value.includes(value)));
  //   } else {
  //     setDataDocument(categories.data);
  //   }
  // };

  const handleDocumentChange = (value) => {
    setDocument(value);
  };

  const handleAgencyChange = (value) => {
    setAgency(value);
  };

  // const handleAgencySearch = (value) => {
  //   if (value) {
  //     setDataAgency(dataAgency.filter((item) => item.value.includes(value)));
  //   } else {
  //     setDataAgency(agencies.data);
  //   }
  // };

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
  function handleChange(value) {
    console.log(`selected ${value}`);
  }
  const handleSelectDateChange = (value) => {};
  const handleOnDatePickerChange = (value) => {};
  const handleOnDateOk = (value) => {};
  return (
    <Form>
      <Card>
        <Row align="middle" gutter={[10, 10]}>
          <Col flex={1}>
            <Space>
              <Checkbox.Group
                options={plainOptions}
                value={checkedList}
                onChange={handleCheckboxChange}
              />
            </Space>
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
          <Col span={24}>
            <Form.Item name={"document-type"} label="Loại văn bản">
              <SelectForm selectData={dataDocument} onSelectChange={handleDocumentTypeSelect} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name={"agencies"} label="Cơ quan ban hành">
              <SelectForm selectData={dataAgency} onSelectChange={handleAgencySelect} />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item name={"categories"} label="Chuyên mục">
              <TreeSelectForm treeData={treeData} onSelectChange={handleAgencySelect} />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Collapse
              bordered={false}
              defaultActiveKey={["1"]}
              expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
            >
              <Collapse.Panel header={<Typography.Text strong>Tìm kiếm nâng cao</Typography.Text>}>
                <SearchAdvanced
                  dataDocument={dataDocument}
                  dataAgency={dataAgency}
                  onDocumentChange={handleDocumentChange}
                  onAgencyChange={handleAgencyChange}
                  onSelectDateChange={handleSelectDateChange}
                  onTreeCategorySelect={handleTreeCategorySelect}
                  categoriesTreeValue={categoriesTreeValue}
                  onDatePickerChange={handleOnDatePickerChange}
                  onDateOk={handleOnDateOk}
                />
              </Collapse.Panel>
            </Collapse>
          </Col>
        </Row>
      </Card>
    </Form>
  );
}
