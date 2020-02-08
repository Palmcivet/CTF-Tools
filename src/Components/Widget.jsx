import React from 'react';
import { InputNumber, Input } from 'antd';

const rInputNumber = (props) => (
    <InputNumber min={1} max={10} defaultValue={3} onChange={props.onChange} />
);

const rInput = (props) => (
    <Input placeholder={props} />
);

export { rInputNumber, rInput };