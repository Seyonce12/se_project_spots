const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const routes = require('./routes');
const { requestLogger, errorLogger } = require('./logger');
const errorHandler = require('./middlewares/errorHandler');

require('dotenv').config();
const app = express();
const { PORT = 3001 } = process.env;

app.use(helmet());
app.use(express.json());
app.use(requestLogger);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

mongoose.connect('mongodb://localhost:27017/wtwr_db');

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
