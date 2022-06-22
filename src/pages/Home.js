import React, {useState} from "react";
import MainPageLayout from "../components/MainPageLayout";
import apiGet from "../misc/config";

const Home = () =>{
    const [input, setInput] = useState("");
    const [results, setResults] = useState(null);

    const onInputChange = (ev) => {
        setInput(ev.target.value);
    }

    const onSearch = () => {
        apiGet(`/search/shows?q=${input}`).then(result => {
            setResults(result);
        });
    }

    const onKeyDownInput = (ev) => {
        if(ev.keyCode === 13){
            onSearch();
        }
    }

    const renderResults = () => {
        if(results && results.length === 0){
            // serached for something but got nothing
            return(
                <div>
                    No results found
                </div>
            );
        }

        if(results && results.length > 0){
            // got some results
            return(
                <div>
                    {results.map((item) => <div key={item.show.id}>{item.show.name}</div> )}
                </div>
            )
        }

        // else
        return null;
    }

    return(
        <MainPageLayout>
            <input type="text" onKeyDown={(ev) => onKeyDownInput(ev)} onChange={(ev) => onInputChange(ev)}/>
            <button type="button" onClick={(ev) => onSearch()}>Search</button>

            {renderResults()}
        </MainPageLayout>
    );
}

export default Home;