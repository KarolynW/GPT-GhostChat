const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const gpt4Routes = require('./routes/gpt4Routes');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/gpt4', gpt4Routes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});



