import {
  AppstoreTwoTone,
  BankTwoTone,
  DashboardTwoTone,
  FileUnknownTwoTone,
  InboxOutlined,
  SendOutlined,
  SnippetsTwoTone
} from "@ant-design/icons";
import { agencies, categories, documents } from "config/sidebar";

export const menuConfig = {
  adminLayout: [
    {
      title: "Thống kê",
      key: "dashboard/analytics",
      value: "dashboard/analytics",
      icon: <DashboardTwoTone />,
    },
    {
      title: "Quản lý văn bản",
      key: "documents",
      value: "documents",
      icon: <SnippetsTwoTone />,
    },
    {
      title: "Quản lý loại văn bản",
      key: "document-type",
      value: "document-type",
      icon: <FileUnknownTwoTone />,
    },
    {
      title: "Quản lý chuyên mục",
      key: "category",
      value: "category",
      icon: <AppstoreTwoTone />,
    },
    {
      title: "Quản lý cơ quan ban hành",
      key: "agency",
      value: "agency",
      icon: <BankTwoTone />,
    },
  ],
  userLayout: [
    {
      title: "Hộp thư gửi đến",
      key: "inbox",
      value: "inbox",
      icon: <InboxOutlined />,
    },
    {
      title: "Đã chuyển tiếp",
      key: "forward",
      value: "forward",
      icon: <SendOutlined />,
    },
  ],
  guestLayout: [{ documents }, { agencies }, { categories }],
};
