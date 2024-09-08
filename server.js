const express = require('express');
const fetchData = require('./db');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/data', async (req, res) => {
    try {
        const uuid = req.query.uuid;
        const data = await fetchData(uuid);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});