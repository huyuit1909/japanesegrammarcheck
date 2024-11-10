const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Định tuyến
const grammarRoute = require('./routes/grammarRoute');
app.use('/api/grammar', grammarRoute);

const PORT = process.env.PORT || 3100;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));