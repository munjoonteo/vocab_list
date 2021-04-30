const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.post("/*", (req, res) => {
  axios
    .get(`https://jisho.org/api/v1/search/words?keyword=${req.body.word}`)
    .then(response => res.status(200).send(response.data))
    .catch(err => console.log(err));
});

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});
