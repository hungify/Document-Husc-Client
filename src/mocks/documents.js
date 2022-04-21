import pdfFile1 from "assets/pdf/test.pdf";
import pdfFile2 from "assets/pdf/test2.pdf";
import { v4 as uuidv4 } from "uuid";

export const mockDocumentListPublic = [];
for (let i = 0; i < 10; i++) {
  mockDocumentListPublic.push({
    key: uuidv4(),
    typesOfDocument: "Nghị quyết",
    documentNumber: `${i}/NQ-HĐĐH`,
    signer: "Nguyễn Vũ Quốc Huy",
    dateIssued: "2020-05-01",
    authorityIssued: "Đại Học Huế",
    validityStatus: "Đang có hiệu lực",
    category: "Khoa học công nghệ",
    urgentLevel: "Bình thường",
    title: `21/NQ-HĐĐH : Nghị quyết về việc công nhận Hiệu trưởng Trường Đại học Y - Dược, Đại học Huế nhiệm kỳ 2020 - 2025`,
    summary:
      "Căn cứ Nghị định số 30/CP ngày 04 tháng 4 năm 1994 của Chính phủ về việc thành lập Đại học Huế; Căn cứ Thông tư số 10/2020/TT-BGDĐT ngày 14 tháng 5 năm 2020 của Bộ trưởng Bộ Giáo dục và Đào tạo ban hành Quy chế tổ chức và hoạt động của đại học vùng và các cơ sở giáo dục đại học thành viên",
    fileList: [
      {
        fileName: "test.pdf",
        fileUrl: pdfFile1,
      },
      {
        fileName: "test2.pdf",
        fileUrl: pdfFile2,
      },
    ],
    isProtect: false,
    treeProcessing: [
      {
        name: "Nguyễn Vũ Quốc Huy",
        publishDate: "2020-05-01",
        key: "root",
        children: [],
      },
    ],
  });
}

