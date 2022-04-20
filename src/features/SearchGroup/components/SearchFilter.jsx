import { Col, Row, TreeSelect, Typography } from "antd";
import SelectForm from "components/SelectForm";
import TreeSelectForm from "components/TreeSelectForm";
import { selectConfig } from "configs/select";
import React from "react";
export default function SearchFilter({
  typesOfDocument,
  onTypesOfDocumentSelect,
  agencyOfDocument,
  onAgencySelect,
  categoryOfDocument,
  onCategorySelect,
  onCategoryDeSelect,
}) {
  return (
    <Row gutter={[20, 10]} style={{ marginTop: 5 }}>
      <Col span={24}>
        <Typography.Text strong>Lọc theo</Typography.Text>
      </Col>
      <Col span={7}>
        <SelectForm
          selectData={selectConfig.typesOfDocuments}
          onSelect={onTypesOfDocumentSelect}
          showSearch={true}
          value={typesOfDocument}
          placeholder="Chọn loại văn bản"
          size="large"
          allowClear
          filterOption={false}
          style={{ width: "100%" }}
        />
      </Col>
      <Col span={10}>
        <TreeSelectForm
          value={categoryOfDocument}
          treeData={selectConfig.categories}
          onTreeSelect={onCategorySelect}
          onTreeDeSelect={onCategoryDeSelect}
          placeholder="Chọn chuyên mục"
          allowClear
          size="large"
          showCheckedStrategy={TreeSelect.SHOW_PARENT}
          style={{ width: "100%" }}
        />
      </Col>
      <Col span={7}>
        <SelectForm
          selectData={selectConfig.authorityIssued}
          value={agencyOfDocument}
          onSelect={onAgencySelect}
          showSearch={true}
          placeholder="Chọn cơ quan ban hành"
          size="large"
          filterOption={false}
          allowClear
          style={{ width: "100%" }}
        />
      </Col>
    </Row>
  );
}
