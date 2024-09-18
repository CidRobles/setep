"use client"
import React from 'react';
import { Poppins } from "next/font/google";
import "../globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, Layout } from "antd";
import { orange } from "@ant-design/colors";

const poppins = Poppins({
    weight: "400",
    subsets: ["latin"]
});

const { Content } = Layout;

export default function LoginLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${poppins.className}`}>
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: orange[5],
                        },
                    }}
                >
                    <AntdRegistry>
                        <Layout>
                            <Content style={{ margin: '1rem' }}>
                                {children}
                            </Content>
                        </Layout>
                    </AntdRegistry>
                </ConfigProvider>
            </body>
        </html>

    );
}
