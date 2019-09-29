import {createAction} from 'redux-starter-kit'
import axios from 'axios'
const Api_URL = process.env.REACT_APP_API_URL;

const pictureList = createAction('PictureList')
const pictureEditsList = createAction('PictureEditsList')

export const PictureList = () => dispatch => {
    dispatch(pictureList({loading:true}));
    axios.get(Api_URL + "/pictures/getOrgPics")
        .then((res) => {
            if(res.status===200){
                dispatch(pictureList(res.data));
            }
        })
        .catch((err) => {
            if(!err.response) return;
            dispatch({
                type:'notify',
                payload:{
                    type:'error',
                    message:err.message
                }
            });
        });
};

export const PictureUpload = (blob) => dispatch => {
    axios.post(Api_URL + "/pictures/addPicture", {blob})
        .then(res => {
            // dispatch(pictureUpload(res.data))
            dispatch({
                type:'notify',
                payload:{
                    type:'success',
                    message:'Uploading in progress. Hold tight !!'
                }
            });

        })
        .catch((err) => {
            if(!err.response) return;
            console.log("couldNot post contact" + err)
        });
}

export const PictureEditList = (pictureId) => dispatch => {
    dispatch(pictureEditsList({loading:true}));
    axios.get(Api_URL + `/pictures/${pictureId}/getAllEditPics`)
        .then((res) => {
            if(res.status===200){
                dispatch(pictureEditsList(res.data));
            }
        })
        .catch((err) => {
            if(!err.response) return;
            dispatch({
                type:'notify',
                payload:{
                    type:'error',
                    message:err.message
                }
            });
        });
};
