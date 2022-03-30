import { DownloadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { saveAs } from "file-saver";

export function SaveFile({ file }) {
  const handleSaveFile = () => {
    if (file) {
      saveAs(file, "test.pdf");
    }
  };
  return (
    <Button
      type="primary"
      shape="round"
      icon={<DownloadOutlined />}
      size={"large"}
      onClick={handleSaveFile}
    >
      Tải xuống
    </Button>
  );
}
