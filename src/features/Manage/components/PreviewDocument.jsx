import { Card, Col, DatePicker, Form, Input, Row, Space, TreeSelect, Upload } from "antd";
import DebounceSelect from "components/DebounceSelect";
import SelectForm from "components/SelectForm";
import TreeSelectForm from "components/TreeSelectForm";
import { selectConfig } from "config/select";
import { categories } from "config/sidebar";
import React from "react";
import styled from "styled-components";

const FormItemAnt = styled(Form.Item)`
  align-items: center;
  padding-left: 20px;
`;
export default function PreviewDocument({ form, formValues }) {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  React.useEffect(() => {
    console.log("🚀 :: formValues", formValues);
    form.setFieldsValue(formValues);
  }, [formValues, form]);

  return (
    <Form name="basic" form={form} onFinish={onFinish} autoComplete="off">
      <Row>
        <Col span={24}>
          <Space direction="vertical" size="middle" style={{ display: "flex" }}>
            <Card>
              <Row>
                <Col span={12}>
                  <FormItemAnt label="Loại văn bản" name="documentType">
                    <SelectForm
                      data={selectConfig.document}
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

                <Col span={12}>
                  <FormItemAnt label="Cơ quan ban hành" name="agencies">
                    <SelectForm
                      data={selectConfig.agency}
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
                <Col span={24}>
                  <FormItemAnt
                    label="Chuyên mục"
                    name="categories"
                    rules={[{ required: true, message: "Trường này là bắt buộc" }]}
                  >
                    <TreeSelectForm
                      treeData={categories.data}
                      placeholder="Chọn chuyên mục"
                      allowClear
                      size="large"
                      showCheckedStrategy={TreeSelect.SHOW_PARENT}
                      treeCheckable={true}
                    />
                  </FormItemAnt>
                </Col>
              </Row>

              <Row>
                <Col span={24}>
                  <FormItemAnt label="Người nhận" name="receiver">
                    <TreeSelectForm
                      placeholder="Chọn người nhận"
                      allowClear
                      size="large"
                      showCheckedStrategy={TreeSelect.SHOW_PARENT}
                      treeCheckable={true}
                    />
                  </FormItemAnt>
                </Col>
              </Row>
            </Card>
            <Card>
              <Row justify="space-between">
                <Col span={10}>
                  <FormItemAnt name="textNumber" label="Số hiệu văn bản">
                    <Input placeholder="Ex: 26/NQ-HĐĐH" size="large" />
                  </FormItemAnt>
                </Col>
                <Col flex="auto">
                  <FormItemAnt
                    label="Độ khẩn"
                    name="level"
                    rules={[{ required: true, message: "Trường này là bắt buộc" }]}
                  >
                    <SelectForm
                      data={selectConfig.urgency}
                      size="large"
                      placeholder="Chọn đổ khẩn của văn bản"
                    />
                  </FormItemAnt>
                </Col>

                <Col flex="auto">
                  <FormItemAnt label="Ngày ban hành" name="publishDate">
                    <DatePicker format="DD/MM/YYYY" placeholder="Ex: 10/02/2021" size="large" />
                  </FormItemAnt>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <FormItemAnt label="Người ký" name="signer">
                    <Input placeholder="Ex: Huỳnh Văn Chương" size="large" />
                  </FormItemAnt>
                </Col>
              </Row>
            </Card>
            <Card>
              <Row>
                <Col span={24}>
                  <FormItemAnt name="title" label="Tiêu đề">
                    <Input placeholder="Ex:Biên bản nghiệm thu và thanh lý đề tài" size="large" />
                  </FormItemAnt>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <FormItemAnt
                    label="Tóm tắt"
                    name="summary"
                    rules={[{ required: true, message: "Trường này là bắt buộc" }]}
                  >
                    <Input.TextArea
                      placeholder="Ex: 26/NQ-HĐĐH : Nghị quyết về việc phê duyệt Đề án thành lập Trung tâm Khảo thí - Đại học Huế"
                      autoSize={{ minRows: 3, maxRows: 6 }}
                    />
                  </FormItemAnt>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <FormItemAnt name="relativeDocument" label="Văn bản liên quan">
                    <DebounceSelect
                      mode="multiple"
                      clearIcon={true}
                      size="large"
                      placeholder="Chọn các bản văn liên quan"
                    />
                  </FormItemAnt>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <FormItemAnt
                    label="Tệp đính kèm"
                    name="files"
                    rules={[{ required: true, message: "Trường này là bắt buộc" }]}
                  >
                    <Upload
                      action={"http://localhost:3000/"}
                      multiple
                      showUploadList={{
                        previewIcon: true,
                        showPreviewIcon: true,
                      }}
                    />
                  </FormItemAnt>
                </Col>
              </Row>
            </Card>
          </Space>
        </Col>
      </Row>
    </Form>
  );
}
