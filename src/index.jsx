import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { App } from './Layouts/App';
import { StoreTree } from "./Redux/StoreTree";

render(
    <Provider store={StoreTree}>
        <App />
    </Provider>,
    document.getElementById('root')
)