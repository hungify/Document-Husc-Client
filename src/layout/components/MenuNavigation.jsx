import { Menu } from "antd";
import SubMenu from "layout/components/SubMenu";
import React from "react";

export default function MenuNavigation(props) {
  const { dataRender, onMenuSelect, hasSubMenu } = props;
  const rootSubmenuKeys = ["documents", "agencies", "categories"];
  const [openKeys, setOpenKeys] = React.useState([]);

  const handleMenuChange = (keys) => {
    console.log("🚀 :: keys", keys);
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  const handleMenuSelect = (keysSelected) => {
    console.log("🚀 :: keysSelected", keysSelected);
    onMenuSelect(keysSelected);
  };

  return (
    <Menu
      {...props}
      openKeys={openKeys}
      onSelect={handleMenuSelect}
      onOpenChange={handleMenuChange}
    >
      {hasSubMenu
        ? dataRender.map((d) => {
            return d.documents ? (
              <SubMenu
                dataRender={d.documents.data}
                icon={d.documents.icon}
                title={d.documents.title}
                valueKey={d.documents.key}
              />
            ) : d.agencies ? (
              <SubMenu
                dataRender={d.agencies.data}
                icon={d.agencies.icon}
                title={d.agencies.title}
                valueKey={d.agencies.key}
              />
            ) : (
              <SubMenu
                dataRender={d.categories.data}
                icon={d.categories.icon}
                title={d.categories.title}
                valueKey={d.categories.key}
              />
            );
          })
        : dataRender.map((d) => (
            <Menu.Item key={d.key} icon={d.icon}>
              {d.title}
            </Menu.Item>
          ))}
    </Menu>
  );
}
