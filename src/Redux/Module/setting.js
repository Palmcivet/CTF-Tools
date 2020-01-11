const theme = {
    blue: "blue",
    green: "green",
    yellow: "yellow",
    orange: "orange",
};

const initState = {
    darkMode: false,
    theme: theme.blue,
    sideBar: true,
};

// action types
const types = {
    TURN_DARKMODE: "SETTING/TURN_DARKMODE",
    CHANGE_THEME: "SETTING/CHANGE_THEME",
    TOGGLE_SIDEBAR: "SETTING/TOGGLE_SIDEBAR",
};

// action creators
const creators = {
    turnDarkMode: () => ({
        type: types.TURN_DARKMODE
    }),
    changeTheme: (color) => ({
        type: types.CHANGE_THEME,
        theme: color
    }),
    toggleSideBar: () => ({
        type: types.TOGGLE_SIDEBAR
    })
};

/**
 * reducers
 * @param {Object} state
 * @param {Boolean} state.darkMode
 * @param {String} state.theme
 * @param {Boolean} state.sideBar
 * @param {Object} action
 */
const reducers = (state = initState, action) => {
    switch (action.type) {
        case types.TURN_DARKMODE:
            return {
                darkMode: !state.darkMode,
                ...state
            }
        case types.CHANGE_THEME:
            return {
                theme: state.theme,
                ...state
            }
        case types.TOGGLE_SIDEBAR:
            return {
                sideBar: !state.state,
                ...state
            }
        default:
            return state;
    }
};

const selectors = {

};

export default reducers;
export { actions, creators, selectors };