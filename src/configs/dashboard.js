import {
  AppstoreOutlined,
  AuditOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  FormOutlined,
  SendOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";

export const analyticsConfig = {
  ADMIN: [
    {
      title: "Văn bản nháp",
      key: "document-draft",
      value: 2,
      icon: <FormOutlined size="large" />,
    },
    {
      title: "Văn bản chờ xử lý",
      key: "document-pending",
      value: 3,
      icon: <ClockCircleOutlined size="large" />,
    },
    {
      title: "Văn bản đã xử lý",
      key: "document-approved",
      value: 10,
      icon: <CheckCircleOutlined size="large" />,
    },
    {
      title: "Văn bản đã gửi",
      key: "document-sent",
      value: 20,
      icon: <SendOutlined size="large" />,
    },
  ],
  USER: [
    {
      title: "Số văn bản",
      key: "document-total",
      value: 60,
      icon: <SnippetsOutlined size="large" />,
    },
    {
      title: "Số chuyên mục",
      key: "category-total",
      value: 10,
      icon: <AppstoreOutlined size="large" />,
    },
    {
      title: "Số cơ quan ban hành",
      key: "agency-total",
      value: 10,
      icon: <AuditOutlined size="large" />,
    },
  ],
};
