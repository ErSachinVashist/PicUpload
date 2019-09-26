import {createReducer} from 'redux-starter-kit'

export const PictureListReducer = createReducer([], {
    "PictureList" : (state, action) => {
        return action.payload;
    },
    "PictureUpload" : (state, action) => {
        return [ action.payload,...state]
    }
})


