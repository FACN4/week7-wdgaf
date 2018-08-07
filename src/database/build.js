const fs = require('fs');
const dbConnection = require('src/database/dbconnection');

const file = fs.readFileSync(__dirname+'src/database/build.sql','utf-8');

dbConnection.query(file,(error,result)=>{
  if(error){
    console.log('Error',error);
  }else{
    console.log('success');
  }
});
