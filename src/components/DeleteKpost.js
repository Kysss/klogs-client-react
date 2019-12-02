import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';

import PropTypes from 'prop-types';
import MyDialogActions from '../util/MyButton';
import MyButton from '../util/MyButton';

//MUI stuff
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

import { connect } from 'react-redux';
import { deleteKpost } from '../redux/actions/dataActions';

const styles = {
    deleteButton:{
        left: '90%',
        top: "10%",
        position:'absolute'
    }
}
class DeleteKpost extends Component {
    state = {
        open: false
    };

    handleOpen = () => {
       // console.log("triggered handleopen");
        this.setState({ open: true });
    }
    handleClose = () => {
       // console.log("triggered handle close");
        this.setState({ open: false });
    }

    deleteKpost = () => {
       // console.log("triggered delete kpost");
        this.props.deleteKpost(this.props.kpostId);
        this.setState({ 
         
            open: false 
        });
        
    }
    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <MyButton tip="Delete Kpost"
                    onClick={this.handleOpen}
                    btnClassName={classes.deleteButton}>
                    <DeleteOutline color="secondary" />
                </MyButton>
                <Dialog open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm">
                        <DialogTitle>
                            Are you sure you want to delete this?
                        </DialogTitle>
                        <DialogActions>
                            <Button onClick={this.handleClose} color= "primary">
                                Cancel
                            </Button>
                            <Button onClick={this.deleteKpost} color= "secondary">
                                Delete
                            </Button>
                        </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

DeleteKpost.propTypes = {
    deleteKpost: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    kpostId: PropTypes.string.isRequired
}
export default connect(null, { deleteKpost })(withStyles(styles)(DeleteKpost));

