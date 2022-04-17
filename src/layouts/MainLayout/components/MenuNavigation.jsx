import { Menu } from "antd";
import React from "react";

export default function MenuNavigation(props) {
  const { menuList, onMenuSelect, selectedKeys } = props;

  const handleMenuSelect = (keysSelected) => {
    onMenuSelect(keysSelected);
  };

  return (
    <Menu {...props} selectedKeys={selectedKeys} onSelect={handleMenuSelect}>
      {menuList?.map((item) =>
        item.children ? (
          <Menu.ItemGroup key={item.key} title={item.title}>
            {item.children?.map((c) => (
              <Menu.Item key={c.key} icon={c.icon}>
                {c.title}
              </Menu.Item>
            ))}
          </Menu.ItemGroup>
        ) : (
          <Menu.Item key={item.key} icon={item.icon}>
            {item.title}
          </Menu.Item>
        )
      )}
    </Menu>
  );
}
