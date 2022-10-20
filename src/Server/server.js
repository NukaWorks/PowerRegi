/*
 * PowerRegi Backend Server
 */

// Importing modules
const express = require('express');


// Setup dotenv & express
require('dotenv').config()
const app = express();
const port = process.env.APP_API_PORT;

// API Routes
app.get('/', (req, res) => {
  res.contentType('application/json');

})

// Start server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})

