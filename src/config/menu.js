import {
  AppstoreTwoTone,
  BankTwoTone,
  DashboardOutlined,
  DashboardTwoTone,
  FileSearchOutlined,
  FileUnknownTwoTone,
  InboxOutlined,
  NotificationTwoTone,
  SendOutlined,
  SnippetsTwoTone,
} from "@ant-design/icons";
import { agencies, categories, documents } from "config/sidebar";

export const menuConfig = {
  adminLayout: [
    {
      title: "Bảng điều khiển",
      key: "dashboard",
      value: "dashboard",
      icon: <DashboardTwoTone />,
    },
    {
      title: "Quản lý văn bản",
      key: "document",
      value: "document",
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
    {
      title: "Tra cứu văn bản",
      key: "..",
      value: "..",
      icon: <FileSearchOutlined />,
    },
  ],
  guestLayout: [{ documents }, { agencies }, { categories }],
};
