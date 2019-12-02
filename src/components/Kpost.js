import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import PropTypes from 'prop-types';
import MyButton from '../util/MyButton';
import DeleteKpost from '../components/DeleteKpost';


//Material UI 
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';



import { connect } from 'react-redux';
import { likeKpost, unlikeKpost } from '../redux/actions/dataActions';

//import { Typography } from '@material-ui/core';


const styles = {
    card: {
        position: 'relative',
        display: 'flex',
        marginBottom: 10
    },
    image: {
        minWidth: 150
    },
    content: {
        padding: 35,
        objectFit: 'cover'
    }
}

class Kpost extends Component {
    likedKpost = () => {
        console.log("true or false" + this.props.user.likes &&
            this.props.user.likes.find(
                (like) => like.kpostId === this.props.kpost.kpostId));
        if (
            this.props.user.likes &&
            this.props.user.likes.find(
                (like) => like.kpostId === this.props.kpost.kpostId
            ))

            return true;
        else return false;
    };

    likeKpost = () => {
        console.log("debug");
        this.props.likeKpost(this.props.kpost.kpostId);
    }
    unlikeKpost = () => {
        this.props.unlikeKpost(this.props.kpost.kpostId);
    }
    render() {
        dayjs.extend(relativeTime);
        //de-constructuring
        const { classes,
            kpost: { body, createdAt, userImage, userhandle, kpostId, likeCount, commentCount },
            user: {
                authenticated, credentials: { handle }
            }
        } = this.props
        const likeButton = !authenticated ? (
            <MyButton tip="like this kpost ">
                <Link to="/login">
                    <FavoriteBorder color="secondary" />
                </Link>
            </MyButton>
        ) : (
                this.likedKpost() ? (
                    <MyButton tip="Unlike" onClick={this.unlikeKpost}>

                        <FavoriteIcon color="secondary" />

                    </MyButton>
                ) : (
                        <MyButton tip="Like" onClick={this.likeKpost}>

                            <FavoriteBorder color="secondary" />

                        </MyButton>
                    )
            );
        const deleteButton = authenticated && userhandle === handle ? (
            <DeleteKpost kpostId={kpostId} />
        ) : null;
        return (
            <Card className={classes.card}>
                <CardMedia
                    image={userImage}
                    title="Profile Image" className={classes.image} />
                <CardContent className={classes.content}>
                    <Typography variant="h6"
                        component={Link}
                        to={`/users/${userhandle}`}
                        color="primary"
                    >
                        {userhandle}
                    </Typography>
                    {deleteButton}
                    <Typography variant="body2" color="textSecondary">{"Posted " + dayjs(createdAt).fromNow()}</Typography>
                    <Typography variant="body1">{body}</Typography>
                    {likeButton}
                    <span>{likeCount} Likes</span>
                    <MyButton tip="comments">
                        <ChatIcon color="secondary" />
                    </MyButton>
                    <span>{commentCount} Comments</span>
                </CardContent>
            </Card>
        )
    }
}
Kpost.propTypes = {
    likeKpost: PropTypes.func.isRequired,
    unlikeKpost: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    kpost: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    user: state.user
})

const mapActionsToProps = {
    likeKpost,
    unlikeKpost
}
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Kpost));
