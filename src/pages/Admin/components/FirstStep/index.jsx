import { InfoCircleOutlined } from "@ant-design/icons";
import { Col, Form, Row, TreeSelect } from "antd";
import SelectForm from "components/SelectForm";
import TreeSelectForm from "components/TreeSelectForm";
import { treePeople } from "config/sidebar";
import { selectConfig } from "config/select";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 8px 10px;
`;

export default function FirstStep({ onSubmitForm, form, formValues }) {
  const [treeData, setTreeData] = React.useState(treePeople);
  const [treeReceiver, setTreeReceiver] = React.useState(
    formValues?.receiver ? [formValues?.receiver] : undefined
  );
  const [selectedStatus, setSelectedStatus] = React.useState(formValues?.status);
  const [selectedUrgency, setSelectedUrgency] = React.useState(formValues?.urgency);

  const handleTreeReceiverSelect = (value) => {
    setTreeReceiver([...treeReceiver, value]);
  };

  const handleStatusSelectChange = (value) => {
    setSelectedStatus(value);
    if (value === "public") {
      setTreeReceiver(["everyone"]);
      const newTree = treeData.map((tree) => {
        if (tree.value !== "everyone") {
          if (tree.children.length > 0) {
            tree.children.map((child) => {
              return (child.disableCheckbox = true);
            });
          }
          return {
            ...tree,
            ...tree.children,
            disabled: true,
          };
        } else {
          return {
            ...tree,
            ...tree.children,
            disabled: false,
          };
        }
      });
      setTreeData(newTree);
    } else {
      setTreeReceiver([]);
      const newTree = treeData.map((tree) => {
        if (tree.value !== "everyone") {
          if (tree.children.length > 0) {
            tree.children.map((child) => {
              return (child.disableCheckbox = false);
            });
          }
          return {
            ...tree,
            ...tree.children,
            disabled: false,
          };
        }
        return {
          ...tree,
          ...tree.children,
          disabled: true,
        };
      });
      setTreeData(newTree);
    }
  };

  const handleSelectUrgencyChange = (value) => {
    setSelectedUrgency(value);
  };

  const onFinish = (values) => {
    onSubmitForm({ step: 1, data: values });
  };

  return (
    <Wrapper>
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Row>
          <Col span={12}>
            <Form.Item
              name="status"
              label="Trạng thái"
              rules={[{ required: true, message: "Trường này là bắt buộc" }]}
              tooltip={{
                title: "Ai sẽ là người nhìn thấy văn bản của bạn?",
                icon: <InfoCircleOutlined />,
              }}
            >
              <SelectForm
                onSelectChange={handleStatusSelectChange}
                data={selectConfig.status}
                value={selectedStatus}
                size="large"
                placeholder="Chọn trạng thái của văn bản"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              style={{ paddingLeft: "10px" }}
              label="Độ khẩn"
              name="level"
              rules={[{ required: true, message: "Trường này là bắt buộc" }]}
              tooltip={{
                title: "Độ khẩn cấp của văn bản của bạn?",
                icon: <InfoCircleOutlined />,
              }}
            >
              <SelectForm
                value={selectedUrgency}
                onSelectChange={handleSelectUrgencyChange}
                data={selectConfig.urgency}
                size="large"
                placeholder="Chọn đổ khẩn của văn bản"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Form.Item
              label="Người nhận"
              name="receiver"
              tooltip={{
                title: "Ai sẽ là người nhận được văn bản của bạn?",
                icon: <InfoCircleOutlined />,
              }}
              rules={[{ required: true, message: "Trường này là bắt buộc" }]}
            >
              <TreeSelectForm
                treeData={treeData}
                onTreeSelect={handleTreeReceiverSelect}
                placeholder="Chọn người nhận"
                allowClear
                size="large"
                showCheckedStrategy={TreeSelect.SHOW_PARENT}
                treeCheckable={true}
                style={{
                  padding: "8px 10px",
                }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Wrapper>
  );
}
