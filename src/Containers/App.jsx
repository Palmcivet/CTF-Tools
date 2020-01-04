import React from 'react';
import { Layout, Row, Col } from 'antd';

import { NavBar } from './NavBar';
import { SideBar } from './SideBar';
import { Tool } from './Tool';
import { Main } from './Main';

/**
 * 布局与容器组件分离，方便重用
 */

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

        <Row type="flex" justify="space-between">
            <Col>
                <SideBar />
            </Col>
            <Col>
                <Main />
            </Col>
            <Col>
                <Tool />
            </Col>
        </Row>
    </Layout >
);

export { App };