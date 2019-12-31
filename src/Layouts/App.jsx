import React from 'react';
import { Layout, Icon, Row, Col } from 'antd';

import { NavBar } from './NavBar';
import { SideBar } from './SideBar';

const { Content, Sider, Footer } = Layout;

const App = () => (
    <Layout>
        <Row gutter={[16, 16]}>
            <Col span={12}>
                <NavBar />
            </Col>
        </Row>

        <Row>
            <Col span={6} push={1}>
                <SideBar />
            </Col>
            <Col span={18}>
                <Layout
                    style={{
                        width: '100vh'
                    }}
                >
                    <Content>
                        Content
                        <br />
                        <br />
                        <br />
                        <br />
                        Content
                        <br />
                    </Content>
                </Layout>
            </Col>
        </Row>

        <Row gutter={[16, 16]}>
            <Col span={12}>
                <Footer
                    style={{
                        textAlign: 'center',
                        width: '100%',
                    }}
                >
                    {new Date().getFullYear()} &copy; {" Powered by Ant Design. "}
                </Footer>
            </Col>
        </Row>
    </Layout>
);

export { App };