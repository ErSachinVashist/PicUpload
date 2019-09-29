import React from 'react';
import PropTypes from 'prop-types';
import {compose} from "recompose";
import {connect} from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {picModelCss} from '../../helpers/componentStyle';
import {PictureEditList} from '../../actions/pictureAction';
import DisplayPics from '../../helpers/displayPics';

class PicModel extends React.Component {
    componentWillMount() {
        this.props.PictureEditList(this.props.selectedPic.pictureId)
    }

    render() {
        const {classes,handlePicModel,open,picEditsList}=this.props;
        return (
            <Dialog aria-labelledby="customized-dialog-title" open={open}>
                <MuiDialogTitle className={classes.modelTitle} id="customized-dialog-title" onClose={()=>handlePicModel(false)}>
                    Converted Pictures
                    <IconButton aria-label="close" className={classes.closeButton} onClick={()=>handlePicModel(false)}>
                        <CloseIcon />
                    </IconButton>
                </MuiDialogTitle>
                <MuiDialogContent dividers>
                    {!picEditsList.loading?picEditsList.length>0 && <DisplayPics pics={picEditsList} classes={classes}/>:
                        <img width='100%' src='https://miro.medium.com/max/1158/1*9EBHIOzhE1XfMYoKz1JcsQ.gif' alt='sachin'/>
                    }
                </MuiDialogContent>
            </Dialog>
        );
    }
}

PicModel.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default compose(
    withStyles(picModelCss),
    connect(store=>({
        picEditsList:store.PictureEditsListReducer
    }),{PictureEditList})
)(PicModel);
