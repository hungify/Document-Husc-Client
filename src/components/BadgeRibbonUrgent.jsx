import { Badge } from "antd";

export default function BadgeRibbonUrgent({ text, children }) {
  const color = text === "Bình thường" ? "green" : "red";

  return (
    <Badge.Ribbon text={text} color={color}>
      {children}
    </Badge.Ribbon>
  );
}
