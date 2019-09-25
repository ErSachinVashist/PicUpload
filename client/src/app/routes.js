import React from 'react'
import {Route,Redirect} from 'react-router-dom'
import RequireAuth from "../helpers/requiresAuth";
import Home from './home'
import Profile from './profile'
import UsersList from './user/usersList'
import Login from './user/userLogin'

const routes=[
    <Route key='home' exact path='/' component={RequireAuth(Home)}/>,
    <Route key='profile' path='/profile' component={RequireAuth(Profile)}/>,
    <Route key='login' path='/login' component={Login}/>,
    <Route key='users' path='/users' component={RequireAuth(UsersList)}/>,
    <Redirect key='redirect' to="/"/>
]

export default routes
