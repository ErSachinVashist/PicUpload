import React from 'react';
import {compose} from "recompose";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Moment from 'moment';
import {userCss} from "../../helpers/componentStyle";
import {UserList} from "../../actions/userAction";

class UsersList extends React.Component {
    state={
        user:{
            firstName:'',
            lastName:'',
            email:'',
            password:''
        }
    };

    handleSubmit=(e)=>{
        e.preventDefault()

    }
    handleChange=(type)=>(e)=>{
        let user=Object.assign({}, this.state.user);
        user[type]=e.target.value
        this.setState({user:user})
    }

    usersList(users,classes){
       return <Table size="small" className={classes.table}>
            <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Added On</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {users.map((user,index) => (
                    <TableRow key={index}>
                        <TableCell component="th" scope="row">
                            {user.firstName + ' ' + user.lastName}
                        </TableCell>
                        <TableCell >{user.email}</TableCell>
                        <TableCell >{Moment(user.addedOn).format('MMM Do YY')}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    }
    render() {
        const { classes ,userList } = this.props;
        let {user}=this.state
        return (
            <Grid container spacing={8} justify='center'>
                <Grid item xs={12} md={5}>
                    <Paper className={classes.tablePaper}>
                        {this.usersList(userList,classes)}
                    </Paper>
                </Grid>
                <Grid item xs={12} md={5}>
                    <Paper className={classes.paper}>
                        <form className={classes.form} onSubmit={this.handleSubmit}>
                            <Typography variant='h5'>Add User</Typography>
                            <Grid container spacing={8}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="First Name"
                                        fullWidth
                                        className={classes.textField}
                                        value={user.firstName}
                                        onChange={this.handleChange('firstName')}
                                        margin="dense"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="Last Name"
                                        fullWidth
                                        className={classes.textField}
                                        value={user.lastName}
                                        onChange={this.handleChange('lastName')}
                                        margin="dense"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} >
                                    <TextField
                                        label="Email"
                                        type="email"
                                        fullWidth
                                        className={classes.textField}
                                        value={user.email}
                                        onChange={this.handleChange('email')}
                                        margin="dense"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Password"
                                        type="password"
                                        fullWidth
                                        className={classes.textField}
                                        value={user.password}
                                        onChange={this.handleChange('password')}
                                        margin="dense"
                                        variant="outlined"
                                    />
                                </Grid>

                            </Grid>

                            <Button size="medium" variant='contained' color='primary' type='submit' className={classes.subButton}>
                                Add
                            </Button>

                        </form>
                    </Paper>
                </Grid>
            </Grid>

        );
    }
}

UsersList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default compose(
    withStyles(userCss),
    connect(store=>({
        userList:store.UserListReducer
    }),{UserList})
)(UsersList);
