import React from 'react';
import { Input } from 'antd';

import { Foot } from './Foot';

const { TextArea } = Input;

const containerStyle = {
    display: 'grid',
    gridTemplateColumns: '50% 50%',
    gridTemplateRows: '4fr 4fr 1fr',
    gridGap: '15px 15px',
    placeItems: 'center center',
    justifyContent: 'stretch',
    justifyContent: 'space-around',
    alignContent: 'space-around',
}

const itemStyle = {
    width: '360px',
    height: '240px',
    backgroundColor: '#E6EFF4',
    placeSelf: 'center stretch',
    resize: 'none',
}

const footStyle = {
    gridColumnStart: 1,
    gridColumnEnd: 3,
    placeSelf: 'end center',
}

const Main = () => {
    return (
        <div style={containerStyle}>
            <TextArea style={itemStyle} value='raw' />
            <div style={itemStyle}>button</div>
            <TextArea style={itemStyle} value='adjust' />
            <TextArea style={itemStyle} value='decode' />
            <div style={footStyle}>
                <Foot />
            </div>
        </div>
    );
};

export { Main };