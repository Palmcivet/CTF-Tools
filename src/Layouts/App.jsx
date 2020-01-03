import React from 'react';
import { Layout, Row, Col } from 'antd';

import { ToolBar } from './ToolBar';
import { NavBar } from './NavBar';
import { SideBar } from './SideBar';

const { Content } = Layout;

const App = () => (
    <Layout>
        <Layout style={{
            position: 'fixed',
            zIndex: 2,
            width: '100%',
            height: '48px',
        }}>
            <NavBar />
        </Layout>

        <Layout>
            <Row gutter={[8, 8]}>
                <Col span={12}>
                    <Layout style={{
                        height: '100vh',
                    }}>
                        <SideBar />
                    </Layout>
                </Col>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Layout>
                            <Content>
                                Content
                        <br />
                                <br />
                                <br />
                                <br />
                                Content
                        <br />
                            </Content>
                            <ToolBar />
                        </Layout>
                    </Col>
                </Row>
            </Row>
        </Layout>
    </Layout>
);

export { App };