import {createReducer} from 'redux-starter-kit'

export const PictureListReducer = createReducer({loading:true}, {
    "PictureList" : (state, action) => {
        return action.payload;
    },
    "PictureListUpdate" : (state, action) => {
        state=JSON.parse(JSON.stringify(state))
        state = state.map(function(item) {
            return parseInt(item.pictureId) === parseInt(action.payload.pictureId) ? action.payload : item; });
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


