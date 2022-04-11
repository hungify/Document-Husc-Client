import { ExpandOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import React from "react";
export default function ButtonPreviewFile(props) {
  const { file } = props;

  return (
    <Tooltip title="Xem trước văn bản này?">
      <Button
        {...props}
        type="primary"
        shape="round"
        icon={<ExpandOutlined />}
        onClick={() => {
          window.open(file, {
            target: "_blank",
            rel: "noopener noreferrer",
          });
        }}
      >
        Xem trước
      </Button>
    </Tooltip>
  );
}
