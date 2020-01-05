import React from 'react';
import { Layout, Row, Col } from 'antd';

import { NavBar } from './NavBar';
import { SideBar } from './SideBar';
import { Tool } from './Tool';
import { Main } from './Main';
import { Foot } from './Foot';

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
            <Col style={{
                marginTop: '48px',
                height: 'calc(100vh - 48px)',
            }}>
                <Main />
                <Layout style={{
                    bottom: '0px',
                    alignSelf: 'flex-end',
                }}>
                    <Foot />
                </Layout>
            </Col>
            <Col>
                <Tool />
            </Col>
        </Row>
    </Layout >
);

export { App };