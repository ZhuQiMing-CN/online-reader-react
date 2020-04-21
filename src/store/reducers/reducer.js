/*
 * @Author: ZhuQiMing
 * @CreateTime: 2020/4/20 16:08
 */
let defaultState = {
    bookShelf: []
}

const reducer  = (state = defaultState, action) => {
    switch (action.type) {
        case 'UPDATE_BOOKSHELF':
            return action.data;
        default:
            return state
    }
}

export default reducer;
