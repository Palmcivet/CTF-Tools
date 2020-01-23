import { combineReducers } from "redux";

import { reducers as setting } from './modules/setting';
import { reducers as notify } from './modules/notify';
import { reducers as workspace } from './modules/workspace';

const rootReducer = combineReducers({
    setting,
    notify,
    workspace,
});

export { rootReducer };