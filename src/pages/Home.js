import React, {useState} from "react";
import MainPageLayout from "../components/MainPageLayout";
import apiGet from "../misc/config";

const Home = () =>{
    const [input, setInput] = useState("");
    const [results, setResults] = useState(null);
    const [searchOption, setSearchOption] = useState("shows");

    const onInputChange = (ev) => {
        setInput(ev.target.value);
    }

    const onSearch = () => {
        apiGet(`/search/${searchOption}?q=${input}`).then(result => {
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
                    {results[0].show ? results.map((item) => <div key={item.show.id}>{item.show.name}</div>) : results.map((item) => <div key={item.person.id}>{item.person.name}</div>)}
                </div>
            )
        }

        // else
        return null;
    }

    const onRadioChange = (ev) => {
        setSearchOption(ev.target.value);
    }

    return(
        <MainPageLayout>
            <input type="text" placeholder="Text Here" onKeyDown={(ev) => onKeyDownInput(ev)} onChange={(ev) => onInputChange(ev)}/>
            
            <div>
                <input type="radio" id="show-search" name="search-specifier" value="shows" onChange={(ev) => onRadioChange(ev)} defaultChecked/>
                <label htmlFor="show-search">
                    Show
                </label>

                <input type="radio" id="actor-search" name="search-specifier" value="people" onChange={(ev) => onRadioChange(ev)}/>
                <label htmlFor="actor-search">
                    Actor
                </label>
            </div>
            
            <button type="button" onClick={(ev) => onSearch()}>Search</button>

            {renderResults()}
        </MainPageLayout>
    );
}

export default Home;