import {
  DownOutlined,
  FrownFilled,
  FrownOutlined,
  HighlightOutlined,
  InfoCircleOutlined,
  MehOutlined,
  PlusOutlined,
  SmileOutlined,
  UpOutlined,
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  Popconfirm,
  Select,
  Space,
  Tree,
  Typography,
} from "antd";
import React from "react";
import { useParams } from "react-router-dom";

const x = 3;
const y = 2;
const z = 1;
const treeData = [];

const generateData = (_level, _preKey, _tns) => {
  const preKey = _preKey || "0";
  const tns = _tns || treeData;

  const children = [];
  for (let i = 0; i < x; i++) {
    const key = `${preKey}-${i}`;
    tns.push({ title: key, key });
    if (i < y) {
      children.push(key);
    }
  }
  if (_level < 0) {
    return tns;
  }
  const level = _level - 1;
  children.forEach((key, index) => {
    tns[index].children = [];
    return generateData(level, key, tns[index].children);
  });
};
generateData(z);

const options = [
  {
    value: "zhejiang",
    label: "Zhejiang",
    children: [
      {
        value: "hangzhou",
        label: "Hangzhou",
        children: [
          {
            value: "xihu",
            label: "West Lake",
            code: 752100,
          },
        ],
      },
    ],
  },
  {
    value: "jiangsu",
    label: "Jiangsu",
    children: [
      {
        value: "nanjing",
        label: "Nanjing",
        children: [
          {
            value: "zhonghuamen",
            label: "Zhong Hua Men",
            code: 453400,
          },
        ],
      },
    ],
  },
];

let index = 0;
export default function PostEditCategory() {
  const [items, setItems] = React.useState(["jack", "lucy"]);
  const [name, setName] = React.useState("");
  const [selectTreeData, setSelectTreeData] = React.useState([]);
  const [selected, setSelected] = React.useState(false);

  const [expandedKeys, setExpandedKeys] = React.useState(["0-0", "0-0-0", "0-0-0-0"]);
  const [gData, setGData] = React.useState(treeData);

  const onDragEnter = (info) => {
    console.log(info);
    // expandedKeys 需要受控时设置
    // this.setState({
    //   expandedKeys: info.expandedKeys,
    // });
  };

  const onDrop = (info) => {
    console.log(info);
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split("-");
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (data, key, callback) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children, key, callback);
        }
      }
    };

    const data = [...gData];

    // Find dragObject
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 && // Has children
      info.node.props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
        // in previous version, we use item.children.push(dragObj) to insert the
        // item to the tail of the children
      });
    } else {
      let ar;
      let i;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }

    setGData(data);
  };

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const addItem = (e) => {
    e.preventDefault();
    setItems([...items, name || `New item ${index++}`]);
    setName("");
  };
  const headers = ["Province", "City", "District"];
  const { categoryId } = useParams();
  console.log("🚀 :: categoryId", categoryId);
  const initialValues = {};
  const isEdit = categoryId !== "post";
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  function handleAreaClick(e, label, option) {
    e.stopPropagation();
    console.log("clicked", label, option);
  }

  const displayRender = (labels, selectedOptions) =>
    labels.map((label, i) => {
      const option = selectedOptions[i];
      if (i === labels.length - 1) {
        return (
          <>
            <span key={option.value}>
              {label} (<a onClick={(e) => handleAreaClick(e, label, option)}>{option.code}</a>)
            </span>
          </>
        );
      }
      return <span key={option.value}>{label} / </span>;
    });

  const onSelect = (e) => {
    console.log(e);
    setSelected(true);
  };

  const onRightClick = (e) => {
    console.log(e);
  };

  const handleTitleChange = (e) => {
    console.log(e);
  };

  const data = [
    {
      name: "上海",
      id: 1,
      children: [
        {
          name: "区",
          id: 2,
          children: [
            {
              name: "虹口区",
              id: 3,
            },
          ],
        },
      ],
    },
  ];

  return (
    <Form
      name={isEdit ? "edit-category" : "create-category"}
      initialValues={initialValues}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {/* <Form.Item
        wrapperCol={{
          offset: 0,
          span: 12,
        }}
        label="Tên chuyên mục"
        name="categoryName"
        rules={[{ required: true, message: "Vui lòng nhập vào tên chuyên mục!" }]}
        tooltip={{
          title: "Tên chuyên mục của bạn?",
          icon: <InfoCircleOutlined />,
        }}
      >
        <Select
          style={{ width: 300 }}
          placeholder="custom dropdown render"
          displayRender={displayRender}
          dropdownRender={(menu) => {
            return (
              <>
                {menu}
                <Divider style={{ margin: "8px 0" }} />
                <Space align="center" style={{ padding: "0 8px 4px" }}>
                  <Input placeholder="Please enter item" value={name} onChange={onNameChange} />
                  <Typography.Link onClick={addItem} style={{ whiteSpace: "nowrap" }}>
                    <PlusOutlined /> Add item
                  </Typography.Link>
                </Space>
              </>
            );
          }}
        >
          {items.map((item) => (
            <Select.Option key={item}>{item}</Select.Option>
          ))}
        </Select>
      </Form.Item> */}

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        {/* <Cascader
          options={options}
          defaultValue={["zhejiang", "hangzhou", "xihu"]}
          dropdownRender={(menus) => {
            return (
              <>
                {menus}
                <Divider style={{ margin: "8px 0" }} />
                <Space align="center" style={{ padding: "0 8px 4px" }}>
                  <Input placeholder="Please enter item" value={name} onChange={onNameChange} />
                  <Typography.Link onClick={addItem} style={{ whiteSpace: "nowrap" }}>
                    <PlusOutlined /> Add item
                  </Typography.Link>
                </Space>
              </>
            );
          }}
        /> */}
      </Form.Item>

      {/* <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Tree
          titleRender={(item) => {
            return (
              <>
                <Typography.Text
                  editable={{
                    icon: <HighlightOutlined />,
                    tooltip: "click to edit text",
                    onChange: handleTitleChange,
                  }}
                >
                  {item.title}
                </Typography.Text>
              </>
            );
          }}
          showIcon
          defaultExpandAll
          defaultSelectedKeys={["0-0-0"]}
          onRightClick={onRightClick}
          switcherIcon={<DownOutlined />}
          treeData={treeData}
        />
      </Form.Item> */}
    </Form>
  );
}
