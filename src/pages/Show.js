import React, {useEffect, useReducer} from "react";
import {useParams} from "react-router-dom";
import Cast from "../components/show/Cast";
import Details from "../components/show/Details";
import Seasons from "../components/show/Seasons";
import ShowMainData from "../components/show/ShowMainData";
import apiGet from "../misc/config";
import { InfoBlock, ShowPageWrapper } from "./Show.styled";

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

    const [{show, loading, error}, dispatch] = useReducer(reducer, initialState);

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
        <ShowPageWrapper>
            <ShowMainData image={show.image} name={show.name} rating={show.rating} summary={show.summary} tags={show.genres}/>

            <InfoBlock>
                <h2>Details</h2>
                <Details status={show.status} network={show.network} premiere={show.premiere} />
            </InfoBlock>

            <InfoBlock>
                <h2>Seasons</h2>
                <Seasons seasons={show._embedded.seasons}/>
            </InfoBlock>

            <InfoBlock>
                <h2>Cast</h2>
                <Cast cast={show._embedded.cast}/>
            </InfoBlock>

        </ShowPageWrapper>
    );
}

export default Show;