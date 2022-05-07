import { Col, Row, TreeSelect, Typography } from "antd";
import { getAgenciesConfig } from "app/selectors/agencies";
import { getCategoriesConfig } from "app/selectors/categories";
import { getTypesOfDocumentsConfig } from "app/selectors/typesOfDocument";
import SelectForm from "components/SelectForm";
import TreeSelectForm from "components/TreeSelectForm";
import React from "react";
import { useSelector } from "react-redux";
export default function SearchFilter({
  typesOfDocument,
  onTypesOfDocumentSelect,
  onTypesOfDocumentDeselect,
  agency,
  onAgencySelect,
  onAgencyDeselect,
  category,
  onCategorySelect,
}) {
  const agenciesConfig = useSelector(getAgenciesConfig);
  const categoriesConfig = useSelector(getCategoriesConfig);
  const typesOfDocumentsConfig = useSelector(getTypesOfDocumentsConfig);

  return (
    <Row gutter={[20, 10]} style={{ marginTop: 5 }}>
      <Col span={24}>
        <Typography.Text strong>Lọc theo</Typography.Text>
      </Col>
      <Col span={7}>
        <SelectForm
          selectData={typesOfDocumentsConfig}
          onSelect={onTypesOfDocumentSelect}
          value={typesOfDocument}
          onDeselect={onTypesOfDocumentDeselect}
          showSearch={true}
          placeholder="Chọn loại văn bản"
          size="large"
          allowClear
          filterOption={false}
          style={{ width: "100%" }}
        />
      </Col>
      <Col span={10}>
        <TreeSelectForm
          treeData={categoriesConfig}
          onChange={onCategorySelect}
          placeholder="Chọn chuyên mục"
          allowClear
          autoClearSearchValue
          size="large"
          showCheckedStrategy={TreeSelect.SHOW_PARENT}
          style={{ width: "100%" }}
        />
      </Col>
      <Col span={7}>
        <SelectForm
          selectData={agenciesConfig}
          onSelect={onAgencySelect}
          onDeselect={onAgencyDeselect}
          showSearch={true}
          value={agency}
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
