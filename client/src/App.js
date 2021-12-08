import { React, useState, useCallback, useEffect } from "react";
import axios from "axios";

import SearchBar from "./components/SearchBar";
import Results from "./components/Results";
import WordList from "./components/WordList";

import Pic from "./static/search.png";

import "./style/App.css";

function App() {
  const filename = "export.txt";

  const [word, setWord] = useState("");
  const [results, setResults] = useState(null);
  const [wordList, setWordList] = useState([]);
  const [currPage, setCurrPage] = useState("results");

  const addToList = async newWord => {
    if (!wordList.includes(newWord)) setWordList([...wordList, newWord]);
  };

  const removeFromList = async word => {
    let index = wordList.indexOf(word);
    if (index >= 0) wordList.splice(index, 1);
  };

  const resultsPage = <Results results={results} onAdd={addToList} />;
  const wordListPage = (
    <WordList wordList={wordList} onRemove={removeFromList} />
  );

  const seeWordList = async () => {
    setCurrPage("wordlist");
  };

  const seeResults = async () => {
    setCurrPage("results");
  };

  const wordListButton = (
    <button className="buttons list-button" onClick={seeWordList}>
      View Current Word List
    </button>
  );

  const resultsButton = (
    <button className="buttons list-button" onClick={seeResults}>
      Return to Results
    </button>
  );

  // Memoise getWords so that it is not recreated every single render
  const getWords = useCallback(async () => {
    if (word === "") return;
    return await axios
      .post(`/word`, {
        word: word,
      })
      .then(result => {
        setResults(result);
        console.log(result);
        seeResults();
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

  // Create text file contents
  const createText = () => {
    const DELIM = "\\";

    if (wordList.length === 0) return "";

    let text = `expression${DELIM}reading${DELIM}meaning\n`;

    for (let word of wordList) {
      let entry = [word.expression, word.reading, word.meaning];
      let ankiCard = `${entry.join(DELIM)}\n`;
      text = text + ankiCard;
    }
    return text;
  };

  const download = () => {
    let element = document.createElement("a");
    let text = createText();

    if (text === "") return;

    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text)
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
        Made by<a href="https://munjoonteo.netlify.app/">Mun Joon Teo</a>
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
          {currPage === "results" ? resultsPage : wordListPage}
        </div>
        <div className="right">
          {currPage === "results" ? wordListButton : resultsButton}
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
