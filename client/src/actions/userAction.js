import {createAction} from 'redux-starter-kit'
import { saveState } from '../helpers/localStorage';
import axios from 'axios'
const userLogin = createAction('UserLogin')
const userList = createAction('UserList')
const userAdd = createAction('UserAdd')
const Api_URL = process.env.REACT_APP_API_URL;



export const UserLogin = (cred, router) => dispatch => {
    axios.post(Api_URL + "/users/userLogin", cred)
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
                router.push('/dashboard');
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
            if(!err.response) return;
            dispatch(userLogin({}));
            dispatch({
                type:'notify',
                payload:{
                    type:'error',
                    message:err.response.data.error.message
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

export const UserList = (filter) => dispatch => {
    axios.get(Api_URL + "/users",{params:{filter}})
        .then((res) => {
            if(res.status===200){
                dispatch(userList(res.data));
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

export const UserAdd = (data) => dispatch => {
    axios.post(Api_URL + "/users/addUser",data)
        .then((res) => {
            if(res.status===200){
                dispatch(userAdd(res.data));
                dispatch({
                    type:'notify',
                    payload:{
                        type:'success',
                        message:'User Added '+res.data.email
                    }
                });


            }
        })
        .catch((err) => {
            if(!err.response) return;
            let {error,message}=err.response.data.error
            dispatch({
                type:'notify',
                payload:{
                    type:'error',
                    message:message?message:error
                }
            });
        });
};
