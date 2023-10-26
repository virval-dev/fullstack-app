const express = require('express');
const app = express();
const port = 3001;
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

app.use(cors());

// Connect to the SQLite database
const db = new sqlite3.Database('database.db');

// Create the database table if not exists already
db.serialize(() => {
    db.run(
        "CREATE TABLE IF NOT EXISTS stock_table (id INT PRIMARY KEY, name TEXT)"
    );
});

// Middleware to parse JSON requests
app.use(express.json());



// Define your API endpoints
app.get('/', (req, res) => {
    res.send('Welcome to your Express.js API.');
});

app.get('/api/data', (req, res) => {
    db.all('SELECT * FROM stock_table', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        };
        res.json({ data: rows });
    });
});

app.post('/api/data', (req, res) => {
    const { name } = req.body;
    db.run('INSERT INTO stock_table (name) VALUES (?)', [name], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        };
        res.json({ message: 'Data added succesfully', id: this.lastID });
    });
});

app.listen(port, () => {
    console.log(`Backend is running on http://localhost:${port}`);
});