import { DashboardTwoTone, InboxOutlined, SendOutlined, UserOutlined } from "@ant-design/icons";
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
      title: "Quản lý loại văn bản",
      key: "document",
      value: "document",
      icon: <UserOutlined />,
    },
    {
      title: "Quản lý chuyên mục",
      key: "category",
      value: "category",
      icon: <UserOutlined />,
    },
    {
      title: "Quản lý cơ quan ban hành",
      key: "agency",
      value: "agency",
      icon: <UserOutlined />,
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
  guestLayout: [
    {
      title: "Loại văn bản",
      key: "document",
      value: "document",
      icon: <UserOutlined />,
      data: documents.data,
    },
    {
      title: "Cơ quan ban hành",
      key: "agency",
      value: "agency",
      icon: <UserOutlined />,
      data: agencies.data,
    },
    {
      title: "Chuyên mục",
      key: "category",
      value: "category",
      icon: <UserOutlined />,
      data: categories.data,
    },
  ],
};
