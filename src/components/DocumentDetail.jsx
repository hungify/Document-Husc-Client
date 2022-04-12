import { Tabs } from "antd";
import PreviewPdf from "components/PreviewPdf";
import SummaryTable from "components/SummaryTable";
import React from "react";
import { useLocation } from "react-router-dom";

const data = [
  {
    agency: "Đại học Huế",
    textNumber: "21/NQ-HĐĐH",
    dateIssued: "20/02/2022",
    signer: "Huỳnh Văn Chương",
    validityStatus: "Đang có hiệu lực",
    documentType: ["nghị quyết"],
    degreeOfUrgency: "Bình thường",
    summary:
      "Căn cứ Nghị định số 30/CP ngày 04 tháng 4 năm 1994 của Chính phủ về việc thành lập Đại học Huế; Căn cứ Thông tư số 10/2020/TT-BGDĐT ngày 14 tháng 5 năm 2020 của Bộ trưởng Bộ Giáo dục và Đào tạo ban hành Quy chế tổ chức và hoạt động của đại học vùng và các cơ sở giáo dục đại học thành viên; Căn cứ Quyết định số 20/QĐ-HĐĐH ngày 31 tháng 7 năm 2020 của Hội đồng Đại học Huế ban hành Quy chế tổ chức và hoạt động của Đại học Huế; Quyết định số 07/QĐ-HĐĐH ngày 19 tháng 01 năm 2021 của Hội đồng Đại học Huế sửa đổi, bổ sung một số điều của Quy chế tổ chức và hoạt động của Đại học Huế; Căn cứ Nghị quyết số 45/NQ-HĐĐH ngày 06 tháng 8 năm 2021 của Hội đồng Đại học Huế ban hành Quy chế hoạt động của Hội đồng Đại học Huế nhiệm kỳ 2021 - 2026; Căn cứ Quyết định số 06/QĐ-HĐĐH ngày 19 tháng 01 năm 2021 của Hội đồng Đại học Huế ban hành Quy định công nhận, bổ nhiệm, bổ nhiệm lại, kéo dài thời gian giữ chức vụ, thôi giữ chức vụ, miễn nhiệm, luân chuyển và chế độ phụ cấp chức vụ đối với viên chức quản lý tại Đại học Huế; Căn cứ Nghị quyết số 87/NQ-HĐĐH ngày 08 tháng 12 năm 2021.",
  },
];
export default function DocumentDetail() {
  const [activeTab, setActiveTab] = React.useState("summary");
  const { pathname } = useLocation();
  const path = pathname.split("/");
  const handleTabChangeClick = (key) => {
    setActiveTab(key);
  };

  const onClosePreview = (visible) => {
    if (visible) setActiveTab("summary");
  };

  return (
    <Tabs activeKey={activeTab} type="card" size="large" onTabClick={handleTabChangeClick}>
      <Tabs.TabPane tab="Tóm tắt" key="summary">
        <SummaryTable documentData={data} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Văn bản gốc" key="preview">
        <PreviewPdf activeTab={activeTab} onClosePreview={onClosePreview} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Văn bản liên quan" key="related">
        Danh sách văn bản liên quan
      </Tabs.TabPane>
      {path[path.length - 3] === "inbox" && (
        <Tabs.TabPane tab="Cây xử lý" key="tree">
          Cây xử lý
        </Tabs.TabPane>
      )}
    </Tabs>
  );
}
