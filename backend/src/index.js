const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('./db/mongoose'); // connect to the database

// Express setup
const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_PARSER_SECRET));

// Cors setup
const corsOptions = {
  origin: process.env.FRONTEND_ORIGIN,
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

// Logging middleware
app.use((req, res, next) => {
  const m = new Date();
  const dateString =
    m.getUTCFullYear() +
    '/' +
    ('0' + (m.getUTCMonth() + 1)).slice(-2) +
    '/' +
    ('0' + m.getUTCDate()).slice(-2) +
    ' ' +
    ('0' + m.getUTCHours()).slice(-2) +
    ':' +
    ('0' + m.getUTCMinutes()).slice(-2) +
    ':' +
    ('0' + m.getUTCSeconds()).slice(-2);
  console.log(`${req.method}:${req.originalUrl}\tTime: ${dateString}`);
  next();
});

// Routers setup
const playersRouter = require('./routes/player');
app.use('/api/players', playersRouter);
const usersRouter = require('./routes/user');
app.use('/api/users/', usersRouter);
const teamsRouter = require('./routes/team');
app.use('/api/teams/', teamsRouter);

// Server setup
app.listen(port, () => {
  console.log(`fut-browser-api is listening at port ${port}`);
});
