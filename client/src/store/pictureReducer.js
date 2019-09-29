import {createReducer} from 'redux-starter-kit'

export const PictureListReducer = createReducer({loading:true}, {
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


export const PictureEditsListReducer = createReducer([], {
    "PictureEditsList" : (state, action) => {
        return action.payload;
    }
})


