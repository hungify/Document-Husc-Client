import { Col, Row, Select, TreeSelect, Typography } from "antd";
import TreeSelectForm from "components/TreeSelectForm";
import { agencies, categories, documents } from "configs/sidebar";
import React from "react";

export default function SearchFilter(props) {
  const { onDocumentChange, onTreeCategorySelect, onAgencyChange } = props;

  const [categoriesTreeValue, setCategoriesTreeValue] = React.useState(categories.data);
  const [agency, setAgency] = React.useState("");
  const [document, setDocument] = React.useState("");
  const [dataDocument, setDataDocument] = React.useState(documents.data);
  const [dataAgency, setDataAgency] = React.useState(agencies.data);

  return (
    <Row gutter={[20, 10]} style={{ marginTop: 5 }}>
      <Col span={24}>
        <Typography.Text strong>Lọc theo</Typography.Text>
      </Col>
      <Col span={7}>
        <Select
          size="large"
          defaultActiveFirstOption={false}
          showArrow={true}
          filterOption={false}
          notFoundContent={true}
          allowClear={true}
          onChange={onDocumentChange}
          style={{ width: "100%" }}
          placeholder="Chọn loại văn bản"
        >
          {dataDocument.map((document) => (
            <Select.Option key={document.key} value={document.key}>
              {document.title}
            </Select.Option>
          ))}
        </Select>
      </Col>
      <Col span={10}>
        <TreeSelectForm
          treeData={categoriesTreeValue}
          onTreeSelect={onTreeCategorySelect}
          placeholder="Chọn chuyên mục"
          allowClear
          size="large"
          showCheckedStrategy={TreeSelect.SHOW_PARENT}
          style={{
            width: "100%",
          }}
        />
      </Col>
      <Col span={7}>
        <Select
          size="large"
          showSearch
          defaultActiveFirstOption={false}
          showArrow={true}
          filterOption={false}
          notFoundContent={true}
          allowClear
          // onSearch={handleSearchAgency}
          onChange={onAgencyChange}
          style={{ width: "100%" }}
          placeholder="Chọn cơ quan ban hành"
        >
          {dataAgency.map((agency) => (
            <Select.Option key={agency.id} value={agency.value}>
              {agency.title}
            </Select.Option>
          ))}
        </Select>
      </Col>
    </Row>
  );
}
