import React from 'react';
import { Layout, Input, Row, Col } from 'antd';

const { TextArea } = Input;
const { Content } = Layout;

const textStyle = {
    width: '320px',
    height: '240px',
    backgroundColor: '#E6EFF4'
}

const Main = () => {
    return (
        <div style={{
            justifCcontent: 'space-around',
            alignContent: 'stretch',
            alignItems: 'stretch',
            flexFlow: 'row wrap',
        }}>
            <TextArea style={textStyle} value='raw' />
            <div style={textStyle}>button</div>
            <TextArea style={textStyle} value='adjust' />
            <TextArea style={textStyle} value='decode' />
        </div>
    );
};

export { Main };