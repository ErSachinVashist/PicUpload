import {createAction} from 'redux-starter-kit'

const changeAuthor = createAction('ChangeAuthor')

export const ChangeAuthor=(author)=>{
    return changeAuthor(author)
}
