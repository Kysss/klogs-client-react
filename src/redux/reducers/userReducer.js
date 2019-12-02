import { SET_USER, LIKE_KPOST, UNLIKE_KPOST, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_AUTHENTICATED, SET_UNAUTHENTICATED, LOADING_USER } from '../types';
//import { ActionSubject } from 'material-ui/svg-icons';

const initialState = {
    loading: false,
    authenticated: false,
    credentials: {},
    likes: [],
    notifications: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            };
        case SET_UNAUTHENTICATED:
            return initialState;
        case SET_USER:
            return {
                authenticated: true,
                loading: false,
                ...action.payload
            };
        case LOADING_USER:
            return {
                ...state,
                loading: true
            };
        case LIKE_KPOST:
            return {
                ...state,
                likes: [
                    ...state.likes,
                    {
                        userhandle: state.credentials.handle,
                        kpostId: action.payload.kpostId

                    }
                ]
            };
        case UNLIKE_KPOST:
            return {
                ...state,
                likes: state.likes.filter(like => like.kpostId !== action.payload.kpostId)
            };
        default:
            return state;
    }
}