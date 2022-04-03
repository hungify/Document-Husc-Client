import { Menu } from "antd";
import React from "react";

export default function MenuNavigation(props) {
  const { dataRender, onMenuSelect, hasSubMenu } = props;

  const rootSubmenuKeys = ["documents", "agencies", "categories"];
  const [openKeys, setOpenKeys] = React.useState([]);

  const handleMenuChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  const handleMenuSelect = (keysSelected) => {
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
        ? dataRender.map((d) =>
            d.documents ? (
              <Menu.SubMenu key={d.documents.key} icon={d.documents.icon} title={d.documents.title}>
                {d.documents.data.map((document) => (
                  <Menu.Item key={document.id}>{document.title}</Menu.Item>
                ))}
              </Menu.SubMenu>
            ) : d.agencies ? (
              <Menu.SubMenu icon={d.agencies.icon} title={d.agencies.title} key={d.agencies.key}>
                {d.agencies.data.map((agency) => (
                  <Menu.Item key={agency.key}>{agency.title}</Menu.Item>
                ))}
              </Menu.SubMenu>
            ) : (
              <Menu.SubMenu
                icon={d.categories.icon}
                title={d.categories.title}
                key={d.categories.key}
              >
                {d.categories.data.map((category) =>
                  category.children.length > 0 ? (
                    <Menu.SubMenu title={category.title} key={category.key}>
                      {category.children.map((child) =>
                        child.children.length > 0 ? (
                          <Menu.SubMenu title={child.title} key={child.key}>
                            {child?.children.map((c) => (
                              <Menu.Item key={c.id}>{c.title}</Menu.Item>
                            ))}
                          </Menu.SubMenu>
                        ) : (
                          <Menu.Item key={child.id}>{child.title}</Menu.Item>
                        )
                      )}
                    </Menu.SubMenu>
                  ) : (
                    <Menu.Item key={category.id}>{category.title}</Menu.Item>
                  )
                )}
              </Menu.SubMenu>
            )
          )
        : dataRender.map((d) => (
            <Menu.Item key={d.key} icon={d.icon}>
              {d.title}
            </Menu.Item>
          ))}
    </Menu>
  );
}
