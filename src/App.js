import axios from "axios";
import "./App.css";

async function getWords() {
  await axios
    .get(
      `https://cors-anywhere.herokuapp.com/https://jisho.org/api/v1/search/words?keyword=neko`
    )
    .then(result => {
      console.log(result.data.data);
    })
    .catch(err => {
      console.log(err);
    });
}

function App() {
  getWords();
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
    </div>
  );
}

export default App;
