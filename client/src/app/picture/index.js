import React from 'react';
import PropTypes from 'prop-types';
import {compose} from "recompose";
import {connect} from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloudDone from '@material-ui/icons/CloudDone';
import Error from '@material-ui/icons/Error';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import {picCss} from '../../helpers/componentStyle';
import {PictureUpload,PictureList} from '../../actions/pictureAction';
import AvatarImageCropper from 'react-avatar-image-cropper';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Moment from "moment";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

function getStatus(status) {
    switch(status){
        case 'inprogress' : return <CircularProgress size={20}/>
        case 'done' : return <CloudDone style={{color:'darkgreen'}}/>
        case 'error' : return <Error color="error"/>
        default: return <CircularProgress size={20}/>
    }
}

class Picture extends React.Component {
    state={
        pictures:'',
        picError:false
    }

    componentWillMount() {
            this.props.PictureList({order: 'pictureId DESC'})
    }

    uploadImage=(picture)=>{
        this.setState({
            picError:null
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
            picError:"Couldnot process your image"
        })
    }

    picList(pics, classes) {
        return <Table stickyHeader className={classes.table}>
            <TableHead>
                <TableRow>
                    <TableCell>Temp Name</TableCell>
                    <TableCell>Added On</TableCell>
                    <TableCell>Status</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {pics.map((pic, index) => (
                    <TableRow key={index}>
                        <TableCell component="th" scope="row">
                            {pic.tempName}
                        </TableCell>
                        <TableCell>{Moment(pic.addedOn).format('MMM Do YY')}</TableCell>
                        <TableCell>{getStatus(pic.uploadStatus)}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    }

    render() {
        const {classes,picsList}=this.props;
        const { picError } = this.state;

        return (
            <Grid container spacing={4} justify='center'>
                <Grid item xs={12} md={5}>
                    <Paper className={`${classes.tablePaper} ${picsList.length===0 && classes.noPic}`}>
                        {picsList.length>0 && this.picList(picsList, classes)}
                    </Paper>
                </Grid>
                <Grid item xs={12} md={5}>
                    <Card className={classes.card}>
                        <CardHeader
                            className={classes.cardHead}
                            title='Image Uploader'
                        />
                        <CardContent onClick={()=>this.setState({picError:null})} className={classes.uploadContent}>
                            <AvatarImageCropper apply={this.uploadImage} errorHandler={this.errorHandler} isBack={true}/>
                            {picError && <Typography align='center' variant='body1' style={{color: 'brown'}}>{picError}</Typography>}
                        </CardContent>
                    </Card>
                </Grid>
                </Grid>
        );
    }
}

Picture.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default compose(
    withStyles(picCss),
    connect(store=>({
        picsList:store.PictureListReducer
    }),{PictureUpload,PictureList})
)(Picture);
