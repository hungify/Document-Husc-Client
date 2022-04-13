import {
  AppstoreTwoTone,
  BankTwoTone,
  DashboardOutlined,
  DashboardTwoTone,
  FileSearchOutlined,
  FileUnknownTwoTone,
  InboxOutlined,
  SendOutlined,
  SnippetsTwoTone,
} from "@ant-design/icons";

export const menuConfig = {
  ADMIN: [
    {
      title: "Bảng điều khiển",
      key: "dashboard",
      value: "dashboard",
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
      key: "categories",
      value: "categories",
      icon: <AppstoreTwoTone />,
    },
    {
      title: "Quản lý cơ quan ban hành",
      key: "agencies",
      value: "agency",
      icon: <BankTwoTone />,
    },
  ],
  USER: [
    {
      title: "Bảng điều khiển",
      key: "dashboard",
      value: "dashboard",
      icon: <DashboardOutlined />,
    },
    {
      title: "Văn bản đến",
      key: "inbox",
      value: "inbox",
      icon: <InboxOutlined />,
    },
    {
      title: "Văn bản đã gửi",
      key: "forward",
      value: "forward",
      icon: <SendOutlined />,
    },
  ],
  GUEST: [
    {
      title: "Tra cứu văn bản",
      key: "lookup",
      value: "lookup",
      icon: <FileSearchOutlined />,
    },
  ],
};
