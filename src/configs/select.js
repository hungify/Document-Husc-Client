import { GlobalOutlined, UsergroupAddOutlined } from "@ant-design/icons";

export const selectConfig = {
  urgency: [
    {
      id: "normal",
      value: "Bình thường",
      colorTag: "green",
    },
    {
      id: "emergency",
      value: "Khần cấp",
      colorTag: "red",
    },
  ],
  status: [
    {
      id: "public",
      value: "Công khai",
      colorTag: "green",
      icon: <GlobalOutlined />,
    },
    {
      id: "private",
      value: "Riêng tư",
      colorTag: "red",
      icon: <UsergroupAddOutlined />,
    },
  ],
  document: [
    {
      id: "document-1",
      value: "Quyết định",
    },
    {
      id: "document-2",
      value: "Nghị quyết",
    },
    {
      id: "document-3",
      value: "Thông tư",
    },
    {
      id: "document-4",
      value: "Chỉ thị",
    },
    {
      id: "document-5",
      value: "Thông báo",
    },
    {
      id: "document-6",
      value: "Luât - Pháp lệnh",
    },
    {
      id: "document-7",
      value: "Kế hoạch",
    },
    {
      id: "document-8",
      value: "Quy định, quy chế",
    },
    {
      id: "document-9",
      value: "Biểu mẫu, phụ lục",
    },
    {
      id: "document-10",
      value: "Công văn, văn bản điều hành khác",
    },
    {
      id: "document-11",
      value: "Nghị định",
    },
  ],
  agency: [
    {
      id: "agency-1",
      value: "Chính phủ",
    },
    {
      id: "agency-2",
      value: "Bộ giáo dục và đạo tạo",
    },
    {
      id: "agency-3",
      value: "Bộ khoa học và công nghệ",
    },
    {
      id: "agency-4",
      value: "Hồi đồng chức danh Giáo sư nhà nước",
    },
    {
      id: "agency-5",
      value: "Bộ tài chính",
    },
    {
      id: "agency-6",
      value: "Bộ, ngành khác",
    },
    {
      id: "agency-7",
      value: "Ủy ban nhân dân tỉnh/thành phố",
    },
    {
      id: "agency-8",
      value: "Đại học Huế",
    },
    {
      id: "agency-9",
      value: "Đại học khoa học Huế",
    },
  ],
};
