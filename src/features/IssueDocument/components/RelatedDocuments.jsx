import { EyeOutlined } from "@ant-design/icons";
import { Button, Col, Form, Row, Tabs, Typography } from "antd";
import { getDocuments } from "app/selectors/documents";
import ButtonTooltip from "components/ButtonTooltip";
import DocumentSummary from "components/DocumentSummary";
import DrawerCustom from "components/DrawerCustom";
import TableTransfer from "components/TransferTable";
import ViewPDF from "components/ViewPDF";
import { fetchDocuments } from "features/Home/homeSlice";
import { resetSearchAndFilters } from "features/SearchGroup/searchGroupSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const ColFull = styled(Col)`
  & .ant-form-item-control {
    width: 100%;
  }
`;

export default function RelatedDocuments({ selectedRelatedDocument, setSelectedRelatedDocument }) {
  const [visible, setVisible] = React.useState(false);
  const [documentsClicked, setDocumentsClicked] = React.useState();
  const [pageNumber, setPageNumber] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(null);
  const [previewVisible, setPreviewVisible] = React.useState(false);
  const [previewFile, setPreviewFile] = React.useState();
  const documents = useSelector(getDocuments);

  const dispatch = useDispatch();
  React.useEffect(() => {
    // dispatch(resetSearchAndFilters());
    dispatch(fetchDocuments());
  }, [dispatch]);

  const TableColumns = [
    {
      dataIndex: "documentNumber",
      title: "Số hiệu văn bản",
    },
    {
      dataIndex: "title",
      title: "Tiều đề",
      render: (text) => {
        return (
          <Typography.Paragraph ellipsis={{ rows: 2, expandable: true, symbol: "more" }}>
            {text}
          </Typography.Paragraph>
        );
      },
    },
    {
      dataIndex: "signer",
      title: "Người ký",
    },
    {
      key: "operation",
      width: 40,
      fixed: "right",
      onCell: (record) => ({
        onClick: (e) => {
          setDocumentsClicked(record);
        },
      }),
      render: () => (
        <ButtonTooltip
          icon={<EyeOutlined />}
          type="primary"
          size="small"
          shape="circle"
          onButtonClick={() => setVisible(true)}
        />
      ),
    },
  ];

  const handleTableTransferChange = (nextTargetKeys) => {
    setSelectedRelatedDocument(nextTargetKeys);
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
      <DrawerCustom
        title="Thông tin văn bản"
        placement="top"
        onCloseDrawer={() => setVisible(false)}
        visible={visible}
        size="large"
      >
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Thông tin văn bản" key="documents-detail">
            <DocumentSummary dataSource={documentsClicked} />
          </Tabs.TabPane>

          <Tabs.TabPane tab="Văn bản gốc" key="original-document">
            {documentsClicked?.fileList.map((file) => (
              <Button
                key={file.originalName}
                onClick={() => {
                  setPreviewFile(file);
                  setPreviewVisible(true);
                }}
              >
                {file.originalName}
              </Button>
            ))}
            {previewVisible && (
              <ViewPDF
                fileLocation={previewFile.location}
                pageNumber={pageNumber}
                onPreviousClick={handlePreviousClick}
                onNextClick={handleNextClick}
                onLoadFileSuccess={handleLoadFileSuccess}
              />
            )}
          </Tabs.TabPane>
        </Tabs>
      </DrawerCustom>

      <Row>
        <ColFull span={24}>
          <Form.Item name="relatedDocuments" initialValue={selectedRelatedDocument || []}>
            <TableTransfer
              titles={["Tất cả văn bản", "Văn bản được chọn"]}
              dataSource={documents}
              targetKeys={selectedRelatedDocument}
              locale={{
                searchPlaceholder: "Nhập vào tiêu đề hoặc số hiệu văn bản",
              }}
              render={(item) => item.title}
              onChange={handleTableTransferChange}
              showSearch={true}
              filterOption={(searchTerm, record) => record.documentNumber.includes(searchTerm)}
              leftColumns={TableColumns}
              rightColumns={TableColumns}
              rowKey={(record) => record._id}
            />
          </Form.Item>
        </ColFull>
      </Row>
    </>
  );
}
