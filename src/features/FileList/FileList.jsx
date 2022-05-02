import { Button } from "antd";
import PreviewPdf from "components/PreviewPDF";
import React from "react";

export default function FileList({ files }) {
  const [previewVisible, setPreviewVisible] = React.useState(false);
  const [previewFile, setPreviewFile] = React.useState();
  return (
    <>
      {previewVisible && (
        <PreviewPdf
          previewFile={previewFile}
          previewVisible={previewVisible}
          setPreviewVisible={setPreviewVisible}
        />
      )}
      {files.length > 0 &&
        files.map((file) => (
          <Button
            key={file.originalName}
            onClick={() => {
              setPreviewVisible(true);
              setPreviewFile(file);
            }}
          >
            {file.originalName}
          </Button>
        ))}
    </>
  );
}
