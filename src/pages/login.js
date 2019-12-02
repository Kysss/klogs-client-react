import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import AppIcon from '../images/world-logo.png';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';

//redux stuff
import {connect} from 'react-redux';
import {loginUser} from '../redux/actions/userActions';

// import {setProgressVisible} from '../components/Navbar';
import { Link } from 'react-router-dom';
//import axios from 'axios';
//axios.defaults.baseURL = 'https://us-central1-klogs-61e15.cloudfunctions.net/api';

const styles = {

    form: {
        textAlign: 'center'
    },
    image: {

        margin: '30px, auto, 30px, auto',
        width: '100px',
        height: '100px'
    },
    pageTitle: {
        margin: '30px, auto, 30px, auto'
    },
    textField: {
        margin: '30px, auto, 30px, auto'

    },
    button: {
        marginTop: 20,
        position: 'relative'
    },
    customError: {
        color: 'red',
        fontSize: '0.8rem',
        marginTop: 10
    },
    progress: {
        position: 'absolute'
    },
    root: {
        width: '100%',
        marginTop: 0
    }


};



class login extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
        //    loading: false,
            errors: {}

        }

    }

    // setProgressToVisible(event){
    //     setProgressVisible();
    // }
    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({errors: nextProps.UI.errors});
        }
    }
    handleSubmit(event) {
        console.log("debug submit change 1");
        event.preventDefault();
        // this.setState({
        //     loading: true
        // });

        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.loginUser(userData,this.props.history);
    }

    handleChange(event){
        console.log("debug handle change");
        this.setState({

            [event.target.name]: event.target.value
        });
    }

    render() {


        const { 
            classes, 
            UI: {loading} 
        } = this.props;
        const { errors} = this.state;
        return (





            <Grid container className={classes.form}>
                {/* <Grid item xs={12}/> */}

                <Grid item sm />


                <Grid item sm>

                    {loading && (
                        <div >
                            <LinearProgress color="secondary" />
                        </div>)}
                    <br />
                    <img src={AppIcon} className={classes.image} alt="world-icon" />

                    <Typography
                        variant="h3"
                        color="textPrimary"

                        className={classes.pageTitle}>
                        Login
                   </Typography>

                    <form noValidate onSubmit={(event) => this.handleSubmit(event)}>
                        <TextField
                            id="email"
                            name="email"
                            type="email"
                            className={classes.textField}
                            helperText={errors.email}
                            error={errors.email ? true : false}
                            label="Email"
                            value={this.state.email}
                            onChange={(event) => this.handleChange(event)}
                            margin="normal"
                            variant="outlined"
                            fullWidth
                        />

                        <TextField
                            id="password"
                            name="password"
                            type="password"
                            className={classes.textField}
                            helperText={errors.password}
                            error={errors.password ? true : false}
                            label="Password"
                            value={this.state.password}
                            onChange={(event) => this.handleChange(event)}
                            margin="normal"
                            variant="outlined"
                            fullWidth
                        />

                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            disabled={loading}>
                            LOGIN
                            {loading && (
                                <CircularProgress variant="indeterminate" color="primary" className={classes.progress} />
                            )}

                        </Button>



                        <br />
                        <small>
                            don't have an account? sign up <Link to="/signup">here</Link>
                        </small>

                    </form>

                </Grid>

                <Grid item sm />
            </Grid>
        )
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) =>({
    user: state.user,
    UI: state.UI

})

const mapActionsToProps = {
    loginUser
}
//export default withStyles(styles)(login);
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login));