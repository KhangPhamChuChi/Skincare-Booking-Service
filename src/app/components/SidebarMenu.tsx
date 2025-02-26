/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import {
  HomeOutlined,
  AppstoreOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellFilled,
  UserOutlined,
  LogoutOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Layout,
  Menu,
  Button,
  Dropdown,
  Modal,
  Popover,
} from "antd";
import "../style/Home.css";
import useAuthStore from "../(Page)/(Authentication)/login/hooks/useAuthStore";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { PagePath } from "../enums/page-path.enum";
import { RoleCode } from "../enums/role.enum";

const { Header, Content, Sider } = Layout;

const SidebarMenu = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const { user, logout } = useAuthStore();

  useEffect(() => {
    document.title = "Trang chủ";
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleMenu = (key: string) => {
    if (key === "account") {
      router.push(PagePath.PROFILES);
    } else if (key === "logout") {
      handleLogout();
    }
  };

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

  const items2 = [
    {
      key: PagePath.HOME,
      icon: <HomeOutlined />,
      label: <Link href={PagePath.HOME}>Trang chủ</Link>,
    },
    ...(user?.role === RoleCode.ADMIN
      ? [
          {
            key: PagePath.USER,
            icon: <AppstoreOutlined />,
            label: <Link href={PagePath.USER}>Người dùng</Link>,
          },
        ]
      : []),
    ...(user?.role === RoleCode.STAFF || user?.role === RoleCode.THERAPIST
      ? [
          {
            key: PagePath.BOOKING,
            icon: <CalendarOutlined />,
            label: <Link href={PagePath.BOOKING}>Lịch đặt hẹn</Link>,
          },
          {
            key: PagePath.SCHEDULE,
            icon: <CalendarOutlined />,
            label: <Link href={PagePath.SCHEDULE}>Lịch làm việc</Link>,
          },
        ]
      : []),
  ];

  const notificationContent = (
    <div>
      <p>Chưa có thông báo</p>
      <BellFilled
        style={{ fontSize: "25px", display: "block", cursor: "pointer" }}
      />
    </div>
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{ backgroundColor: "rgb(242 245 248 / 1)", marginTop: "64px" }}
      >
        <Menu
          mode="inline"
          selectedKeys={[pathname]}
          style={{ height: "100%", borderRight: 0 }}
          items={items2}
          className="bg-light-109"
        />
      </Sider>

      <Layout>
        <Header
          style={{
            padding: 0,
            background: "#fff",
            display: "flex",
            alignItems: "center",
            width: "100%",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 10,
            borderBottom: "1px solid #EBEFF5",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
              border: "none",
              outline: "none",
            }}
          />

          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              marginRight: "20px",
            }}
          >
            <Popover
              content={notificationContent}
              trigger="hover"
              placement="bottomRight"
            >
              <BellFilled
                style={{
                  fontSize: "25px",
                  marginRight: "20px",
                  cursor: "pointer",
                }}
              />
            </Popover>

            <Dropdown
              menu={{
                items: accountMenuItems,
                onClick: ({ key }) => handleMenu(key),
              }}
            >
              <span
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src="https://joesch.moe/api/v1/male/random?key=1"
                  style={{
                    marginRight: "10px",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    border: "2px solid #1890ff",
                    objectFit: "cover",
                  }}
                  alt="User Avatar"
                />
                {user?.username || "User"}
              </span>
            </Dropdown>
          </div>
        </Header>

        <Layout style={{ padding: "64px 24px 24px", backgroundColor: "#FFF" }}>
          <Breadcrumb style={{ margin: "6px 0" }}></Breadcrumb>
          <Content
            style={{
              padding: "0 24",
              margin: 0,
              minHeight: 280,
              borderRadius: "8px",
              background: "transparent",
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>

      <Modal
        title="Quy định nhập liệu"
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
      >
        <p></p>
      </Modal>
    </Layout>
  );
};

export default SidebarMenu;
