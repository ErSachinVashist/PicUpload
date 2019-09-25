import React from 'react';
import PropTypes from 'prop-types';
import {compose} from "recompose";
import {connect} from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import {homeCss} from '../../helpers/componentStyle';
import {PictureUpload} from '../../actions/pictureAction';
import AvatarImageCropper from 'react-avatar-image-cropper';
class Home extends React.Component {
    state={
        pictures:'',
        error:false
    }

    uploadImage=(picture)=>{
        this.setState({
            error:false
        });
        let that=this
        let reader = new FileReader();
        reader.readAsDataURL(picture);
        reader.onloadend = function() {
            that.props.PictureUpload(reader.result)
        }
    }
    errorHandler=(err)=>{
        this.setState({
            error:true
        })
    }
    render() {
        const { classes } = this.props;
        const { error } = this.state;
        return (
            <Card className={classes.card}>
                <CardHeader
                    className={classes.cardHead}
                    title='Image Uploader'
                    subheader={error && <strong style={{color:'brown'}}>Some Error occured</strong>}
                />
                <CardContent className={classes.uploadContent}>
                    <AvatarImageCropper apply={this.uploadImage} errorHandler={this.errorHandler} isBack={true}/>
                </CardContent>
            </Card>
        );
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default compose(
    withStyles(homeCss),
    connect(null,{PictureUpload})
)(Home);
