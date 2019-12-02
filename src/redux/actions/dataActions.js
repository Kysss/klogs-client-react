import { 
    SET_KPOSTS,
    POST_KPOST,
    LOADING_DATA, 
    DELETE_KPOST, 
    LIKE_KPOST, 
    UNLIKE_KPOST, 
    SET_ERRORS, 
    LOADING_UI, 
    CLEAR_ERRORS} from '../types';
import axios from 'axios';
// import { arrayExpression } from '@babel/types';


//get all kposts
export const getKposts = () => (dispatch) =>{
    dispatch({type: LOADING_DATA});
    axios.get('/kposts')
    .then(res=>{
        dispatch({
            type: SET_KPOSTS,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: SET_KPOSTS,
            payload: []
        })
    })
}

export const postKpost = (newKpost) =>(dispatch)=>{
    dispatch( { type: LOADING_UI });
    axios.post('/kpost', newKpost)
    .then(res=>{
        dispatch({
            type: POST_KPOST,
            payload: res.data
        });
        dispatch({type: CLEAR_ERRORS});
    })
    .catch(err=>{
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
    })
}

//like a kpost
export const likeKpost=(kpostId)=>(dispatch)=>{
   // console.log("dataaction debug like1");
    axios.get(`/kpost/${kpostId}/like`)
    .then(res=>{
        dispatch({
            type: LIKE_KPOST,
            payload: res.data
        })
    })
    .catch(err=>console.log(err));
}

//lunike a kpost
export const unlikeKpost=(kpostId)=>(dispatch)=>{
    axios.get(`/kpost/${kpostId}/unlike`)
    .then(res=>{
        dispatch({
            type: UNLIKE_KPOST,
            payload: res.data
        })
    })
    .catch(err=>console.log(err));
}

export const deleteKpost=(kpostId)=>(dispatch)=>{
    axios.delete(`/kpost/${kpostId}`)
    .then(()=>{
        dispatch({type: DELETE_KPOST, payload: kpostId})
    })
    .catch(err => console.log(err));
}

export const clearErrors = () => dispatch =>{
    dispatch({type: CLEAR_ERRORS});
}