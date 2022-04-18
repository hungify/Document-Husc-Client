import { DownloadOutlined } from "@ant-design/icons";
import { Button, Drawer, Space } from "antd";
import pdfFile from "assets/pdf/test.pdf";
import ButtonFlexible from "components/ButtonTooltip";
import ViewPDF from "components/ViewPDF";
import { saveAs } from "file-saver";
import React from "react";

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

  const handleSaveFileClick = () => {
    saveAs(pdfFile, "name_cua_file.pdf");
  };

  const handleLoadFileSuccess = (numPages) => {
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
        <ViewPDF
          pdfFile={pdfFile}
          onPreviousClick={handlePreviousClick}
          onNextClick={handleNextClick}
          onLoadFileSuccess={handleLoadFileSuccess}
          pageNumber={pageNumber}
        />
      </Drawer>
    </>
  );
}
