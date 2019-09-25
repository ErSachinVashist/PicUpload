import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {withRouter} from 'react-router-dom'
import {connect} from "react-redux";
import CircularProgress from '@material-ui/core/CircularProgress';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import PhotoAlbum from '@material-ui/icons/PhotoAlbum';
import PersonAdd from '@material-ui/icons/PersonAdd';
import ExitToApp from '@material-ui/icons/ExitToApp';
import {compose} from "recompose";
import {navCss} from "../helpers/componentStyle";
import {UserList,UserLogout} from "../actions/userAction";


class NavHead extends React.Component{
    componentWillMount() {
        let value=0;
        switch (this.props.history.location.pathname) {
            case '/users':value=1;this.props.UserList();break;
            default:value=0;
        }
        this.setState({value})

    }

    state={
        value : 0,
    }

    render() {
        let {user,history}=this.props
        return user && user.isAuthenticated ?
            <BottomNavigation
                value={this.state.value}
                onChange={(event, value) => {
                    this.setState({value});
                    let path=''
                    switch (value) {
                        case 0 : path='/';break;
                        case 1 :
                            path='/users';
                            this.props.UserList()
                            break;
                        default : path='/'
                    }
                    history.push(path)
                }}
                showLabels
            >
                <BottomNavigationAction label="Pictures" icon={<PhotoAlbum />} />
                <BottomNavigationAction label="Users" icon={<PersonAdd />} />
                <BottomNavigationAction onClick={()=>{
                    this.setState({loggingOut:true})
                    this.props.UserLogout()
                }} label="Logout" icon={this.state.loggingOut ? <CircularProgress size={17} color='secondary'/>:<ExitToApp />} />
            </BottomNavigation>
            :""

    }
}


export default compose(
    withRouter,
    withStyles(navCss),
    connect(store=>({
        user:store.UserReducer
    }),{UserList,UserLogout})
)(NavHead);

