import { DownloadOutlined } from "@ant-design/icons";
import { Button, Drawer, Space } from "antd";
import ButtonFlexible from "components/ButtonTooltip";
import ViewPDF from "components/ViewPDF";
import { saveAs } from "file-saver";
import React from "react";

export default function PreviewPdf({ previewFile, setPreviewVisible, previewVisible }) {
  const [totalPage, setTotalPage] = React.useState(null);
  const [pageNumber, setPageNumber] = React.useState(1);

  const onClose = () => {
    setPreviewVisible(false);
  };

  const handleSaveFileClick = () => {
    saveAs(previewFile.location, previewFile.originalName);
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
        visible={previewVisible}
        extra={
          <Space>
            <Button onClick={onClose} key="hide">
              Ẩn
            </Button>
            <ButtonFlexible
              type="primary"
              shape="round"
              icon={<DownloadOutlined />}
              onButtonClick={handleSaveFileClick}
              document={previewFile}
              key="download"
            >
              Tải xuống
            </ButtonFlexible>
          </Space>
        }
      >
        <ViewPDF
          fileLocation={previewFile.location}
          onPreviousClick={handlePreviousClick}
          onNextClick={handleNextClick}
          onLoadFileSuccess={handleLoadFileSuccess}
          pageNumber={pageNumber}
          totalPage={totalPage}
        />
      </Drawer>
    </>
  );
}
