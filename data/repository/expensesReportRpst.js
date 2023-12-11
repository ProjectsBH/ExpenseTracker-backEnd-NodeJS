
const { connection,getExpenseQuery } = require('../dal.js');

module.exports = {
    getTitle,
    getByCategoryId,
    getByCategoryIdDates,
    getByDates
  };

  function getByCategoryId(id,callback) {
    const query = getExpenseQuery()+" where categoryId= ?";
    connection.query(query,id, (err, results) => {
      if (err) {
        return callback(err, null);
      }      
        return callback(null, results);
    });
  }

  function getByCategoryIdDates(categoryId,formDate,toDate,callback) {
    const query = getExpenseQuery()+" where categoryId=? and theDate Between ? and  ?";
    connection.query(query,[categoryId,formDate,toDate], (err, results) => {
      if (err) {
        return callback(err, null);
      }      
        return callback(null, results);
    });
  }

  function getByDates(formDate,toDate,callback) {
    const query = getExpenseQuery()+" where theDate Between ? and  ?";
    connection.query(query,[formDate,toDate], (err, results) => {
      if (err) {
        return callback(err, null);
      }      
        return callback(null, results);
    });
  }

  function getTitle(callback) {
    return callback("تقرير المصوفات");
  }