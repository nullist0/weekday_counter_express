const express = require('express')
const cors = require('cors');
const app = express()
const port = 5000

app.use(cors());

app.get('/', (req, res) => {

    console.log(req.query);
  res.send(`HELLO`);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});