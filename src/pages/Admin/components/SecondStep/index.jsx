import { InfoCircleOutlined } from "@ant-design/icons";
import { Col, DatePicker, Form, Input, Row } from "antd";
import SelectForm from "components/SelectForm";
import TreeSelectForm from "components/TreeSelectForm";
import { categoriesTree } from "config/sidebar";
import { selectConfig } from "config/select";
import TreeSelect from "rc-tree-select";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 8px 10px;
`;
const FormItemAnt = styled(Form.Item)`
  padding-right: 20px;
`;

export default function SecondStep({ form, onSubmitForm }) {
  const [agency, setAgency] = React.useState("");
  const [document, setDocument] = React.useState("");
  const [categoriesTreeValue, setCategoriesTreeValue] = React.useState([]);

  const handleChangeDocument = (value) => {
    setDocument(value);
  };

  const handleChangeAgency = (value) => {
    setAgency(value);
  };
  const handleTreeCategoryChange = (value) => {
    setCategoriesTreeValue(value);
  };

  const onFinish = (values) => {
    onSubmitForm({ step: 2, data: values });
  };

  return (
    <Wrapper>
      <Form onFinish={onFinish} form={form} layout="vertical">
        <Row>
          <Col span={7}>
            <FormItemAnt
              label="Chuyên mục"
              name="category"
              rules={[{ required: true, message: "Trường này là bắt buộc" }]}
              tooltip={{
                title: "Chuyên mục văn bản của bạn?",
                icon: <InfoCircleOutlined />,
              }}
            >
              <TreeSelectForm
                treeData={categoriesTree}
                value={categoriesTreeValue}
                onTreeSelect={handleTreeCategoryChange}
                placeholder="Chọn chuyên mục"
                allowClear
                size="large"
                showCheckedStrategy={TreeSelect.SHOW_PARENT}
                treeCheckable={true}
              />
            </FormItemAnt>
          </Col>

          <Col span={7}>
            <FormItemAnt
              label="Loại văn bản"
              name="documentType"
              rules={[{ required: true, message: "Trường này là bắt buộc" }]}
              tooltip={{
                title: "Loại văn bản của bạn?",
                icon: <InfoCircleOutlined />,
              }}
            >
              <SelectForm
                data={selectConfig.document}
                onSelectChange={handleChangeDocument}
                placeholder="Chọn loại văn bản"
                size="large"
                showSearch
                filterOption={false}
                notFoundContent={true}
                allowClear
                document={1}
              />
            </FormItemAnt>
          </Col>

          <Col span={10}>
            <FormItemAnt
              label="Cơ quan ban hành"
              name="agency"
              rules={[{ required: true, message: "Trường này là bắt buộc" }]}
              tooltip={{
                title: "Cơ quan ban hành văn bản của bạn?",
                icon: <InfoCircleOutlined />,
              }}
            >
              <SelectForm
                data={selectConfig.agency}
                onSelectChange={handleChangeAgency}
                placeholder="Chọn cơ quan ban hành"
                size="large"
                showSearch
                filterOption={false}
                notFoundContent={true}
                allowClear
                document={1}
              />
            </FormItemAnt>
          </Col>
        </Row>
        <Row>
          <Col span={9}>
            <FormItemAnt
              name="textNumber"
              label="Số hiệu văn bản"
              rules={[{ required: true, message: "Trường này là bắt buộc" }]}
              tooltip={{
                title: "Số hiệu văn bản của bạn?",
                icon: <InfoCircleOutlined />,
              }}
            >
              <Input placeholder="Ex: 26/NQ-HĐĐH" size="large" />
            </FormItemAnt>
          </Col>
          <Col span={9}>
            <FormItemAnt
              label="Người ký"
              name="signer"
              rules={[{ required: true, message: "Trường này là bắt buộc" }]}
              tooltip={{
                title: "Người kí văn bản của bạn?",
                icon: <InfoCircleOutlined />,
              }}
            >
              <Input placeholder="Ex: Huỳnh Văn Chương" size="large" />
            </FormItemAnt>
          </Col>
          <Col span={6}>
            <FormItemAnt
              label="Ngày ban hành"
              name="publishDate"
              rules={[{ required: true, message: "Trường này là bắt buộc" }]}
              tooltip={{
                title: "Ngày ban hành văn bản của bạn?",
                icon: <InfoCircleOutlined />,
              }}
            >
              <DatePicker
                format="DD/MM/YYYY"
                placeholder="Ex: 10/02/2021"
                size="large"
                style={{
                  width: "100%",
                }}
              />
            </FormItemAnt>
          </Col>
        </Row>
      </Form>
    </Wrapper>
  );
}
