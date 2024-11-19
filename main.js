const express = require('express');
const userRoutes = require('./listRoutes');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', userRoutes);

module.exports = app;