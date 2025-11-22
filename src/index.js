require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const logger = require('./utils/logger');
const { sequelize } = require('../models');

const authRoutes = require('./routes/auth');
const employeeRoutes = require('./routes/employees');
const teamRoutes = require('./routes/teams');
const logRoutes = require('./routes/logs');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => res.json({ ok: true, message: 'HRMS API' }));

app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/logs', logRoutes);
app.use("/api/dashboard", require("./routes/dashboard"));


// error handler
app.use((err, req, res, next) => {
  logger.error(err.stack || err.message || err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await sequelize.authenticate();
    logger.info('DB connection OK');
    app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
  } catch (e) {
    logger.error('Unable to start server', e);
    process.exit(1);
  }
}

start();

