import { Button, Card, Empty } from "antd";
import PreviewPdf from "components/PreviewPDF";
import React from "react";
import styled from "styled-components";

const CardEmpty = styled(Card)`
  background-color: rgb(248, 250, 252);
  color: rgba(0, 0, 0, 0.25);
`;

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
      {files.length > 0 ? (
        files?.map((file) => (
          <Button
            key={file.originalName}
            type="dashed"
            onClick={() => {
              setPreviewVisible(true);
              setPreviewFile(file);
            }}
          >
            {file.originalName}
          </Button>
        ))
      ) : (
        <CardEmpty>
          <Empty description="Danh sách trống" />
        </CardEmpty>
      )}
    </>
  );
}
