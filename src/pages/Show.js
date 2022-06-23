import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import apiGet from "../misc/config";

const Show = () => {
    const {id} = useParams();
    const [show, setShow] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`).then(res => {
            if(isMounted){
                setShow(res);
                setLoading(false);
            }
        }).catch((err) => {
            setError(err.message);
            setLoading(false);
        });

        return () => {
            isMounted = false;
        }
    }, [id]);

    useEffect(() => {
        console.log(show);
    }, [show]);

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