
const { connection,categoryTable,resultRpst } = require('../dal.js');
//let newCategory = require('../../models/categoryMdl.js');



function add(newCategory,callback) {  
    const getMaxIdQuery = 'SELECT MAX(id) as maxId FROM '+categoryTable;
  connection.query(getMaxIdQuery, (error, results) => {
    if (error) {
    return callback(err, null);
    } else {
      const maxId = results[0].maxId || 0; // يرجع القيمة المستردة أو الصفر إذا كان الجدول فارغًا
      let id = maxId + 1;
    connection.query('INSERT INTO '+categoryTable+' (id,name, isLimitAmount,limitAmount,created_by) VALUES (?,?, ?,?,?)'
    , [id, newCategory.name, newCategory.isLimitAmount, newCategory.limitAmount,newCategory.userId], (err, result) => {
      if (err) {
        return callback(err, null);
        
      } 
      let resultDto = resultRpst(success= true, message= 'تمت عملية الإضافة بنجاح', id= id);
      return callback(null,resultDto);
    });
}
});
}
  
  function edit(id, newCategory, callback) {  
    connection.query('UPDATE '+categoryTable+' SET name = ?, isLimitAmount = ?,limitAmount=? WHERE id = ?'
    , [newCategory.name, newCategory.isLimitAmount, newCategory.limitAmount, id], (err, result) => {
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
    connection.query('DELETE FROM '+categoryTable+' WHERE id = ?', [id], (err, result) => {
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
  
  function getAll(callback) {
    const query = "SELECT *, CASE WHEN isLimitAmount = 1 THEN true ELSE false END AS isLimitAmount FROM "+categoryTable;
    connection.query(query, (err, results) => {
      if (err) {
        console.error(err);
        //let dd= { error: 'Failed to retrieve items' };
        return callback(err, null);
      }
      return callback(null, results);    
    });
  }

  function getValueId(callback) {
    const query = "SELECT id,name FROM "+categoryTable;
    connection.query(query, (err, results) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }
      return callback(null, results);    
    });
  }

  function getRecord(id,callback) {
    const query = `SELECT * FROM ${categoryTable} WHERE id = ${id}`;
    connection.query(query, (err, results) => {
      if (err) {
        return callback(err, null);
      }      
        return callback(null, results);
    });
  }

  function getForExists(name,id,callback) {
    let query = 'SELECT * FROM '+categoryTable+' WHERE name = ? and id != ?';
    connection.query(query,[name,id], (err, results) => {
      if (err) {
        return callback(err, null);
      }      
        return callback(null, results);
    });
  }

  module.exports = {
    getRecord,
    add,
    getAll,
    edit,
    deleteRecord,
    getForExists,
    getValueId
  };