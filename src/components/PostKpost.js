import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

//mui
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';


//redux
import { connect } from 'react-redux';
import { editUserDetails } from '../redux/actions/userActions';
import { postKpost, clearErrors} from '../redux/actions/dataActions';
import MyButton from '../util/MyButton';

const styles = theme => ({
   // ...theme,
    submitButton:{
        position: 'relative',
        float: 'right',
        marginTop: 10

    },
    progressSpinner:{
        position: 'absolute'
    },
    closeButton :{
        position: 'absolute',
        left: '91%',
        top: '3%'
    }
})
class PostKpost extends Component {
    state = {
        open: false,
        body: '',
        errors: {}
    };
    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({
                errors: nextProps.UI.errors
            })
        }
        if(!nextProps.UI.errors && !nextProps.UI.loading){
            this.setState({ body: '', open: false, errors: {} });
            
        }
    }
    handleOpen = () => {
        this.setState({ open: true });
    }
    handleClose = () => {
        this.props.clearErrors();
        this.setState({ open: false, errors: {} });
        
    }
    handleChange = (event)=>{
        this.setState({ [event.target.name]: event.target.value});
        
    }

    handleSubmit = (event)=>{
        event.preventDefault();
        this.props.postKpost( { body: this.state.body});
        //this.handleClose();
    }
    render() {
        const { errors } = this.state;
        const { classes, UI: { loading } } = this.props;
        return (
            <Fragment>
                <MyButton onClick={this.handleOpen} tip="post something">
                    <AddIcon color="secondary" />
                </MyButton>
                <Dialog
                    open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon />
                    </MyButton>
                    <DialogTitle>Post something new!</DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField name="body"
                                type="text"
                                label="KPOST"
                                multiline
                                rows="4"
                                placeholder="hmmmmmm...."
                                error={errors.body ? true : false}
                                helperText={errors.body}
                                className={classes.TextField}
                                onChange={this.handleChange}
                                fullWidth />
                            <Button type="submit" variant="contained"
                                color="primary" className={classes.submitButton} disabled={loading}>
                                Submit
                                {loading && (
                                    <CircularProgress size={30} className={classes.progressSpinner} />
                                )}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

PostKpost.propTypes = {
    postKpost: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    UI: state.UI
})

export default connect(mapStateToProps, { postKpost, clearErrors })(withStyles(styles)(PostKpost));
