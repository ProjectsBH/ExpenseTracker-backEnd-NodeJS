const { connection,expensesTb,getExpenseQuery,resultRpst } = require('../dal.js');

function add(newExpense,callback) { 
    connection.query('INSERT INTO '+expensesTb+' (categoryId,theDate, amount,theStatement,created_by) VALUES (?,?,?,?,?)'
    , [newExpense.categoryId, newExpense.theDate, newExpense.amount, newExpense.theStatement,newExpense.userId], (err, result) => {
      if (err) {
        return callback(err, null);
        
      } 
      let resultDto = resultRpst(success= true, message= 'تمت عملية الإضافة بنجاح', id= result.insertId);
      return callback(null,resultDto);
    });

}

function edit(id, newExpense, callback) {  
    connection.query('UPDATE '+expensesTb+' SET categoryId = ?, theDate = ?, amount = ?,theStatement=? WHERE id = ?'
    , [newExpense.categoryId, newExpense.theDate, newExpense.amount, newExpense.theStatement, id], (err, result) => {
      if (err) {
          let resultDto = resultRpst(success= false, message= 'فشلت عملية التحديث', id= id);
          return callback(err,resultDto);
      }
  
      if (result.affectedRows === 0) {
          let resultDto = resultRpst(success= false, message= 'لم يتم تحديث أي سجل');
          return callback(null,resultDto);
      }
      return callback(null,resultRpst(success= true, message= 'تمت عملية التحديث بنجاح'));
    });
  }
  
  function deleteRecord(id,callback) {  
    connection.query('DELETE FROM '+expensesTb+' WHERE id = ?', [id], (err, result) => {
      if (err) {
          let resultDto = resultRpst(success= false, message= 'فشلت عملية الحذف');
          return callback(err,resultDto);
         
      }
  
      if (result.affectedRows === 0) {
          let resultDto = resultRpst(success= false, message= 'لم يتم حذف أي سجل');
          return callback(null,resultDto);
      }
      let resultDto = resultRpst(success= true, message= 'تمت عملية الحذف بنجاح');
      return callback(null,resultDto);
    });
  }

function getTop(topNo = 50, callback) {
    const query = getExpenseQuery()+" order by created_in desc LIMIT ?";
    connection.query(query,topNo, (err, results) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }
      return callback(null, results);    
    });
  }

  function checkCategoryIdHasExpenses(categoryId, callback) {
    const query = "SELECT * FROM "+expensesTb+" Where categoryId=? order by created_in desc Limit 1";
    connection.query(query,categoryId, (err, results) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }
      return callback(null, results);    
    });
  }

  function getRecord(id,callback) {
    const query = getExpenseQuery()+" where exps.id= ?";
    connection.query(query,id, (err, results) => {
      if (err) {
        return callback(err, null);
      }      
        return callback(null, results);
    });
  }

//   function getExpenseQuery()
//   {
//     query ="SELECT exps.*, cate.name categoryName from "+expensesTb+" exps inner join " +categoryTable+" cate on cate.id=exps.categoryId ";
//     return query;
//   }

module.exports = {
    getRecord,
    add,
    getTop,
    edit,
    deleteRecord,
    checkCategoryIdHasExpenses
  };