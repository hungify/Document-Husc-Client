import { InfoCircleOutlined } from "@ant-design/icons";
import { Col, Form, Input, Row, Select, TreeSelect } from "antd";
import React from "react";
import styled from "styled-components";
const trees = [
  {
    title: "Tất cả mọi người",
    value: "everyone",
    key: "everyone",
  },
  {
    title: "Tất cả giảng viên khoa công nghệ thông tin",
    value: "everyone-information-technology",
    key: "everyone-information-technology",
    children: [
      {
        title: "Trưởng khoa công nghệ thông tin",
        value: "information-technology-head",
        key: "information-technology-head",
      },
      {
        title: "Phó khoa công nghệ thông tin",
        value: "information-technology-deputy",
        key: "information-technology-deputy",
      },
      {
        title: "Nguyễn Dũng",
        value: "information-technology-1",
        key: "information-technology-1",
      },
      {
        title: "Nguyễn Ngọc Thuỷ",
        value: "information-technology-2",
        key: "information-technology-2",
      },
      {
        title: "Nguyễn Hoàng Hà",
        value: "information-technology-3",
        key: "information-technology-4",
      },
      {
        title: "Trần Nguyễn Phong",
        value: "information-technology-5",
        key: "information-technology-6",
      },
      {
        title: "Nguyễn Thị Bích Lộc",
        value: "information-technology-7",
        key: "information-technology-7",
      },
      {
        title: "Lê Văn Tường Lân",
        value: "information-technology-8",
        key: "information-technology-8",
      },
      {
        title: "Đoàn Thị Hồng Phước",
        value: "information-technology-9",
        key: "information-technology-9",
      },
    ],
  },
  {
    title: "Phòng Khảo thí và ĐBCLGD",
    value: "Testing-and-quality-assurance",
    key: "Testing-and-quality-assurance",
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

const WrapForm = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 8px 10px;
`;
export default function FirstStep() {
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = React.useState("optional");
  const [selectedTree, setSelectedTree] = React.useState([]);
  const [treeData, setTreeData] = React.useState(trees);

  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };
  const handleTreeChange = (value) => {
    setSelectedTree(value);
  };
  const handleSelectChange = (value) => {
    if (value === "public") {
      setSelectedTree(["everyone"]);
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
      setSelectedTree([]);
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

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        requiredMarkValue: requiredMark,
      }}
      onValuesChange={onRequiredTypeChange}
      requiredMark={requiredMark}
    >
      <Row>
        <WrapForm>
          <Col span={12}>
            <Form.Item
              required
              label="Trạng thái"
              tooltip={{
                title: "Ai sẽ là người nhìn thấy văn bản của bạn?",
                icon: <InfoCircleOutlined />,
              }}
            >
              <Select
                placeholder="Chọn trạng thái của văn bản"
                onChange={handleSelectChange}
                size="large"
              >
                <Select.Option value="public">Công khai</Select.Option>
                <Select.Option value="private">Riêng tư</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              style={{ paddingLeft: "10px" }}
              label="Nơi ban hành"
              required={true}
              tooltip={{
                title: "Tooltip with customize icon",
                icon: <InfoCircleOutlined />,
              }}
            >
              <Input placeholder="input placeholder" size="large" />
            </Form.Item>
          </Col>
        </WrapForm>
      </Row>

      <Row>
        <Col span={24}>
          <Form.Item
            label="Người nhận"
            required
            tooltip="Ai sẽ là người nhận được văn bản của bạn?"
          >
            <TreeSelect
              allowClear
              treeData={treeData}
              style={{
                padding: "8px 10px",
              }}
              treeCheckable={true}
              size="large"
              onChange={handleTreeChange}
              showCheckedStrategy={TreeSelect.SHOW_PARENT}
              placeholder="Chọn người nhận"
              value={selectedTree}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