export const mockDocumentListProtect = [...mockDocumentListPublic];
for (let i = 0; i < 5; i++) {
  mockDocumentListProtect.push({
    key: uuidv4(),
    typesOfDocument: "Nghị quyết",
    documentNumber: `${i}/NQ-DHH`,
    signer: "Nguyễn Vũ Quốc Huy",
    dateIssued: "2020-05-01",
    authorityIssued: "Đại Học Huế",
    validityStatus: "Đang có hiệu lực",
    category: "Khoa học công nghệ",
    urgentLevel: "Bình thường",
    isRead: i % 2 === 0,
    isProtect: true,
    title:
      i % 2 === 0
        ? `21/NQ-HĐĐH : Nghị quyết về việc công nhận Hiệu trưởng Trường Đại học Y - Dược, Đại học Huế nhiệm kỳ 2020 - 2025`
        : `Thành lập Hội đồng Ban Giám khảo chấm sơ khảo Cuộc thi Ý tưởng sáng tạo khoa học và khởi nghiệp nông nghiệp lần thứ IV năm 2022`,
    summary:
      "Căn cứ Nghị định số 30/CP ngày 04 tháng 4 năm 1994 của Chính phủ về việc thành lập Đại học Huế; Căn cứ Thông tư số 10/2020/TT-BGDĐT ngày 14 tháng 5 năm 2020 của Bộ trưởng Bộ Giáo dục và Đào tạo ban hành Quy chế tổ chức và hoạt động của đại học vùng và các cơ sở giáo dục đại học thành viên",
    fileList: [
      {
        fileName: "test.pdf",
        fileUrl: pdfFile1,
      },
      {
        fileName: "test2.pdf",
        fileUrl: pdfFile2,
      },
    ],
    treeProcessing: [
      {
        name: "Nguyễn Vũ Quốc Huy",
        publishDate: "2020-05-01",
        key: "root",
        children: [
          {
            name: "Đại học Khoa học Huế",
            key: "Hue_University_of_Science",
            forwardDate: "2020-05-01",
            readDate: "2020-05-01",
            children: [
              {
                name: "Văn thư khoa Công nghệ thông tin",
                key: "Hue_University_CNTT",
                forwardDate: "2020-05-01",
                readDate: "2020-05-01",
                children: [
                  {
                    name: "Trần nguyễn phong",
                    key: "Hue_University_CNTT_UUID_1",
                  },
                  {
                    name: "Nguyễn Ngọc Thủy",
                    key: "Hue_University_of_Science_CNTT_UUID_2",
                  },
                  {
                    name: "Nguyễn Việt Dũng",
                    key: "Hue_University_of_Science_CNTT_UUID_3",
                    readDate: "2020-05-01",
                  },
                  {
                    name: "Đoàn Thị Hồng Phước",
                    key: "Hue_University_of_Science_CNTT_UUID_4",
                    readDate: "2020-05-01",
                  },
                  {
                    name: "Nguyễn Thị Bích Lộc",
                    key: "Hue_University_of_Science_CNTT_UUID_5",
                    readDate: "2020-05-01",
                  },
                  {
                    name: "Lê Văn Tường Lân",
                    key: "Hue_University_of_Science_CNTT_UUID_6",
                  },
                  {
                    name: "Nguyễn Dũng",
                    key: "Hue_University_of_Science_CNTT_UUID_7",
                  },
                ],
              },
              {
                name: "Văn thư khoa Điện tử viễn thông",
                key: "Hue_University_of_Science_DTVT",
                forwardDate: "2020-05-01",
                readDate: "2020-05-01",
                children: [
                  {
                    name: "Nguyễn Hoàng Hà",
                    key: "Hue_University_of_Science_DTVT_UUID_8",
                    readDate: "2020-05-01",
                  },
                  {
                    name: "Hoàng Quang",
                    key: "Hue_University_of_Science_DTVT_UUID_9",
                  },
                  {
                    name: "Nguyễn Thị Nhân",
                    key: "Hue_University_of_Science_DTVT_UUID_10",
                    readDate: "2020-05-01",
                  },
                ],
              },
              {
                name: "Văn thư khoa Toán",
                key: "Hue_University_of_Science_Toan",
                forwardDate: "2020-05-01",
                readDate: "2020-05-01",
                children: [
                  {
                    name: "Nguyễn Thị Thảo",
                    key: "Hue_University_of_Science_Toan_UUID_11",
                  },
                  {
                    name: "Nguyễn Trần Kim Toàn",
                    key: "Hue_University_of_Science_Toan_UUID_12",
                  },
                  {
                    name: "Trần Anh Dũng",
                    key: "Hue_University_of_Science_Toan_UUID_13",
                  },
                ],
              },
              {
                name: "Văn thư khoa Báo chí",
                key: "Hue_University_of_Science_BaoChi",
                forwardDate: "2020-05-01",
                readDate: "2020-05-01",
                children: [
                  {
                    name: "Hoàng Thị Thúy",
                    key: "Hue_University_of_Science_BaoChi_UUID_14",
                  },
                  {
                    name: "Đinh Văn Hải",
                    key: "Hue_University_of_Science_BaoChi_UUID_15",
                  },
                  {
                    name: "Nguyễn Mạnh Cường",
                    key: "Hue_University_of_Science_BaoChi_UUID_16",
                  },
                ],
              },
              {
                name: "Văn thư khoa Kiến trúc",
                key: "Hue_University_of_Science_KienTruc",
                forwardDate: "2020-05-01",
                readDate: "2020-05-01",
                children: [
                  {
                    name: "Nguyễn Đình Toàn Thắng",
                    key: "Hue_University_of_Science_KienTruc_UUID_17",
                  },
                  {
                    name: "Hoàng Hữu Thịnh",
                    key: "Hue_University_of_Science_KienTruc_UUID_18",
                  },
                ],
              },
              {
                name: "Văn thư khoa Công tác xã hội",
                key: "Hue_University_of_Science_CongTacXaHoi",
                forwardDate: "2020-05-01",
                readDate: "2020-05-01",
                children: [
                  {
                    name: "Nguyễn Anh Minh",
                    key: "Hue_University_of_Science_CongTacXaHoi_UUID_19",
                  },
                  {
                    name: "Quách Thị Kim Thảo",
                    key: "Hue_University_of_Science_CongTacXaHoi_UUID_20",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  });
}

export const mockDocumentListLatest = [];
for (let i = 0; i < mockDocumentListProtect.length - 3; i++) {
  mockDocumentListLatest.push(mockDocumentListProtect[i]);
}
