import { GlobalOutlined, UsergroupAddOutlined } from "@ant-design/icons";

export const selectConfig = {
  urgency: [
    {
      value: "normal",
      label: "Bình thường",
      colorTag: "green",
    },
    {
      value: "emergency",
      label: "Khần cấp",
      colorTag: "red",
    },
  ],
  status: [
    {
      value: "public",
      label: "Công khai",
      colorTag: "green",
      icon: <GlobalOutlined />,
    },
    {
      value: "private",
      label: "Riêng tư",
      colorTag: "red",
      icon: <UsergroupAddOutlined />,
    },
  ],
  document: [
    {
      value: "document-1",
      label: "Quyết định",
    },
    {
      value: "document-2",
      label: "Nghị quyết",
    },
    {
      value: "document-3",
      label: "Thông tư",
    },
    {
      value: "document-4",
      label: "Chỉ thị",
    },
    {
      value: "document-5",
      label: "Thông báo",
    },
    {
      value: "document-6",
      label: "Luât - Pháp lệnh",
    },
    {
      value: "document-7",
      label: "Kế hoạch",
    },
    {
      value: "document-8",
      label: "Quy định, quy chế",
    },
    {
      value: "document-9",
      label: "Biểu mẫu, phụ lục",
    },
    {
      value: "document-10",
      label: "Công văn, văn bản điều hành khác",
    },
    {
      value: "document-11",
      label: "Nghị định",
    },
  ],
  agency: [
    {
      value: "agency-1",
      label: "Chính phủ",
    },
    {
      value: "agency-2",
      label: "Bộ giáo dục và đạo tạo",
    },
    {
      value: "agency-3",
      label: "Bộ khoa học và công nghệ",
    },
    {
      value: "agency-4",
      label: "Hồi đồng chức danh Giáo sư nhà nước",
    },
    {
      value: "agency-5",
      label: "Bộ tài chính",
    },
    {
      value: "agency-6",
      label: "Bộ, ngành khác",
    },
    {
      value: "agency-7",
      label: "Ủy ban nhân dân tỉnh/thành phố",
    },
    {
      value: "agency-8",
      label: "Đại học Huế",
    },
    {
      value: "agency-9",
      label: "Đại học khoa học Huế",
    },
  ],
};
