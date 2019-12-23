import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import { App } from './Layouts/App';
import { StoreTree } from "./MobX/StoreTree";

render(
    <Provider store={StoreTree}>
        <App />
    </Provider>,
    document.getElementById('root')
)