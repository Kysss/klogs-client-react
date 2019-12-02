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

import { Link } from 'react-router-dom';
//import axios from 'axios';

//redux stuff
import {connect} from 'react-redux';
import{signupUser} from '../redux/actions/userActions';

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


class signup extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword:'',
            handle:'',
            //loading: false,
            errors: {}

        }

    }

    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({errors: nextProps.UI.errors});
        }
    }

    // setProgressToVisible(event){
    //     setProgressVisible();
    // }
    handleSubmit(event) {
        console.log("debug submit change 1");
        event.preventDefault();
        this.setState({
            loading: true
        });

        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        }
        this.props.signupUser(newUserData,this.props.history);
        // axios.post('/signup', newUserData)

        //     .then(res => {


        //         console.log(res.data);

        //         //local storage
        //         localStorage.setItem('FBIdToken',`Bearer ${res.data.token}`);
        //         this.setState({
        //             loading: false
        //         })

        //         //direct to
        //         console.log("debug submit 2");
        //         this.props.history.push('/');
        //     })
        //     .catch(err => {
        //         this.setState({
        //             errors: err.response.data,
        //             loading: false
        //         })
        //     })
    };

    handleChange(event) {
        console.log("debug handle change");
        this.setState({

            [event.target.name]: event.target.value
        });
    }

    render() {


        const { classes, UI:{loading} } = this.props;
        const { errors } = this.state;
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
                        Sign Up
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
                            label="Create Password"
                            value={this.state.password}
                            onChange={(event) => this.handleChange(event)}
                            margin="normal"
                            variant="outlined"
                            fullWidth
                        />
                        <TextField
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            className={classes.textField}
                            helperText={errors.confirmPassword}
                            error={errors.confirmPassword ? true : false}
                            label="Confirm Password"
                            value={this.state.confirmPassword}
                            onChange={(event) => this.handleChange(event)}
                            margin="normal"
                            variant="outlined"
                            fullWidth
                        />

                        <TextField
                            id="handle"
                            name="handle"
                            type="text"
                            className={classes.textField}
                            helperText={errors.handle}
                            error={errors.handle ? true : false}
                            label="Choose a User ID"
                            value={this.state.handle}
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
                            SIGN UP
                            {loading && (
                                <CircularProgress variant="indeterminate" color="primary" className={classes.progress} />
                            )}

                        </Button>



                        <br />
                        <small>
                            already have an account? log in <Link to="/login">here</Link>
                        </small>

                    </form>

                </Grid>

                <Grid item sm />
            </Grid>
        )
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired
}

const mapStateToProps = (state)=>({
    user:state.user,
    UI: state.UI
})

const mapActionsToProps = {
    signupUser
}
export default connect (mapStateToProps, mapActionsToProps)(withStyles(styles)(signup));