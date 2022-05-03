import { Badge } from "antd";

export default function BadgeRibbonUrgent({ text, children, colorTag }) {
  const color = colorTag ? colorTag : text === "Bình thường" ? "green" : "red";

  return (
    <Badge.Ribbon text={text} color={color}>
      {children}
    </Badge.Ribbon>
  );
}
