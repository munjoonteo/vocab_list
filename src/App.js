import { React, useState, useCallback, useEffect } from "react";
import axios from "axios";
import "./style/App.css";
import SearchBar from "./components/SearchBar";
import Results from "./components/Results";
import Pic from "./static/search.png";

function App() {
  const [word, setWord] = useState("");
  const [results, setResults] = useState(null);
  const [wordList, setWordList] = useState([]);

  const filename = "export.txt";

  // Memoise getWords so that it is not recreated every single render
  const getWords = useCallback(async () => {
    if (word === "") return;
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
  }, [word]);

  const updateInput = async input => {
    setWord(input);
  };

  // Support for Enter key
  useEffect(() => {
    const listener = event => {
      if (event.code === "Enter" || event.code === "NumpadEnter") getWords();
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [getWords]);

  const addToList = async newWord => {
    if (!wordList.includes(newWord)) setWordList([...wordList, newWord]);
  };

  const createText = () => {
    let text = "expression; reading; meaning\n";
    for (let word of wordList) {
      let ankiCard =
        word.expression + "; " + word.reading + "; " + word.meaning + "\n";
      text = text + ankiCard;
    }
    return text;
  };

  const download = () => {
    console.log(wordList);
    let element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8" + encodeURIComponent(createText())
    );
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  };

  return (
    <div className="App">
      <div className="author">
        Made by<a href="https://github.com/munjoonteo">Mun Joon Teo</a>
      </div>
      <div className="title">Japanese Vocabulary List Creator</div>
      <div className="search">
        <SearchBar keyword={word} onChange={updateInput} />
        <div className="search-button" onClick={getWords}>
          <div className="search-text">Search</div>
          <img src={Pic} alt="" height="60px" width="60px" />
        </div>
      </div>
      <div className="middle">
        <div className="left">
          <Results results={results} onAdd={addToList} />
        </div>
        <div className="right">
          <button className="buttons list-button">
            View Current Word List
          </button>
          <button className="buttons export-button" onClick={download}>
            Export as Text File
          </button>
        </div>
      </div>
      <div className="footer">
        Powered by the<a href="https://jisho.org/">Jisho API</a>
      </div>
    </div>
  );
}

export default App;
