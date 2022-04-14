import { DownloadOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Drawer, Space } from "antd";
import pdfFile from "assets/pdf/test.pdf";
import ButtonFlexible from "components/ButtonFlexible";
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

export default function PreviewPdf({ activeTab, onClosePreview }) {
  const [totalPage, setTotalPage] = React.useState(null);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (activeTab === "preview") setVisible(true);
    else setVisible(false);
  }, [activeTab]);

  const onClose = () => {
    setVisible(false);
    onClosePreview(true);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setTotalPage(numPages);
  };
  const handlePreviousClick = () => {
    if (pageNumber === 1) return;
    setPageNumber(pageNumber - 1);
  };
  const handleNextClick = () => {
    if (pageNumber === totalPage) return;
    setPageNumber(pageNumber + 1);
  };

  const handleSaveFileClick = () => {
    saveAs(pdfFile, "name_cua_file.pdf");
  };
  return (
    <>
      <Drawer
        title={`Trang ${pageNumber}/${totalPage}`}
        placement="top"
        size="large"
        onClose={onClose}
        visible={visible}
        extra={
          <Space>
            <Button onClick={onClose}>Ẩn</Button>
            <ButtonFlexible
              type="primary"
              shape="round"
              icon={<DownloadOutlined />}
              onButtonClick={handleSaveFileClick}
              document={pdfFile}
            >
              Tải xuống
            </ButtonFlexible>
          </Space>
        }
      >
        <Wrapper>
          <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} scale={1.2} />
          </Document>
        </Wrapper>
        <PageControl className="page-control">
          <Button
            type="button"
            onClick={handlePreviousClick}
            icon={<LeftOutlined />}
            size={"large"}
          />
          <Button type="button" onClick={handleNextClick} icon={<RightOutlined />} size={"large"} />
        </PageControl>
      </Drawer>
    </>
  );
}
