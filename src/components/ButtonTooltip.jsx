import { Button, Tooltip } from "antd";

export default function ButtonTooltip(props) {
  const { document, type, icon, onButtonClick, title, disabled, loading, children, ...rest } =
    props;
  return (
    <Tooltip title={title}>
      <Button
        {...rest}
        type={type}
        icon={icon}
        onClick={() => onButtonClick(document)}
        disabled={disabled}
        loading={loading}
      >
        {children}
      </Button>
    </Tooltip>
  );
}
