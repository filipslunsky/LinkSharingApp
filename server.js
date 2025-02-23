const express = require('express');
const cors = require('cors');
const path = require('path');

const usersRouter = require('./routes/usersRouter.js');
const linksRouter = require('./routes/linksRouter.js');

const PORT = 3001;

const app = express();

app.use(cors());
app.use(express.json());

// Ignore favicon requests to prevent UUID errors
app.get('/favicon.ico', (req, res) => res.status(204));

app.use('/user', usersRouter);
app.use('/links', linksRouter);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', (req, res, next) => {
    console.log(`Requesting file: ${req.url}`);
    next();
});

app.use(express.static(path.join(__dirname, "client", "dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
