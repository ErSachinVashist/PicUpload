import React from 'react';
import PropTypes from 'prop-types';
import {compose} from "recompose";
import {connect} from "react-redux";
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import {picCss} from '../../helpers/componentStyle';
import {PictureUpload, PictureList} from '../../actions/pictureAction';
import AvatarImageCropper from 'react-avatar-image-cropper';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {SubscribeSocket} from "../../socket/PubSub"
import {ReceiveSocketAction} from "../../actions/socketAction"
import PicModel from "./picsModel"
import DisplayPics from '../../helpers/displayPics';

class Picture extends React.Component {
    state = {
        pictures: '',
        selectedPic:null,
        picError: false,
        openPicModel: false,
        addingPic:false
    }
    handlePicModel = (val,pic) => {
        this.setState({openPicModel: val && pic && pic.uploadStatus==='done',selectedPic:pic})
    }

    componentWillMount() {
        this.props.PictureList({order: 'pictureId DESC'});
        SubscribeSocket('Pictures', null, 'PUT', this.props.userData.user.id, this.props.ReceiveSocketAction)
        SubscribeSocket('Pictures', null, 'POST', this.props.userData.user.id, this.props.ReceiveSocketAction)
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.picsList.length>this.props.picsList.length){
            document.getElementById('picPaper').scrollTop = 0;
            this.setState({addingPic:false})
        }
    }

    uploadImage = (picture) => {
        this.setState({
            picError: null
        });
        let that = this
        let reader = new FileReader();
        reader.readAsDataURL(picture);
        reader.onloadend = function () {
            that.props.PictureUpload(reader.result)
            that.setState({addingPic:true})
        }
    }
    errorHandler = (err) => {
        this.setState({
            picError: "Couldnot process your image : "+err+' found'
        })
    }

    render() {
        const {classes, picsList} = this.props;
        const {picError, openPicModel,selectedPic,addingPic} = this.state;

        return [<Grid container spacing={4} justify='center' key='picTable'>
            <Grid item xs={12} md={5}>
                <Paper id='picPaper' className={`${classes.mainPaper} ${picsList.length === 0 && classes.noPic}`}>
                    {!picsList.loading?picsList.length > 0 && <DisplayPics pics={picsList} classes={classes} handlePicModel={this.handlePicModel}/>:
                        <img width='100%' src='https://miro.medium.com/max/1158/1*9EBHIOzhE1XfMYoKz1JcsQ.gif' alt='sachin'/>
                    }
                </Paper>
            </Grid>
            <Grid item xs={12} md={5}>
                <Card className={classes.card}>
                    <CardHeader
                        className={classes.cardHead}
                        title='Image Uploader'
                    />
                    <CardContent style={{pointerEvents:addingPic?'none':''}} onClick={() => this.setState({picError: null})} className={classes.uploadContent}>
                        <AvatarImageCropper apply={this.uploadImage} errorHandler={this.errorHandler} isBack={true}/>
                        {picError && <Typography align='center' variant='body1' style={{color: 'brown'}}>{picError}</Typography>}
                        {addingPic && <Typography align='center' variant='body1' ><img height={100} style={{marginTop:-25}}  src='https://wpamelia.com/wp-content/uploads/2018/11/ezgif-2-6d0b072c3d3f.gif' alt='sachin'/></Typography>}

                    </CardContent>
                </Card>
            </Grid>
        </Grid>,
            openPicModel  && <PicModel key='picModel' open={openPicModel} handlePicModel={this.handlePicModel} selectedPic={selectedPic}/>
        ]
    }
}

Picture.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default compose(
    withStyles(picCss),
    connect(store => ({
        picsList: store.PictureListReducer,
        userData: store.UserReducer
    }), {PictureUpload, PictureList, ReceiveSocketAction})
)(Picture);
