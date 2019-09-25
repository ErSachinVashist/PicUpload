import {createReducer} from 'redux-starter-kit'

export const AuthorReducer = createReducer({}, {
    "ChangeAuthor" : (state, action) => {
        return action.payload;
    }
})


