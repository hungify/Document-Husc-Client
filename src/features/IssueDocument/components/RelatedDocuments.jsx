import { EyeOutlined } from "@ant-design/icons";
import { Col, Form, Row, Tabs, Typography } from "antd";
import pdfFile from "assets/pdf/test.pdf";
import ButtonTooltip from "components/ButtonTooltip";
import DrawerCustom from "components/DrawerCustom";
import DocumentSummary from "components/DocumentSummary";
import TableTransfer from "components/TransferTable";
import ViewPDF from "components/ViewPDF";
import React from "react";
import styled from "styled-components";

const ColFull = styled(Col)`
  & .ant-form-item-control {
    width: 100%;
  }
`;

const mockData = [];
for (let i = 0; i < 100; i++) {
  mockData.push({
    key: i.toString(),
    textNumber: `${i + 1}/NQ-HĐĐH`,
    signer: `Nguyễn Văn Duy ${i}`,
    dateIssued: "20/10/2020",
    agencyIssued: "Đại học Huế",
    validityStatus: "Đang có hiệu lực",
    typeOfDocument: ["Nghị quyết"],
    degreeOfUrgency: "Bình thường",
    summary:
      "Căn cứ Nghị định số 30/CP ngày 04 tháng 4 năm 1994 của Chính phủ về việc thành lập Đại học Huế; Căn cứ Thông tư số 10/2020/TT-BGDĐT ngày 14 tháng 5 năm 2020 của Bộ trưởng Bộ Giáo dục và Đào tạo ban hành Quy chế tổ chức và hoạt động của đại học vùng và các cơ sở giáo dục đại học thành viên; Căn cứ Quyết định số 20/QĐ-HĐĐH ngày 31 tháng 7 năm 2020 của Hội đồng Đại học Huế ban hành Quy chế tổ chức và hoạt động của Đại học Huế; Quyết định số 07/QĐ-HĐĐH ngày 19 tháng 01 năm 2021 của Hội đồng Đại học Huế sửa đổi, bổ sung một số điều của Quy chế tổ chức và hoạt động của Đại học Huế; Căn cứ Nghị quyết số 45/NQ-HĐĐH ngày 06 tháng 8 năm 2021 của Hội đồng Đại học Huế ban hành Quy chế hoạt động của Hội đồng Đại học Huế nhiệm kỳ 2021 - 2026; Căn cứ Quyết định số 06/QĐ-HĐĐH ngày 19 tháng 01 năm 2021 của Hội đồng Đại học Huế ban hành Quy định công nhận, bổ nhiệm, bổ nhiệm lại, kéo dài thời gian giữ chức vụ, thôi giữ chức vụ, miễn nhiệm, luân chuyển và chế độ phụ cấp chức vụ đối với viên chức quản lý tại Đại học Huế; Căn cứ Nghị quyết số 87/NQ-HĐĐH ngày 08 tháng 12 năm 2021.",
  });
}

export default function RelatedDocuments({ onSelectRelatedDocument, selectedRelatedDocument }) {
  const [visible, setVisible] = React.useState(false);
  const [documentsClicked, setDocumentsClicked] = React.useState([]);

  const [pageNumber, setPageNumber] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(null);

  const TableColumns = [
    {
      dataIndex: "textNumber",
      title: "Số hiệu văn bản",
    },
    {
      dataIndex: "signer",
      title: "Người ký",
    },
    {
      dataIndex: "agencyIssued",
      title: "Cơ quan ban hành",
    },
    {
      dataIndex: "typeOfDocument",
      title: "Loại văn bản",
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      onCell: (record) => ({
        onClick: (e) => {
          setDocumentsClicked([record]);
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
    onSelectRelatedDocument(nextTargetKeys);
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
            <DocumentSummary documentData={documentsClicked} />
          </Tabs.TabPane>

          <Tabs.TabPane tab="Văn bản gốc" key="original-document">
            <ViewPDF
              pdfFile={pdfFile}
              pageNumber={pageNumber}
              onPreviousClick={handlePreviousClick}
              onNextClick={handleNextClick}
              onLoadFileSuccess={handleLoadFileSuccess}
            />
          </Tabs.TabPane>
        </Tabs>
      </DrawerCustom>

      <Row>
        <ColFull span={24}>
          <Form.Item
            name="related-document"
            label={<Typography.Text strong>Văn bản đính kèm</Typography.Text>}
          >
            <TableTransfer
              titles={["Tất cả văn bản", "Văn bản được chọn"]}
              dataSource={mockData}
              targetKeys={selectedRelatedDocument}
              pagination={{
                pageSize: 20,
                showSizeChanger: true,
                simple: true,
                showLessItems: true,
              }}
              render={(item) => item.title}
              onChange={handleTableTransferChange}
              filterOption={(inputValue, item) =>
                item.title.indexOf(inputValue) !== -1 || item.tag.indexOf(inputValue) !== -1
              }
              leftColumns={TableColumns}
              rightColumns={TableColumns}
            />
          </Form.Item>
        </ColFull>
      </Row>
    </>
  );
}
