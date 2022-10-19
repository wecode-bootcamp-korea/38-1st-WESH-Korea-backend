require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors'); 
const { insertData } = require("./api/utils/insertData");

const {appDataSource} = require('./api/models/appDataSource');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.get('/ping', async (req, res) => {
    res.status(200).json({message: '!! 연결 완료 !!'})
})

app.post("", async(req, res)=>{
   try{ 
    await insertData(req, res);
    res.status(200).json({ message: "insert completed" });
    } catch (err) {
    console.error(err);
    }
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