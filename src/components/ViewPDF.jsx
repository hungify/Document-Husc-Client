import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button } from "antd";
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
  background: white;
  opacity: 1;
  transform: translateX(-50%);
  transition: opacity ease-in-out 0.2s;
  box-shadow: 0 10px 20px 0 rgb(16 36 94 / 20%);
  border-radius: 4px;
`;

const ButtonAnt = styled(Button)`
  background: white;
  border: 0;
  font: inherit;
  border-radius: 4px;
  padding: 5px;
`;

const PageNumberView = styled.span`
  font-size: 1.2em;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .ant-drawer-body:hover & {
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
`;
export default function PreviewPDF(props) {
  const { fileLocation, onLoadFileSuccess, onPreviousClick, onNextClick, pageNumber, totalPage } =
    props;

  return (
    <>
      <Wrapper>
        <Document file={fileLocation} onLoadSuccess={(e) => onLoadFileSuccess(e._pdfInfo.numPages)}>
          <Page pageNumber={pageNumber} scale={1.2} />
        </Document>
      </Wrapper>
      <PageControl className="page-controls">
        <ButtonAnt
          type="button"
          onClick={onPreviousClick}
          icon={<LeftOutlined />}
          size="large"
          disabled={pageNumber === 1}
        />
        <PageNumberView>
          {pageNumber} của {totalPage}
        </PageNumberView>
        <ButtonAnt
          type="button"
          onClick={onNextClick}
          icon={<RightOutlined />}
          size="large"
          disabled={pageNumber === totalPage}
        />
      </PageControl>
    </>
  );
}
