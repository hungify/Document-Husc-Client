import {
  AppstoreTwoTone,
  BankTwoTone,
  CarryOutTwoTone,
  DashboardOutlined,
  DashboardTwoTone,
  DeleteTwoTone,
  FileOutlined,
  FileSearchOutlined,
  FileTextTwoTone,
  FileUnknownTwoTone,
  InboxOutlined,
  MedicineBoxTwoTone,
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
      title: "Văn bản đến",
      key: "inbox",
      value: "inbox",
      icon: <MedicineBoxTwoTone />,
    },
    {
      title: "Văn bản đã gửi",
      key: "forward",
      value: "forward",
      icon: <CarryOutTwoTone />,
    },
    {
      title: "Văn bản nháp",
      key: "draft",
      value: "draft",
      icon: <FileTextTwoTone />,
    },
    {
      title: "Quản lý văn bản",
      key: "documents",
      value: "documents",
      icon: <SnippetsTwoTone />,
    },
    {
      title: "Quản lý loại văn bản",
      key: "types-of-documents",
      value: "types-of-documents",
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
    {
      title: "Quản lý văn bản thu hồi",
      key: "revoke-documents",
      value: "revoke-documents",
      icon: <DeleteTwoTone />,
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
      title: "Tra cứu văn bản",
      key: "lookup",
      value: "lookup",
      icon: <FileSearchOutlined />,
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
