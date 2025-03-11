const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

const API_KEY = 'AIzaSyABpxQrai8pJQ9Ig9pVHjJFxN7BsP6JPy4'; // Clave de API

app.get('/nearby-places', async (req, res) => {
    const { lat, lng } = req.query;
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=tourist_attraction&key=${API_KEY}`;

    try {
        const response = await axios.get(url);
        res.json(response.data.results);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching nearby places' });
    }
});

app.listen(port, () => {
    console.log(`Servidor backend corriendo en http://localhost:${port}`);
});