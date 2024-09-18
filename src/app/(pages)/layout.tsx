"use client"
import { Inter } from "next/font/google";
import "../globals.css";
import Image from "next/image";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, Layout, Menu, Flex, Spin } from "antd";
import { orange } from "@ant-design/colors";
import React from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { SessionProvider } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const { Header, Content, Sider } = Layout;

const items = [UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
  (icon, index) => ({
    key: String(index + 1),
    icon: React.createElement(icon),
    label: `nav ${index + 1}`,
  }),
);

const inter = Inter({ subsets: ["latin"] });

const AppLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === 'loading') {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Content style={{ margin: '0.5rem' }}>
          <Flex align="center" justify="center" style={{ width: '100%', minHeight: '100vh' }}>
            <Spin></Spin>
          </Flex>
        </Content>
      </Layout>
    )
  }

  if (status === 'authenticated') {
    return (
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
          }}>
            <Image alt='SETEP' src={'https://s3.amazonaws.com/setep.app/fotos/SETEP-logo.png'} width={100} height={100}></Image>
          </Flex>
          {/* <Menu mode="inline" defaultSelectedKeys={['4']} items={items} /> */}
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
    )
  }

  if (status === 'unauthenticated') {
    router.push('/login')
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: orange[5],
              },
            }}
          >
            <AntdRegistry>
              <AppLayout>{children}</AppLayout>
            </AntdRegistry>
          </ConfigProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
