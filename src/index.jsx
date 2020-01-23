import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { App } from './Containers/App';
import { rootReducer } from "./Controllers/index";
import './Styles/index.less';
import 'antd/dist/antd.css';

const StoreTree = createStore(rootReducer);

render(
    <Provider store={StoreTree}>
        <App />
    </Provider>,
    document.getElementById('root')
)