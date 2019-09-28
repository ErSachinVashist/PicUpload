import {UserLogout} from './userAction'
import {createAction} from "redux-starter-kit";
const pictureUpload = createAction('PictureUpload')
const pictureListUpdate = createAction('PictureListUpdate')

export const ReceiveSocketAction = (data) => (dispatch, getState) => {
    if(data.makingAuthConnection && !data.userAuth){
        dispatch(UserLogout(true))
    }
    if (data.collectionName) {
        switch (data.collectionName) {
            case 'Pictures':
                if(data.method==='POST'){
                    dispatch(pictureUpload(data.data));
                }
                else{
                    dispatch(pictureListUpdate(data.data));
                }
                break;
            default :
                return null
        }
    }
};
