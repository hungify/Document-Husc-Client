import { InfoCircleOutlined } from "@ant-design/icons";
import { Col, Form, Row, TreeSelect, Typography } from "antd";
import SelectForm from "components/SelectForm";
import TreeSelectForm from "components/TreeSelectForm";
import { selectConfig } from "configs/select";
import { categories } from "configs/sidebar";
import styled from "styled-components";

const FormItemAnt = styled(Form.Item)`
  padding-left: 20px;
`;

export default function DocumentClassification(props) {
  const {
    onTreeDeSelect,
    onTreeSelect,
    onSelectTypesOfDocument,
    onAgencySelect,
    agenciesSelected,
  } = props;

  return (
    <Row>
      <Col span={7}>
        <FormItemAnt
          label={<Typography.Text strong>Loại văn bản</Typography.Text>}
          name="typesOfDocument"
          rules={[{ required: true, message: "Trường này là bắt buộc" }]}
          tooltip={{
            title: "Loại văn bản của bạn?",
            icon: <InfoCircleOutlined />,
          }}
        >
          <SelectForm
            selectData={selectConfig.typesOfDocuments}
            onSelect={onSelectTypesOfDocument}
            placeholder="Chọn loại văn bản"
            size="large"
            allowClear
            filterOption={false}
            notFoundContent={true}
          />
        </FormItemAnt>
      </Col>
      <Col span={10}>
        <FormItemAnt
          label={<Typography.Text strong>Chuyên mục</Typography.Text>}
          name="categories"
          rules={[{ required: true, message: "Trường này là bắt buộc" }]}
          tooltip={{
            title: "Chuyên mục văn bản của bạn?",
            icon: <InfoCircleOutlined />,
          }}
        >
          <TreeSelectForm
            treeData={categories.data}
            onTreeSelect={onTreeSelect}
            onTreeDeSelect={onTreeDeSelect}
            placeholder="Chọn chuyên mục"
            allowClear
            size="large"
            showCheckedStrategy={TreeSelect.SHOW_PARENT}
          />
        </FormItemAnt>
      </Col>
      <Col span={7}>
        <FormItemAnt
          label={<Typography.Text strong>Cơ quan ban hành</Typography.Text>}
          name="agencies"
          rules={[{ required: true, message: "Trường này là bắt buộc" }]}
          tooltip={{
            title: "Cơ quan ban hành văn bản của bạn?",
            icon: <InfoCircleOutlined />,
          }}
        >
          <SelectForm
            selectData={selectConfig.agencies}
            onSelect={onAgencySelect}
            selectedKeys={agenciesSelected}
            placeholder="Chọn cơ quan ban hành"
            size="large"
            filterOption={false}
            notFoundContent={true}
            allowClear
          />
        </FormItemAnt>
      </Col>
    </Row>
  );
}
