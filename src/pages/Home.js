import React, { useState } from 'react';
import ActorGrid from '../components/actor/ActorGrid';
import CustomRadio from '../components/CustomRadio';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/show/ShowGrid';
import apiGet from '../misc/config';
import { useLastQuery } from '../misc/custom-hooks';
import {
  RadioInputsWrapper,
  SearchButtonWrapper,
  SearchInput,
} from './Home.styled';

const Home = () => {
  const [input, setInput] = useLastQuery();
  const [results, setResults] = useState(null);
  const [searchOption, setSearchOption] = useState('shows');

  const onInputChange = ev => {
    setInput(ev.target.value);
  };

  const onSearch = () => {
    apiGet(`/search/${searchOption}?q=${input}`).then(result => {
      setResults(result);
    });
  };

  const onKeyDownInput = ev => {
    if (ev.keyCode === 13) {
      onSearch();
    }
  };

  const renderResults = () => {
    if (results && results.length === 0) {
      // serached for something but got nothing
      return <div>No results found</div>;
    }

    if (results && results.length > 0) {
      // got some results
      return (
        <div>
          {results[0].show ? (
            <ShowGrid data={results} />
          ) : (
            <ActorGrid data={results} />
          )}
        </div>
      );
    }

    // else
    return null;
  };

  const onRadioChange = ev => {
    setSearchOption(ev.target.value);
  };

  return (
    <MainPageLayout>
      <SearchInput
        type="text"
        value={input}
        placeholder="Text Here"
        onKeyDown={ev => onKeyDownInput(ev)}
        onChange={ev => onInputChange(ev)}
      />

      <RadioInputsWrapper>
        <div>
          <CustomRadio
            label="Show"
            id="show-serach"
            name="search-specifier"
            value="shows"
            onChange={ev => onRadioChange(ev)}
            defaultChecked
          />
        </div>

        <div>
          <CustomRadio
            label="Actor"
            id="actor-search"
            name="search-specifier"
            value="people"
            onChange={ev => onRadioChange(ev)}
          />
        </div>
      </RadioInputsWrapper>

      <SearchButtonWrapper>
        <button type="button" onClick={ev => onSearch()}>
          Search
        </button>
      </SearchButtonWrapper>

      {renderResults()}
    </MainPageLayout>
  );
};

export default Home;
