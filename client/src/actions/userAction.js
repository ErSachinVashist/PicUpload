import {createAction} from 'redux-starter-kit'
import { saveState } from '../helpers/localStorage';

import axios from 'axios'
const userLogin = createAction('UserLogin')
const userList = createAction('UserList')
const Api_URL = process.env.REACT_APP_API_URL;

export const UserLogin = (cred, router) => dispatch => {
    axios.post(Api_URL + "/users/login?filter[include]=user", cred, {withCredentials: true})
        .then((res) => {
            if (res.data.id) {
                dispatch({
                    type:'notify',
                    payload:{
                        type:'success',
                        message:'Successfully Logged In'
                    }
                });
                dispatch(userLogin(res.data));
                router.push('/');
            }
            else{
                dispatch(userLogin({}));
                dispatch({
                    type:'notify',
                    payload:{
                        type:'error',
                        message:"Uncaught error"
                    }
                });
            }
        })
        .catch((err) => {
            dispatch(userLogin({}));
            dispatch({
                type:'notify',
                payload:{
                    type:'error',
                    message:err.message
                }
            });
        });
};

export const UserLogout = () => dispatch => {
    axios.post(Api_URL + "/users/logout")
        .then((res) => {
            if(res.status===204){
                saveState({})
                window.location.reload();
            }

        })
        .catch((err) => {
            dispatch({
                type:'notify',
                payload:{
                    type:'error',
                    message:err.message
                }
            });
        });
};

export const UserList = () => dispatch => {
    axios.get(Api_URL + "/users")
        .then((res) => {
            if(res.status===200){
                dispatch(userList(res.data));
            }
        })
        .catch((err) => {
            dispatch({
                type:'notify',
                payload:{
                    type:'error',
                    message:err.message
                }
            });
        });
};
