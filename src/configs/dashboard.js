import {
  AppstoreOutlined,
  AuditOutlined,
  ExperimentOutlined,
  FieldTimeOutlined,
  FileDoneOutlined,
  FormOutlined,
  SendOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";
import CategoryIcon from "components/Icons/CategoryIcon";

export const analyticsConfig = {
  ADMIN: [
    {
      title: "Số văn bản",
      key: "document-total",
      value: 60,
      icon: <SnippetsOutlined style={{ fontSize: 25 }} />,
    },
    {
      title: "Số chuyên mục",
      key: "category-total",
      value: 10,
      icon: <CategoryIcon style={{ fontSize: 25, color: "#fff" }} />,
    },
    {
      title: "Số cơ quan ban hành",
      key: "agency-total",
      value: 10,
      icon: <AuditOutlined style={{ fontSize: 25 }} />,
    },
    {
      title: "Văn bản nháp",
      key: "document-draft",
      value: 2,
      icon: <FormOutlined style={{ fontSize: 25 }} />,
    },
  ],
  USER: [
    {
      title: "Số văn bản đã nhận",
      key: "document-total",
      value: 13,
      icon: <ExperimentOutlined style={{ fontSize: 25 }} />,
    },
    {
      title: "Văn bản chờ xử lý",
      key: "document-pending",
      value: 3,
      icon: <FieldTimeOutlined style={{ fontSize: 25 }} />,
    },
    {
      title: "Văn bản đã xử lý",
      key: "document-approved",
      value: 10,
      icon: <FileDoneOutlined style={{ fontSize: 25 }} />,
    },
    {
      title: "Văn bản đã gửi",
      key: "document-sent",
      value: 20,
      icon: <SendOutlined style={{ fontSize: 25 }} />,
    },
  ],
};
