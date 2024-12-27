const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(cors());

// API Endpoint to fetch data
app.get('/ports', async (req, res) => {
    console.log("req recieved")
  const url = 'https://raw.githubusercontent.com/marchah/sea-ports/refs/heads/master/lib/ports.json';

  try {
    // Fetch data from the remote endpoint
    const response = await axios.get(url);
    const data = response.data; // Extract the data
    console.log("data", JSON.stringify(data))

    // Send the data as a response
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching ports data:', error.message);
    res.status(500).json({ error: 'Failed to fetch ports data.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
