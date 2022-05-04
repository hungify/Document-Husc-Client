import {
  AuditOutlined,
  FieldTimeOutlined,
  FileDoneOutlined,
  FormOutlined,
  InboxOutlined,
  SendOutlined,
  SnippetsOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import CategoryIcon from "components/Icons/CategoryIcon";

const analyticsConfig = [
  {
    title: "Số văn bản",
    name: "documents",
    icon: <SnippetsOutlined style={{ fontSize: 25 }} />,
  },
  {
    title: "Số chuyên mục",
    name: "categories",
    icon: <CategoryIcon style={{ fontSize: 25, color: "#fff" }} />,
  },
  {
    title: "Số loại văn bản",
    name: "type of documents",
    icon: <TagsOutlined style={{ fontSize: 25 }} />,
  },
  {
    title: "Số cơ quan ban hành",
    name: "agencies",
    icon: <AuditOutlined style={{ fontSize: 25 }} />,
  },
  {
    title: "Văn bản nháp",
    name: "drafts",
    icon: <FormOutlined style={{ fontSize: 25 }} />,
  },
  {
    title: "Số văn bản đã nhận",
    name: "inbox",
    icon: <InboxOutlined style={{ fontSize: 25 }} />,
  },
  {
    title: "Văn bản chờ xử lý",
    name: "unread",
    icon: <FieldTimeOutlined style={{ fontSize: 25 }} />,
  },
  {
    title: "Văn bản đã xử lý",
    name: "read",
    icon: <FileDoneOutlined style={{ fontSize: 25 }} />,
  },
  {
    title: "Văn bản đã gửi",
    name: "sent",
    icon: <SendOutlined style={{ fontSize: 25 }} />,
  },
];

export const bindingAnalyticsConfig = (data) => {
  const arr = [];
  data.forEach((item) => {
    return analyticsConfig.forEach((analytic) => {
      if (item.name === analytic.name) {
        arr.push({
          ...analytic,
          value: item.value,
        });
      }
    });
  });
  return arr;
};
