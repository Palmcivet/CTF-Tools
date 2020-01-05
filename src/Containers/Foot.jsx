import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const Foot = () => (
    <Footer style={{
        textAlign: 'center',
    }}>
        {new Date().getFullYear()} &copy; {" Powered by Ant Design. "}
    </Footer>
);

export { Foot };