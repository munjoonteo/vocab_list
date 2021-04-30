const express = require("express");
const cors = require("cors");
const axios = require("axios");
const path = require("path");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "client/build")));

app.post("/word", (req, res) => {
  axios
    .get(`https://jisho.org/api/v1/search/words?keyword=${req.body.word}`)
    .then(response => res.status(200).send(response.data))
    .catch(err => console.log(err));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});
