import { DownloadOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import React from "react";
import { saveAs } from "file-saver";

export default function ButtonSaveFile(props) {
  const { file } = props;
  const handleSaveFile = () => {
    if (file) {
      saveAs(file, "name_cua_file.pdf");
    }
  };
  return (
    <Tooltip title="Tải xuống văn bản này?">
      <Button
        {...props}
        type="primary"
        shape="round"
        icon={<DownloadOutlined />}
        onClick={handleSaveFile}
      >
        Tải xuống
      </Button>
    </Tooltip>
  );
}
