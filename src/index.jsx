import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { App } from './Layouts/App';
import { StoreTree } from "./Redux/StoreTree";
import 'antd/dist/antd.css';

render(
    // <Provider store={StoreTree}>
    <App />,
    // </Provider>,
    document.getElementById('root')
)