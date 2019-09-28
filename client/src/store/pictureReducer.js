import {createReducer} from 'redux-starter-kit'

export const PictureListReducer = createReducer([], {
    "PictureList" : (state, action) => {
        return action.payload;
    },
    "PictureListUpdate" : (state, action) => {
        state = state.map(function(item) { return item.pictureId === action.payload.pictureId ? action.payload : item; });
        return state;
    },
    "PictureUpload" : (state, action) => {
        return [ action.payload,...state]
    }
})


