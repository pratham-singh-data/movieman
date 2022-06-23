import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import apiGet from "../misc/config";

const Show = () => {
    const {id} = useParams();
    const [show, setShow] = useState(null);

    useEffect(() => {
        apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`).then(res => {
            setShow(res);
        });
    }, [id]);

    useEffect(() => {
        console.log(show);
    }, [show]);

    return(
        <div>
            This is the show page
        </div>
    );
}

export default Show;