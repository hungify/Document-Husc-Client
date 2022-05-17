import { EyeOutlined } from "@ant-design/icons";
import { Button, Col, Form, Row, Tabs, Typography } from "antd";
import { getDocuments } from "app/selectors/documents";
import ButtonTooltip from "components/ButtonTooltip";
import DocumentSummary from "components/DocumentSummary";
import DrawerCustom from "components/DrawerCustom";
import TransferTableRelated from "features/ManageDocuments/components/TransferTableRelated";
import { fetchDocuments } from "features/ManageDocuments/documentsSlice";
import { resetSearchAndFilters } from "features/SearchGroup/searchGroupSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import FileList from "components/FileList";

const ColFull = styled(Col)`
  & .ant-form-item-control {
    width: 100%;
  }
`;

export default function RelatedDocuments({ selectedRelatedDocument, setSelectedRelatedDocument }) {
  const [visible, setVisible] = React.useState(false);
  const [documentsClicked, setDocumentsClicked] = React.useState();
  const documents = useSelector(getDocuments);

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(resetSearchAndFilters());
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

  const handleTableTransferChange = (nextTargetKeys, direction, moveKeys) => {
    setSelectedRelatedDocument(nextTargetKeys);
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
            <FileList files={documentsClicked?.fileList} />
          </Tabs.TabPane>
        </Tabs>
      </DrawerCustom>

      <Row>
        <ColFull span={24}>
          <Form.Item name="relatedDocuments" initialValue={selectedRelatedDocument}>
            <TransferTableRelated
              onChange={handleTableTransferChange}
              titles={["Tất cả văn bản", "Văn bản được chọn"]}
              dataSource={documents}
              targetKeys={selectedRelatedDocument}
              locale={{
                searchPlaceholder: "Nhập vào tiêu đề hoặc số hiệu văn bản",
              }}
              showSearch={true}
              filterOption={(searchTerm, record) =>
                record.documentNumber.includes(searchTerm) || record.title.includes(searchTerm)
              }
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
