import React, {useState} from "react";
import MainPageLayout from "../components/MainPageLayout";

const Home = () =>{
    const [input, setInput] = useState("");

    const onInputChange = (ev) => {
        setInput(ev.target.value);
    }

    const onSearch = () => {
        // https://api.tvmaze.com/search/shows?q=air
        fetch(`https://api.tvmaze.com/search/shows?q=${input}`).then(res => res.json()).then(result => {
            console.log(result);
        })
    }

    const onKeyDownInput = (ev) => {
        if(ev.keyCode === 13){
            onSearch();
        }
    }

    return(
        <MainPageLayout>
            <input type="text" onKeyDown={(ev) => onKeyDownInput(ev)} onChange={(ev) => onInputChange(ev)}/>
            <button type="button" onClick={(ev) => onSearch()}>Search</button>
        </MainPageLayout>
    );
}

export default Home;