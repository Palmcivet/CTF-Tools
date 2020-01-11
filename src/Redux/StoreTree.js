import { combineReducers } from "redux";

import { reducers as setting } from './Module/setting';
import { reducers as notify } from './Module/notify';
import { reducers as workspace } from './Module/workspace';

const rootReducer = combineReducers({
    setting,
    notify,
    workspace,
});

export { rootReducer };