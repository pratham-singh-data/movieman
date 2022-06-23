import React, {useEffect, useState, useReducer} from "react";
import {useParams} from "react-router-dom";
import apiGet from "../misc/config";

const reducer = (prevState, action) => {
    switch(action.type){
        case 'FETCH_SUCCESS':{
            return {error: null, loading:false, show: action.show};
        }

        case 'FETCH_FAILED':{
            return {
                ...prevState,
                loading: false,
                error: action.error
            }
        }

        default: return prevState;
    }
}

const initialState = {
    show: null,
    loading: true,
    error: null
}

const Show = () => {
    const {id} = useParams();

    const [{show, loading, error}, dispatch] = useReducer(reducer, [])

    // const [show, setShow] = useState(null);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`).then(res => {
            if(isMounted){
                dispatch({type: "FETCH_SUCCESS", show: res});
            }
        }).catch((err) => {
            dispatch({type: "FETCH_FAILED", error: err.message});
        });

        return () => {
            isMounted = false;
        }
    }, [id]);

    console.log(show);

    if(loading){
        return(
            <div>Loading Data</div>
        );
    }

    if(error){
        return(
            <div>Error Occurred</div>
        );
    }

    return(
        <div>
            This is the show page
        </div>
    );
}

export default Show;