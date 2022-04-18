import { random } from "lodash";
import { v4 as uuidv4 } from "uuid";

export const mockDocumentListInbox = [];
for (let i = 0; i < 23; i++) {
  mockDocumentListInbox.push({
    key: uuidv4(),
    typesOfDocument: "Nghị quyết",
    documentNumber: "21/NQ-HĐĐH",
    signer: "Nguyễn Vũ Quốc Huy",
    dateIssued: "2020-05-01",
    authorityIssued: "Đại Học Huế",
    validityStatus: "Đang có hiệu lực",
    title: `21/NQ-HĐĐH : Nghị quyết về việc công nhận Hiệu trưởng Trường Đại học Y - Dược, Đại học Huế nhiệm kỳ 2020 - 2025 - ${i}`,
    summary:
      "Căn cứ Nghị định số 30/CP ngày 04 tháng 4 năm 1994 của Chính phủ về việc thành lập Đại học Huế; Căn cứ Thông tư số 10/2020/TT-BGDĐT ngày 14 tháng 5 năm 2020 của Bộ trưởng Bộ Giáo dục và Đào tạo ban hành Quy chế tổ chức và hoạt động của đại học vùng và các cơ sở giáo dục đại học thành viên; Căn cứ Quyết định số 20/QĐ-HĐĐH ngày 31 tháng 7 năm 2020 của Hội đồng Đại học Huế ban hành Quy chế tổ chức và hoạt động của Đại học Huế; Quyết định số 07/QĐ-HĐĐH ngày 19 tháng 01 năm 2021 của Hội đồng Đại học Huế sửa đổi, bổ sung một số điều của Quy chế tổ chức và hoạt động của Đại học Huế; Căn cứ Nghị quyết số 45/NQ-HĐĐH ngày 06 tháng 8 năm 2021 của Hội đồng Đại học Huế ban hành Quy chế hoạt động của Hội đồng Đại học Huế nhiệm kỳ 2021 - 2026; Căn cứ Quyết định số 06/QĐ-HĐĐH ngày 19 tháng 01 năm 2021 của Hội đồng Đại học Huế ban hành Quy định công nhận, bổ nhiệm, bổ nhiệm lại, kéo dài thời gian giữ chức vụ, thôi giữ chức vụ, miễn nhiệm, luân chuyển và chế độ phụ cấp chức vụ đối với viên chức quản lý tại Đại học Huế; Căn cứ Nghị quyết số 87/NQ-HĐĐH ngày 08 tháng 12 năm 2021.",
    documentUrl: "https://www.google.com",
    isFinished: random() % 2 === 0,

    from: {
      name: "Nguyễn Mạnh Tuấn",
      avatar: "https://joeschmoe.io/api/v1/random",
      email: `email.receiver.${i}@husc.edu.vn`,
    },
    isRead: i % 2 === 0 ? true : false,
    urgentLevel: i % 3 === 0 ? "Khẩn cấp" : "Bình thường",
  });
}
