require('dotenv').config();

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

const PORT = process.env.PORT;

const start = async () => {
  try {
      app.listen(PORT, ()=> console.log(`server listening on port ${PORT}`));
  }
  catch(err){
      console.error(err);
  }
};


start();