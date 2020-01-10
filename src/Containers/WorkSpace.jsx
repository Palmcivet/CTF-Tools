import React from 'react';
import { Input } from 'antd';

const { TextArea } = Input;

const containerStyle = {
    display: 'grid',
    gridTemplateColumns: '50% 50%',
    gridTemplateRows: '1fr 1fr',
    gridGap: '15px 15px',
    placeItems: 'center center',
}

const itemStyle = {
    width: '360px',
    height: '240px',
    backgroundColor: '#E6EFF4',
    placeSelf: 'center',
    resize: 'none',
}

const WorkSpace = () => {
    return (
        <div style={containerStyle}>
            <TextArea style={itemStyle} value='raw' />
            <div style={itemStyle}>button</div>
            <TextArea style={itemStyle} value='adjust' />
            <TextArea style={itemStyle} value='decode' />
        </div>
    );
};

export { WorkSpace };