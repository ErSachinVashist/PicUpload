import React from 'react'
import {Route,Redirect} from 'react-router-dom'
import RequireAuth from "../helpers/requiresAuth";
import Picture from './picture'
import UsersList from './user/usersList'
import Login from './user/userLogin'

const routes=[
    <Route key='picture' exact path='/dashboard' component={RequireAuth(Picture)}/>,
    <Route key='login' path='/login' component={(props)=><Login {...props}/>}/>,
    <Route key='users' path='/users' component={RequireAuth(UsersList)}/>,
    <Redirect key='redirect' to="/dashboard"/>
]

export default routes
