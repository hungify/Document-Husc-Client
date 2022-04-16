import {
  AppstoreTwoTone,
  AuditOutlined,
  BankTwoTone,
  CarryOutTwoTone,
  DashboardOutlined,
  DashboardTwoTone,
  DeleteTwoTone,
  FileDoneOutlined,
  FileOutlined,
  FileSearchOutlined,
  FileTextTwoTone,
  FileTwoTone,
  FileUnknownTwoTone,
  InboxOutlined,
  MedicineBoxTwoTone,
  SendOutlined,
  SnippetsTwoTone,
} from "@ant-design/icons";
import ArchiveInIcon from "components/Icons/ArchiveInIcon";

export const menuConfig = {
  ADMIN: [
    {
      title: "Văn bản nháp",
      key: "draft",
      value: "draft",
      icon: <FileTwoTone style={{ fontSize: 22 }} />,
    },
    {
      title: "Quản lý văn bản",
      key: "documents",
      value: "documents",
      icon: <SnippetsTwoTone style={{ fontSize: 22 }} />,
    },
    {
      title: "Quản lý loại văn bản",
      key: "types-of-documents",
      value: "types-of-documents",
      icon: <FileUnknownTwoTone style={{ fontSize: 22 }} />,
    },
    {
      title: "Quản lý chuyên mục",
      key: "categories",
      value: "categories",
      icon: <AppstoreTwoTone style={{ fontSize: 22 }} />,
    },
    {
      title: "Quản lý cơ quan ban hành",
      key: "agencies",
      value: "agency",
      icon: <AuditOutlined style={{ fontSize: 22, color: "rgba(24, 144, 255, 0.9)" }} />,
    },
    {
      title: "Quản lý văn bản thu hồi",
      key: "revoke-documents",
      value: "revoke-documents",
      icon: <ArchiveInIcon style={{ fontSize: 22, color: "rgba(24, 144, 255, 0.9)" }} />,
    },
  ],
  USER: [
    {
      title: "Bảng điều khiển",
      key: "dashboard",
      value: "dashboard",
      icon: <DashboardOutlined style={{ fontSize: 22, color: "rgba(24, 144, 255, 0.9)" }} />,
    },
    {
      title: "Văn bản đến",
      key: "inbox",
      value: "inbox",
      icon: <InboxOutlined style={{ fontSize: 22, color: "rgba(24, 144, 255, 0.9)" }} />,
    },
    {
      title: "Văn bản đã gửi",
      key: "forward",
      value: "forward",
      icon: <SendOutlined style={{ fontSize: 22, color: "rgba(24, 144, 255, 0.9)" }} />,
    },
  ],
};
