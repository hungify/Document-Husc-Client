import { Menu } from "antd";
import React from "react";

export default function SubMenu({ dataRender, title, icon, valueKey }) {
  return (
    <>
      <Menu.SubMenu
        icon={icon}
        title={title}
        style={{
          marginLeft: "24px",
        }}
        key={valueKey}
      >
        {dataRender.map((item) =>
          item.children.length > 0 ? (
            <Menu.SubMenu title={item.title} key={item.key}>
              {item.children.map((child) =>
                child.children.length > 0 ? (
                  <Menu.SubMenu title={child.title} key={child.key}>
                    {child?.children.map((c) => (
                      <Menu.Item key={c.key}>{c.title}</Menu.Item>
                    ))}
                  </Menu.SubMenu>
                ) : (
                  <Menu.Item key={child.key}>{child.title}</Menu.Item>
                )
              )}
            </Menu.SubMenu>
          ) : (
            <Menu.Item key={item.key}>{item.title}</Menu.Item>
          )
        )}
      </Menu.SubMenu>
    </>
  );
}
