const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

connectToMongo();

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use('/api/art', require('./routes/artRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
