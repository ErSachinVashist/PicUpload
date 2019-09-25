import React, { Component } from 'react';
import {connect} from "react-redux";
import {BrowserRouter,Switch} from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../helpers/theme'
import axios from "axios";
import NotificationBar from '../helpers/notificationBar'
import routes from './routes'
import Header from './header'
import NavHead from './navHead'
import './app.css'
class App extends Component {
    componentWillMount() {
        axios.defaults.headers.common['Authorization']=this.props.user.user.id
    }

    render() {
        return (
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <MuiThemeProvider theme={theme}>
                    <Header/>
                    <NavHead/>
                    <div className='main-wrapper'>
                        <Switch>
                            {routes}
                        </Switch>
                        <NotificationBar/>
                    </div>
                </MuiThemeProvider>
            </BrowserRouter>
        );
    }
}

export default connect( store => {
    return {
        user: store.UserReducer
    }})(App);

