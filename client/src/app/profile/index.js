import React from 'react';
import PropTypes from 'prop-types';
import {compose} from "recompose";
import {connect} from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import {profileCss} from '../../helpers/componentStyle';
import {ChangeAuthor} from "../../actions/authorAction";
class Profile extends React.Component {

    componentWillMount() {
        this.props.ChangeAuthor({name:'Sachin Vashist'})
    }


    render() {
        const { classes ,author} = this.props;

        return (
            <Card className={classes.card}>
                <CardMedia
                    className={classes.media}
                    image={require('../../assests/images/profile.jpg')}
                    title={author.name}
                />
                <CardHeader
                    className={classes.cardHead}
                    title='Sachin Vashist'
                    subheader='Full Stack Developer'
                />
            </Card>
        );
    }
}

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default compose(
    withStyles(profileCss),
    connect(store=>({
        author:store.AuthorReducer
    }),{ChangeAuthor})
)(Profile);
