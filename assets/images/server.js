const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Endpoint to get books
app.get('/api/books', (req, res) => {
    fs.readFile('db.json', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading database');
        }
        res.json(JSON.parse(data));
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});