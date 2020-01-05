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
        <nav style={{
            position: 'fixed',
            zIndex: 10,
            width: '100%',
        }}>
            <NavBar />
        </nav>

        <div style={{
            marginTop: '48px',
            height: 'calc(100vh - 48px)',
            display: 'flex',
            justifyContent: 'space-between',
        }}>
            <aside style={{
                overflowX: 'hidden',
            }}>
                <SideBar />
            </aside>

            <Main />

            <aside style={{}}>
                <Tool />
            </aside>
        </div>
    </Layout >
);

export { App };