
const fs=require("fs");
const { appDataSource } = require("../models/appDataSource");

const insertData = async (req, res) => {
  const { fileName } = req.body;

    await fs.readFile(`./datacsv/${fileName}.csv`, "utf-8", (err, data) => {
      const splited = data.split("\r\n");
      console.log(splited.length); 
       for (let i = 1; i<splited.length; i++) {

        const resplited = splited[i].split(",");

        for (let j = 0; j < resplited.length; j++) {
          if (!isNaN(Number(resplited[j]))) {
            resplited[j] = Number(resplited[j]);
          } else {
            resplited[j] = '"' + resplited[j] + '"';
          }
        }
        appDataSource.query(
          "INSERT INTO " +
            fileName +
            " (" +
            splited[0] +
            ") VALUES (" +
            resplited.join(",") +
            ");"
        );
      }
    }
    )
  }
   


module.exports={insertData};
