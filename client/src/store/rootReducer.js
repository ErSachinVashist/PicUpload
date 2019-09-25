import {AuthorReducer} from './authorReducer'
import {UserReducer,UserListReducer} from './userReducer'
import {PictureReducer} from './pictureReducer'
import {NotifyReducer} from './extraReducer'
import {combineReducers} from 'redux-starter-kit'

const rootReducer=combineReducers({
    AuthorReducer,
    UserReducer,
    UserListReducer,
    PictureReducer,
    NotifyReducer
})
const appReducer=(state,action)=>{
    return rootReducer(state,action)
}

export default appReducer
