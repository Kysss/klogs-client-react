import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import themeFile from './util/theme';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { MuiThemeProvider } from '@material-ui/core/styles';
import jwtDecode from 'jwt-decode';
//Redux
import {Provider} from 'react-redux';
import store from './redux/store';
import {SET_AUTHENTICATED} from './redux/types';
import {logoutUser, getUserData} from './redux/actions/userActions';

//components
import Navbar from './components/Navbar';
import AuthRoute from './util/AuthRoute';

//pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import axios from 'axios';


//customized theme
const theme = createMuiTheme(themeFile);
const token = localStorage.FBIdToken;
// let authenticated;
if (token) {
  const decodedToken = jwtDecode(token);
  console.log(decodedToken);
  console.log(decodedToken.exp);


  //*1000 becaue seconds
  if (decodedToken.exp * 1000 < Date.now()) {
    //using relative path 
    store.dispatch(logoutUser());
    window.location.path = '/login';
    //authenticated = false;
    //authenticated = false;

  } else {
    //authenticated = true;
    store.dispatch({type: SET_AUTHENTICATED});
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}
// else{
//   authenticated=false;
// }



class App extends Component {

  render() {
    return (
      //applying customized theme
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
        <div>
          <Router>

            <Navbar />
            <div className="container">

              <Switch>
                <Route exact path="/" component={home} />
                <AuthRoute exact path="/login" component={login}
                  //authenticated={authenticated}
                />
                <AuthRoute exact path="/signup" component={signup}
                 // authenticated={authenticated}
                />
              </Switch>
            </div>
          </Router>
        </div>
        </Provider>
      </MuiThemeProvider>
    )
  }
}

export default App

