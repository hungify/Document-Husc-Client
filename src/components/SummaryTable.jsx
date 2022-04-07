import { Col, Row, Space, Table, Tag, Typography } from "antd";
import React from "react";
import styled from "styled-components";

const RowAnt = styled(Row)`
  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;

const columns = [
  {
    title: "Cơ quan ban hành",
    dataIndex: "agency",
    key: "agency",
  },
  {
    title: "Số hiệu văn bản",
    dataIndex: "textNumber",
    key: "textNumber",
  },
  {
    title: "Ngày ban hành",
    dataIndex: "dateIssued",
    key: "dateIssued",
  },
  {
    title: "Người ký",
    dataIndex: "signer",
    key: "signer",
  },
  {
    title: "Tình trạng hiệu lực",
    dataIndex: "validityStatus",
    key: "validityStatus",
  },
  {
    title: "Mức độ khẩn",
    dataIndex: "degreeOfUrgency",
    key: "degreeOfUrgency",
    render: (text) => {
      if (text === "Bình thường") return <Tag color="green">Bình thường</Tag>;
      else if (text === "Khẩn") return <Tag color="red">Khẩn</Tag>;
      else return <Tag color="orange">Nghiêm trọng</Tag>;
    },
  },
  {
    title: "Loại văn bản",
    key: "documentType",
    dataIndex: "documentType",
    render: (documentType) => (
      <>
        {documentType.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
];

const data = [
  {
    key: "3",
    title: "Joe Black",
    agency: "Đại học Huế",
    textNumber: "21/NQ-HĐĐH",
    dateIssued: "20/02/2022",
    signer: "Huỳnh Văn Chương",
    validityStatus: "Đang có hiệu lực",
    documentType: ["nghị quyết", "thông báo"],
    degreeOfUrgency: "Bình thường",
  },
];
export default function SummaryTable() {
  return (
    <>
      <RowAnt>
        <Col span={24}>
          <Table columns={columns} dataSource={data} pagination={false} />
        </Col>
      </RowAnt>
      <RowAnt>
        <Col span={24}>
          <Typography.Title level={4}>Tóm tắt văn bản</Typography.Title>
          <Typography.Paragraph
            style={{
              fontSize: "17px",
              lineHeight: "1.5",
            }}
          >
            Căn cứ Nghị định số 30/CP ngày 04 tháng 4 năm 1994 của Chính phủ về việc thành lập Đại
            học Huế; Căn cứ Thông tư số 10/2020/TT-BGDĐT ngày 14 tháng 5 năm 2020 của Bộ trưởng Bộ
            Giáo dục và Đào tạo ban hành Quy chế tổ chức và hoạt động của đại học vùng và các cơ sở
            giáo dục đại học thành viên; Căn cứ Quyết định số 20/QĐ-HĐĐH ngày 31 tháng 7 năm 2020
            của Hội đồng Đại học Huế ban hành Quy chế tổ chức và hoạt động của Đại học Huế; Quyết
            định số 07/QĐ-HĐĐH ngày 19 tháng 01 năm 2021 của Hội đồng Đại học Huế sửa đổi, bổ sung
            một số điều của Quy chế tổ chức và hoạt động của Đại học Huế; Căn cứ Nghị quyết số
            45/NQ-HĐĐH ngày 06 tháng 8 năm 2021 của Hội đồng Đại học Huế ban hành Quy chế hoạt động
            của Hội đồng Đại học Huế nhiệm kỳ 2021 - 2026; Căn cứ Quyết định số 06/QĐ-HĐĐH ngày 19
            tháng 01 năm 2021 của Hội đồng Đại học Huế ban hành Quy định công nhận, bổ nhiệm, bổ
            nhiệm lại, kéo dài thời gian giữ chức vụ, thôi giữ chức vụ, miễn nhiệm, luân chuyển và
            chế độ phụ cấp chức vụ đối với viên chức quản lý tại Đại học Huế; Căn cứ Nghị quyết số
            87/NQ-HĐĐH ngày 08 tháng 12 năm 2021.
          </Typography.Paragraph>
        </Col>
      </RowAnt>
    </>
  );
}
