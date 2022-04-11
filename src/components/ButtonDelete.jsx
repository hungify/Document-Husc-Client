import { Button, Tooltip } from "antd";

export default function ButtonDelete(props) {
  const { handleDeleteClick, item, icon } = props;
  return (
    <Tooltip title="Xóa văn bản này?">
      <Button onClick={() => handleDeleteClick(item)} icon={icon} danger type="dashed">
        Xóa
      </Button>
    </Tooltip>
  );
}
