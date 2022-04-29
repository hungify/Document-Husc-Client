import { DownloadOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Drawer, Space } from "antd";
import ButtonFlexible from "components/ButtonTooltip";
import { saveAs } from "file-saver";
import React from "react";
import { Document, Page, pdfjs } from "react-pdf";
import styled from "styled-components";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PageControl = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 5%;
  left: 50%;
  width: 120px;
  background: white;
  opacity: 1;
  transform: translateX(-50%);
  transition: opacity ease-in-out 0.2s;
  box-shadow: 0 10px 20px 0 rgb(16 36 94 / 20%);
  border-radius: 4px;
`;

const Wrapper = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
`;

export default function PreviewPDF(props) {
  const { fileLocation, onLoadFileSuccess, onPreviousClick, onNextClick, pageNumber } = props;

  return (
    <>
      <Wrapper>
        <Document
          file={fileLocation}
          onLoadSuccess={(e) => onLoadFileSuccess(e._pdfInfo.numPages)}
        >
          <Page pageNumber={pageNumber} scale={1.2} />
        </Document>
      </Wrapper>
      <PageControl className="page-control">
        <Button type="button" onClick={onPreviousClick} icon={<LeftOutlined />} size={"large"} />
        <Button type="button" onClick={onNextClick} icon={<RightOutlined />} size={"large"} />
      </PageControl>
    </>
  );
}
