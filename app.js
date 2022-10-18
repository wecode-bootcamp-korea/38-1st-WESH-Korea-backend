require('dotenv').config();
const http = require('http');

const express = require('express');
const morgan = require('morgan');
const cors = require('cors'); 
const {appDataSource} = require('./api/models/moduleDao');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.get('/ping', async (req, res) => {
    res.status(200).json({message: '!! 연결 완료 !!'})
})

const server = http.createServer(app);
const PORT = process.env.PORT;

const start = async () => {  
    await appDataSource.initialize()
    .then(() => {
      console.log("Data Source has been initialized");
    })
    .catch(() => {
      console.log("Errors occurred in Data Source initializing");
      appDataSource.destroy();
    })

  try {
    app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
  } catch (err) {
    console.error(err);
  }
}

start();