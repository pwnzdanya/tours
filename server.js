const express = require('express');
require('dotenv').config();
const cors = require('cors');
const router = require('./routes/router');
const sequelize = require('./db');
const errorMiddleware = require('./middlewares/error');

const app = express();

app.use(express.json());
app.use('/api/v1', router);
app.all('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: `cant find ${req.originalUrl} on this server`,
  });
});
app.use(cors());
app.use(errorMiddleware);
const PORT = process.env.PORT || 7777;

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
