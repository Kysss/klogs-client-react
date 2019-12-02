import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Kpost from '../components/Kpost';
import Profile from '../components/Profile';
import axios from 'axios';

import { connect } from 'react-redux';
import { getKposts } from '../redux/actions/dataActions';
axios.defaults.baseURL = 'https://us-central1-klogs-61e15.cloudfunctions.net/api';


export class home extends Component {
    // state = {
    //     kposts: null
    // }
    componentDidMount() {
        // axios
        //     .get('/kposts')
        //     .then((res) => {
        //       //  console.log(res.data);
        //         this.setState({
        //             kposts: res.data
        //         });
        //     })
        //     .catch((err) => console.log(err));
        this.props.getKposts();

    }
    render() {
        const { kposts, loading } = this.props.data;
        let recentKpostsMarkup = !loading ? (
            kposts.map((kpost) => <Kpost key={kpost.kpostId} kpost={kpost} />)
        ) :
            (<p>Please wait...</p>);


        return (
            <Grid container spacing={6}>
                <Grid item sm={8} xs={2}>
                    {recentKpostsMarkup}
                </Grid>
                <Grid item sm={4} xs={2}>
                    <Profile />
                </Grid>
            </Grid>
        )
    }
}

home.propTypes = {
    getKposts: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    data: state.data
})
export default connect(mapStateToProps, { getKposts })(home);
