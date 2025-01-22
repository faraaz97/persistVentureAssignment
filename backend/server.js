const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 5000;

// Use CORS middleware
app.use(cors());

// Middleware to handle JSON requests
app.use(express.json());

// Route to fetch book recommendations with search feature
app.get('/api/books', async (req, res) => {
    const searchQuery = req.query.q || 'harry potter';

    try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`);
        const books = response.data.items || [];
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch books' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
