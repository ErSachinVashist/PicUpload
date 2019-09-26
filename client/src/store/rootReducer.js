import {AuthorReducer} from './authorReducer'
import {UserReducer,UserListReducer} from './userReducer'
import {PictureListReducer} from './pictureReducer'
import {NotifyReducer} from './extraReducer'
import {combineReducers} from 'redux-starter-kit'

const rootReducer=combineReducers({
    AuthorReducer,
    UserReducer,
    UserListReducer,
    PictureListReducer,
    NotifyReducer
})
const appReducer=(state,action)=>{
    return rootReducer(state,action)
}

export default appReducer
