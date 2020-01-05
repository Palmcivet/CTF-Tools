import React from 'react';
import { Layout, Row, Col } from 'antd';

const { Content } = Layout;

const textStyle = {
    width: '320px',
    height: '240px',
    backgroundColor: '#E6EFF4'
}

const Main = () => {
    return (
        <div>
            <Row type="flex" justify="space-around" gutter={[24, 24]}>
                <Col span={12}>
                    <textarea style={textStyle}>raw</textarea>
                </Col>
                <Col span={12}>
                    <div style={textStyle}>button</div>
                </Col>
            </Row >
            <Row type="flex" justify="space-around" gutter={[24, 24]}>
                <Col span={12}>
                    <textarea style={textStyle}>decode</textarea>
                </Col>
                <Col span={12}>
                    <textarea style={textStyle}>adjust</textarea>
                </Col>
            </Row>
        </div>
    );
};

export { Main };