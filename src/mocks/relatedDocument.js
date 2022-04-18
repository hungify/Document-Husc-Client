import { v4 as uuidv4 } from "uuid";
import pdfFile from "assets/pdf/test2.pdf";

export const mockRelatedDocument = [];
for (let i = 0; i < 2; i++) {
  mockRelatedDocument.push({
    key: uuidv4(),
    title: `26/NQ-HĐĐH : Nghị quyết về việc phê duyệt Đề án thành lập Trung tâm Khảo thí - Đại học Huế`,
    avatar: "Admin",
    typesOfDocument: "Nghị Quyết",
    documentNumber: "26/NQ-HĐĐH",
    signer: "Huỳnh Văn Chương",
    dateIssued: "2022-03-31",
    authorityIssued: "Đại Học Huế",
    urgentLevel: "Bình thường",
    content:
      "Căn cứ Nghị định số 30/CP ngày 04 tháng 4 năm 1994 của Chính phủ về việc thành lập Đại học Huế; Căn cứ Thông tư số 10/2020/TT-BGDĐT ngày 14 tháng 5 năm 2020 của Bộ trưởng Bộ Giáo dục và Đào tạo ban hành Quy chế tổ chức và hoạt động của đại học vùng và các cơ sở giáo dục đại học thành viên; Căn cứ Quyết định số 20/QĐ-HĐĐH ngày 31 tháng 7 năm 2020 của Hội đồng Đại học Huế về việc ban hành Quy chế tổ chức và hoạt động của Đại học Huế; Quyết định số 07/QĐ-HĐĐH ngày 19 tháng 01 năm 2021 của Hội đồng Đại học Huế về việc sửa đổi, bổ sung một số điều của Quy chế tổ chức và hoạt động của Đại học Huế",
    fileUrl: pdfFile,
  });
}
