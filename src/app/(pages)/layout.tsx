"use client"
import { Inter } from "next/font/google";
import "../globals.css";
import logo from "../../../public/SETEP-logo.png"
import Image from "next/image";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, Layout, Menu, Flex } from "antd";
import { orange } from "@ant-design/colors";
import React from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';


const { Header, Content, Sider } = Layout;

const items = [UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
  (icon, index) => ({
    key: String(index + 1),
    icon: React.createElement(icon),
    label: `nav ${index + 1}`,
  }),
);

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: orange[5],
            },
          }}
        >
          <AntdRegistry>
            <Layout>
              <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={(broken) => {
                  console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                  console.log(collapsed, type);
                }}
                style={{
                  backgroundColor: '#fff',
                  padding: '1rem 0'
                }}
              >
                <Flex justify="center" style={{
                  marginBottom: '1rem'
                }}><Image alt='SETEP' src={logo} width={100}></Image></Flex>
                <Menu mode="inline" defaultSelectedKeys={['4']} items={items} />
              </Sider>
              <Layout style={{ minHeight: '100vh' }}>
                <Header style={{ padding: 0, backgroundColor: '#fff' }} />
                <Content style={{ margin: '0.5rem' }}>
                  <div
                    style={{
                      padding: '0.5rem',
                      minHeight: 360,
                    }}
                  >
                    {children}
                  </div>
                </Content>
              </Layout>
            </Layout>
          </AntdRegistry>
        </ConfigProvider>
      </body>
    </html>
  );
}
