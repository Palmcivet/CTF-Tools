import React from 'react';
import { Layout, Icon } from 'antd';

import { NavBar } from './NavBar';
import { SideBar } from './SideBar';

const { Content, Sider, Footer } = Layout;

const App = () => (
    <Layout>
        <NavBar />
        <Layout
            style={{
                padding: '0 50px',
                marginTop: 64
            }}
        >
            <SideBar />
            <Layout>
                <Content>
                    Content
                </Content>

                <Footer style={{ textAlign: 'center' }}>
                    &copy; {new Date().getFullYear()}
                    {" Powered by Ant design. "}
                </Footer>
            </Layout>
        </Layout>
    </Layout>
);

export { App };