import {createAction} from 'redux-starter-kit'
import axios from 'axios'

const pictureUpload = createAction('PictureUpload')

export const PictureUpload = (blob) => dispatch => {
    axios.post(`http://localhost:3000/pictures/upload`,
        {blob})
        .then(res => {

            dispatch(pictureUpload(res.data))

        })
        .catch((err) => {
            console.log("couldNot post contact" + err)
        });

}
