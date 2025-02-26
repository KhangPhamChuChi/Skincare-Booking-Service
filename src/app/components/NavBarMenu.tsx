"use client";

import { Menu, Button, Badge, Dropdown } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import "../style/Navbars.css";
import { useRouter } from "next/navigation";
import { PagePath } from "../enums/page-path.enum";
import { Content } from "antd/es/layout/layout";
import Footers from "./Footer";
import useAuthStore from "../(Page)/(Authentication)/login/hooks/useAuthStore";

const NavbarMenu = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleMenuClick = (key: string) => {
    const routes: Record<string, string> = {
      service: PagePath.SKIN_SERVICE,
      blog: PagePath.BLOG,
      "skin-therapist": PagePath.SKIN_THERAPIST,
      price: PagePath.PRICE_SERVICE,
      home: PagePath.HOME_PAGE,
      skin: PagePath.SKIN_TYPE,
    };
    if (routes[key]) router.push(routes[key]);
  };

  const menuItems = [
    { key: "home", label: "Trang chủ" },
    { key: "service", label: "Dịch vụ" },
    { key: "blog", label: "Blog" },
    { key: "skin-therapist", label: "Chuyên viên trị liệu da" },
    { key: "price", label: "Bảng giá" },
    { key: "skin", label: "Loại da" },
  ];

  const handleMenu = (key: string) => {
    if (key === "account") {
      router.push("/Home/Profile");
    } else if (key === "logout") {
      logout();
      router.push(PagePath.LOGIN);
    }
  };

  // const accountMenu = (
  //   <Menu onClick={({ key }) => handleMenu(key)}>
  //     <Menu.Item key="account" icon={<UserOutlined />}>
  //       Thông tin tài khoản
  //     </Menu.Item>
  //     <Menu.Item
  //       key="logout"
  //       icon={<LogoutOutlined />}
  //       onClick={() => handleLogout()}
  //       style={{ color: "red" }}
  //     >
  //       Đăng xuất
  //     </Menu.Item>
  //   </Menu>
  // );
  const accountMenuItems = [
    {
      key: "account",
      label: "Thông tin tài khoản",
      icon: <UserOutlined />,
    },
    {
      key: "logout",
      label: "Đăng xuất",
      icon: <LogoutOutlined />,
      danger: true,
    },
  ];

  return (
    <>
      <div className="navbar-container">
        <div className="navbar-left">
          <Menu
            mode="horizontal"
            defaultSelectedKeys={["home"]}
            className="navbar-menu"
            onClick={({ key }) => handleMenuClick(key)}
            items={menuItems}
          />
        </div>

        <div className="navbar-middle"></div>

        <div className="navbar-right">
          {!user ? (
            <>
              <Button type="link" onClick={() => router.push(PagePath.LOGIN)}>
                Đăng nhập
              </Button>
              <Button
                type="primary"
                style={{ marginLeft: "8px" }}
                onClick={() => router.push(PagePath.LOGIN)}
              >
                Đăng ký
              </Button>
            </>
          ) : (
            <>
              <span style={{ marginRight: "8px" }}>{user.username}</span>
              <Dropdown
                menu={{
                  items: accountMenuItems,
                  onClick: ({ key }) => handleMenu(key),
                }}
              >
                <Badge size="small">
                  <UserOutlined
                    style={{ fontSize: "24px", marginLeft: "16px" }}
                  />
                </Badge>
              </Dropdown>
            </>
          )}
        </div>
      </div>
      <Content
        style={{ padding: "31px 48px", background: "rgb(241, 235, 228)" }}
      >
        {children}
      </Content>
      <Footers />
    </>
  );
};

export default NavbarMenu;
