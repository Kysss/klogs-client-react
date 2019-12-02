import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';
import MyButton from '../util/MyButton';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//Material UI stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import PostKpost from '../components/PostKpost';
//mport LinearProgress from '@material-ui/core/LinearProgress';
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import NotificationsIcon from '@material-ui/icons/Notifications';

class Navbar extends Component {

    render() {
        const { authenticated } = this.props
        return (
            <AppBar>
                <Toolbar className="nav-container">
                    {authenticated ? (
                        <Fragment>

                           
                            <Link to="/">
                                <MyButton tip="Home">
                                    <HomeIcon color="secondary" />
                                </MyButton>
                            </Link>
                          
                            <PostKpost />
                            {/* <MyButton tip="Post Something">
                                <AddIcon color="secondary" />
                            </MyButton> */}

                            <MyButton tip="Notifications">
                                <NotificationsIcon color="secondary" />
                            </MyButton>

                        </Fragment>
                    ) : (
                            <Fragment>
                                <Button color="inherit" component={Link} to="/login">Login</Button>
                                <Button color="inherit" component={Link} to="/">Home</Button>
                                <Button color="inherit" component={Link} to="/signup">SignUp</Button>
                            </Fragment>
                        )}
                </Toolbar >

            </AppBar>
        )
    }
}

// export const setProgressVisible = (n) =>{
//     var x = document.getElementsByName("progress_bar");
//     x.hidden= 'false';
// }

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired
}
const mapStateToProps = state => ({
    authenticated: state.user.authenticated
})
export default connect(mapStateToProps)(Navbar);
