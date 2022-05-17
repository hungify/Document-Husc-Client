import { Button, Card, Empty, Space } from "antd";
import React from "react";
import styled from "styled-components";

const WrapFileList = styled.div`
  display: flex;
  flex-direction: column;
`;
const CardEmpty = styled(Card)`
  background-color: rgb(248, 250, 252);
  color: rgba(0, 0, 0, 0.25);
`;

export default function FileList({ files, direction }) {
  const handleOpenPreviewPdf = (file) => {
    return () => {
      window.open(file.location, {
        target: "_blank",
        rel: "noopener noreferrer",
      });
    };
  };

  return (
    <>
      {files?.length > 0 ? (
        <WrapFileList $direction={direction}>
          <Space size="large" direction={direction}>
            {files?.map((file) => (
              <Button key={file.originalName} type="dashed" onClick={handleOpenPreviewPdf(file)}>
                {file.originalName}
              </Button>
            ))}
          </Space>
        </WrapFileList>
      ) : (
        <CardEmpty>
          <Empty description="Danh sách trống" />
        </CardEmpty>
      )}
    </>
  );
}
