import * as React from "react";
import { Layout, Menu, Button } from "antd";
import Cookie from "js-cookie";
import Dashboard from "@/pages/dashboard";
import Item from "antd/lib/list/Item";
import SubMenu from "antd/lib/menu/SubMenu";

enum MenuType {
  item,
  subMenu,
}

const AdminLayout = (props) => {
  const { component, ...otherProps } = props;
  let C = component;

  const handleLogout = () => {
    Cookie.remove("token");
    props.history.push("/login");
  };

  const [selectedKeys, setSelectedKeys] = React.useState(() => {
    return props.location.pathname.split("/").filter((n) => n);
  });

  React.useEffect(() => {
    setSelectedKeys(props.location.pathname.split("/").filter((n) => n));
  }, [props.location.pathname]);

  const menus = [
    {
      type: MenuType.item,
      key: "dashboard",
      title: "首页",
    },
    {
      type: MenuType.subMenu,
      key: "center",
      title: "监控中心",
      children: [
        {
          type: MenuType.item,
          key: "device-map",
          title: "设备地图",
        },
      ],
    },
  ];

  const handleRedirect = (keys: string[]) => {
    if (keys.length) {
      props.history.replace("/" + keys.join("/"));
    }
  };

  const renderMenus = (items, keys = []) => {
    return items.map((menu) => {
      if (menu.type === MenuType.item) {
        return (
          <Menu.Item
            key={menu.key}
            onClick={() => handleRedirect([...keys, menu.key])}
          >
            {menu.title}
          </Menu.Item>
        );
      } else {
        return (
          <Menu.SubMenu key={menu.key} title={menu.title}>
            {renderMenus(menu.children, [...keys, menu.key])}
          </Menu.SubMenu>
        );
      }
    });
  };

  return (
    <Layout style={{ height: "100%" }}>
      <Layout.Sider>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={selectedKeys}
          defaultOpenKeys={selectedKeys}
          selectedKeys={selectedKeys}
        >
          {renderMenus(menus)}
        </Menu>
      </Layout.Sider>
      <Layout.Content style={{ padding: 8 }}>
        <Button onClick={handleLogout}>logout</Button>
        <C {...otherProps} />
      </Layout.Content>
    </Layout>
  );
};

export default AdminLayout;
