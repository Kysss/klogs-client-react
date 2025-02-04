import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
//redux
import { connect } from 'react-redux';
import { editUserDetails } from '../redux/actions/userActions';
import MyButton from '../util/MyButton';
//mui
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';

const styles = (theme) => ({
    
    button: {
        float: 'right'
    }

});


class EditDetails extends Component {
    state = {
        bio: '',
        website: '',
        location: '',
        open: false
    };

    handleOpen = () => {
        this.setState({ open: true });
        this.mapUserDetailsToState(this.props.credentials);
    }
    handleClose = () => {
        this.setState({ open: false });
       
    }
    componentDidMount() {
        const { credentials } = this.props;
        this.mapUserDetailsToState(credentials);
    }

    mapUserDetailsToState = (credentials) => {
        this.setState({
            bio: credentials.bio ? credentials.bio : '',
            website: credentials.website ? credentials.website : '',
            location: credentials.location ? credentials.location : '',

        });
    }
    handleChange = (event) => {
        console.log("debug handle change");
        this.setState({

            [event.target.name]: event.target.value
        });
    };

    handleSubmit = () => {
        const userDetails = {
            bio: this.state.bio,
            website: this.state.website,
            location: this.state.location
        };

        this.props.editUserDetails(userDetails);
        this.handleClose();
    }

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <Tooltip title="Edit Details" placement="top">
                    <IconButton onClick={this.handleOpen} className={classes.button}>
                        <EditIcon color="primary" />
                    </IconButton>
                </Tooltip>
                {/* <MyButton tip="Edit Details" onClick={this.handleOpen} btnclassName={classes.button}>
                    <EditIcon color="primary" />
                </MyButton> */}

                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth='sm'>

                    <DialogTitle>Edit Your Profile Details</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField
                                name="bio"
                                type="text"
                                label="Bio"
                                multiline
                                rows="3"
                                placeholder="A short bio about yourself"
                                classname={classes.TextField}
                                value={this.state.bio}
                                onChange={this.handleChange}
                                fullWidth />

                            <TextField
                                name="website"
                                type="text"
                                label="Website"
                                placeholder="Your personal website"
                                classname={classes.TextField}
                                value={this.state.website}
                                onChange={this.handleChange}
                                fullWidth />

                            <TextField
                                name="location"
                                type="text"
                                label="Location"
                                placeholder="Where do you live"
                                classname={classes.TextField}
                                value={this.state.location}
                                onChange={this.handleChange}
                                fullWidth />

                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSubmit} color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

EditDetails.protoTypes = {
    editUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    credentials: state.user.credentials
})

export default connect(mapStateToProps, { editUserDetails })(withStyles(styles)(EditDetails));
