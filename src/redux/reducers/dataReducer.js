import {
    SET_KPOSTS,
    POST_KPOST,
    LIKE_KPOST,
    UNLIKE_KPOST,
    LOADING_DATA,
    DELETE_KPOST
} from '../types';

const initialState = {
    kposts: [],
    kpost: {},
    loading: false

};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            }
        case SET_KPOSTS:
            return {
                ...state,
                kposts: action.payload,
                loading: false
            }

        case LIKE_KPOST:
            let index = state.kposts.findIndex((kpost) => kpost.kpostId === action.payload.kpostId);
            state.kposts[index] = action.payload;
            return {
                ...state
            }
        case UNLIKE_KPOST:
            index = state.kposts.findIndex((kpost) => kpost.kpostId === action.payload.kpostId);
            state.kposts[index] = action.payload;
            return {
                ...state
            }
        case DELETE_KPOST:
            index = state.kposts.findIndex((kpost) => kpost.kpostId === action.payload);
            state.kposts.splice(index, 1);
            return {
                ...state
            }
        case POST_KPOST:
            return {
                ...state,
                kposts:[
                    action.payload,
                    ...state.kposts
                ]
            }

        default:
            return state;
    }
}