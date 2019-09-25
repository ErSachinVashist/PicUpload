import {createReducer} from 'redux-starter-kit'

export const PictureReducer = createReducer({}, {
    "PictureUpload" : (state, action) => {
        return action.payload;
    }
})


