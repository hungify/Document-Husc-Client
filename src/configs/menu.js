import {
  AppstoreTwoTone,
  AuditOutlined,
  DashboardOutlined,
  FileTwoTone,
  FileUnknownTwoTone,
  InboxOutlined,
  SendOutlined,
  SnippetsTwoTone,
} from "@ant-design/icons";
import ArchiveInIcon from "components/Icons/ArchiveInIcon";
import RocketIcon from "components/Icons/RocketIcon";

export const menuConfig = {
  ADMIN: [
    {
      key: "lookup-operates",
      title: "Tra cứu và điều hành",
      children: [
        {
          title: "Ban hành văn bản",
          key: "issue",
          value: "issue",
          icon: <RocketIcon style={{ fontSize: 18, color: "rgba(24, 144, 255, 0.9)" }} />,
        },
        {
          title: "Văn bản nháp",
          key: "draft",
          value: "draft",
          icon: <FileTwoTone style={{ fontSize: 18 }} />,
        },
      ],
    },
    {
      key: "system-manager ",
      title: "Quản trị hệ thống",
      children: [
        {
          title: "Quản lý văn bản",
          key: "documents",
          value: "documents",
          icon: <SnippetsTwoTone style={{ fontSize: 18 }} />,
        },
        {
          title: "Quản lý loại văn bản",
          key: "types-of-documents",
          value: "types-of-documents",
          icon: <FileUnknownTwoTone style={{ fontSize: 18 }} />,
        },
        {
          title: "Quản lý chuyên mục",
          key: "categories",
          value: "categories",
          icon: <AppstoreTwoTone style={{ fontSize: 18 }} />,
        },
        {
          title: "Quản lý cơ quan ban hành",
          key: "agencies",
          value: "agency",
          icon: <AuditOutlined style={{ fontSize: 18, color: "rgba(24, 144, 255, 0.9)" }} />,
        },
        {
          title: "Quản lý văn bản thu hồi",
          key: "revoke-documents",
          value: "revoke-documents",
          icon: <ArchiveInIcon style={{ fontSize: 18, color: "rgba(24, 144, 255, 0.9)" }} />,
        },
      ],
    },
  ],
  USER: [
    {
      title: "Bảng điều khiển",
      key: "dashboard",
      value: "dashboard",
      icon: <DashboardOutlined style={{ fontSize: 18, color: "rgba(24, 144, 255, 0.9)" }} />,
    },
    {
      title: "Văn bản đến",
      key: "inbox",
      value: "inbox",
      icon: <InboxOutlined style={{ fontSize: 18, color: "rgba(24, 144, 255, 0.9)" }} />,
    },
    {
      title: "Văn bản đã gửi",
      key: "forward",
      value: "forward",
      icon: <SendOutlined style={{ fontSize: 18, color: "rgba(24, 144, 255, 0.9)" }} />,
    },
  ],
};
