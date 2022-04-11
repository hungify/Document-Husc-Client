import { Button, Tooltip } from "antd";

export default function ButtonEdit(props) {
  const { onEditClick, item, icon } = props;
  return (
    <Tooltip title="Cập nhật thông tin văn bản này?">
      <Button onClick={() => onEditClick(item)} icon={icon} type="primary">
        Chỉnh sửa
      </Button>
    </Tooltip>
  );
}
