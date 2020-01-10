import React from 'react';

import { NavBar } from './NavBar';
import { SideBar } from './SideBar';
import { ToolBox } from './ToolBox';
import { WorkSpace } from './WorkSpace';


/**
 * 布局与容器组件分离，方便重用
 */

const layoutStyle = {
    display: 'grid',
    gridTemplateColumns: '256px 1fr 300px',
    gridTemplateRows: '64px 1fr 48px',
    gridColumnGap: '0px',
    gridRowGap: '0px',
    placeContent: 'space-between space-between',
    placeItems: 'center center',
}

const App = () => (
    <div style={layoutStyle}>
        <nav style={{
            gridArea: '1 / 1 / 2 / 4',
            justifySelf: 'center',
        }}>
            <NavBar />
        </nav>

        <aside style={{
            gridArea: '2 / 1 / 4 / 2',
            height: 'calc(100vh - 64px)',
            overflowX: 'hidden',
            alignSelf: 'stretch',
        }}>
            <SideBar />
        </aside>

        <main style={{
            gridArea: '2 / 2 / 3 / 3',
            placeSelf: 'center',
        }}>
            <WorkSpace />
        </main>

        <footer style={{
            gridArea: '3 / 2 / 4 / 3',
            placeSelf: 'center center',
            textAlign: 'center',
        }}>
            {new Date().getFullYear()} &copy; {" Powered by Ant Design. "}
        </footer>

        <aside style={{
            gridArea: '2 / 3 / 4 / 4',
            alignSelf: 'stretch',
        }}>
            <ToolBox />
        </aside>
    </div>
);

export { App };