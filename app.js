require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const openaiRoute = require('./routes/openai');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/api/fitness', openaiRoute);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
