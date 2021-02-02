import React from "react";
import axios from "axios";
import "./style/App.css";
import SearchBar from "./components/SearchBar";
import Results from "./components/Results";

function App() {
  const [word, setWord] = React.useState("");
  const [results, setResults] = React.useState(null);

  async function getWords() {
    console.log(word);
    return await axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://jisho.org/api/v1/search/words?keyword=${word}`
      )
      .then(result => {
        setResults(result);
      })
      .catch(err => {
        console.log(err);
      });
  }

  async function updateInput(input) {
    setWord(input);
  }

  return (
    <div className="App">
      <div className="author">
        Made by<a href="https://github.com/munjoonteo">Mun Joon Teo</a>
      </div>
      <div className="title">Japanese Vocabulary List Creator</div>
      <div className="search">
        <SearchBar keyword={word} setKeyword={updateInput} />
        <div className="search-button" onClick={getWords}>
          Search
        </div>
      </div>
      <div className="middle">
        <Results results={results} />
      </div>
      <div className="footer">
        Powered by the<a href="https://jisho.org/">Jisho API</a>
      </div>
    </div>
  );
}

export default App;
