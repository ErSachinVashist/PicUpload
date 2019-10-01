import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Skeleton from "@material-ui/lab/Skeleton";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import React from "react";
import Tooltip from '@material-ui/core/Tooltip';
import Moment from "moment";

function renderMsg(pic) {
    return pic.raw ? JSON.parse(pic.raw).message ? JSON.parse(pic.raw).message : 'Unknown Error' : pic.uploadStatus?pic.uploadStatus:'Please Wait'
}

const DisplayGridPics = function (props) {
    const {pics, classes, handlePicModel} = props
    return <GridList cellHeight={180} className={classes.gridList}>
        {(pics.length ? pics : Array.from(new Array(4))).map((pic, index) =>
            <Tooltip key={index} title={pic.uploadStatus === 'error' ? renderMsg(pic):pic.uploadStatus?pic.uploadStatus:'Please Wait' }
                     placement="bottom">
                <GridListTile onClick={() => handlePicModel && handlePicModel(true, pic)}>
                    {pic.uploadStatus && pic.uploadStatus !== 'inprogress' ?
                        <img width={400} height={200} src={pic.url} alt='Broken'/> :
                        <Skeleton variant="rect" width={400} height={200}/>}
                    <GridListTileBar
                        style={{textAlign:'left'}}
                        title={pic.uploadStatus === 'done' ? <span>
                                {(pic.picType ? pic.picType : 'original').toUpperCase()}
                            &nbsp;({Math.ceil(pic.size / 1024) + ' KB'})
                        </span> : pic.uploadStatus !== 'error' && <Skeleton/>}
                        subtitle={
                            pic.uploadStatus === 'done' ? <span>
                            Convertion Time: {pic.convertTime} ms<br/>
                            Time: {Moment(Date.now('2019-10-01T06:07:46.000Z')).format('MMM Do, YY h:mm: a')}
                        </span> :
                                pic.uploadStatus !== 'error' &&
                                <React.Fragment>
                                    <Skeleton width="60%"/>
                                </React.Fragment>
                        }
                    />
                </GridListTile>
            </Tooltip>
        )}
    </GridList>
}

export default DisplayGridPics;
