const { connection,userTable,resultRpst } = require('../dal.js');

function signUp(userName, password, email, callback) {  
    connection.query('INSERT INTO '+userTable+' (userName, password,email,created_in) VALUES (?,?,?,?)'
    , [userName, password,email, new Date()], (err, result) => {
      if (err) {
        return callback(err, null);
      } 
      let resultDto = resultRpst(success= true, message= 'تمت عملية الإضافة بنجاح', id= result.insertId);
      return callback(null,resultDto);
    });

}

function getDuplicate(userName,password,callback) {
    let query = 'SELECT * FROM '+userTable+' WHERE userName = ? or (userName = ? and password = ?)';
    connection.query(query,[userName,userName, password], (err, results) => {
      if (err) {
        return callback(err, null);
      }      
        return callback(null, results);
    });
  }

function login(userName, password,callback) {
    let query = 'SELECT * FROM '+userTable+' WHERE userName = ? and password = ?';
    connection.query(query,[userName,password], (err, results) => {
      if (err) {
        return callback(err, null);
      }      
        return callback(null, results);
    });
  }

  module.exports = {
    signUp,
    login,
    getDuplicate
  };