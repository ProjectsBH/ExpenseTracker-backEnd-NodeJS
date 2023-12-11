const expensesRpst = require('../data/repository/expensesRpst.js');
const categoryRpst = require('../data/repository/categoryRpst.js');
const { resultRpst } = require('../data/dal.js');

module.exports = {
    getTitle,
    getTop,
    getBy,
    add,
    edit,
    deleteExpense,
  };

function getTitle(callback) {
    return callback("المصروفات");
  }
  
function getTop(callback) {
    topNo = 50;
    expensesRpst.getTop(topNo,(error, results) => {
        if (error) {
            return callback(error, null);
          }
      return callback(null, results);    
    });
  }

  function getBy(id, callback) {
    expensesRpst.getRecord(id,(error, results) => {
        if (error) {
            return callback(error, null);
          } 
      return callback(null, (results.length === 0 ? null : results[0]));    
    });
  }

  function add(expenseMdl,callback) {  
    // التحقق من وجود القيم المطلوبة
  if (!expenseMdl.categoryId || !expenseMdl.theDate || !expenseMdl.amount || !expenseMdl.theStatement) {
    return callback(null, resultRpst(false,'Missing required fields'));
  }
  if (isNaN(Date.parse(expenseMdl.theDate))) {
    return callback(null, resultRpst(false,'Invalid date format'));
  }
     if (expenseMdl.amount < 1) {
        return callback(null, resultRpst(false,'مبلغ العملية غير مقبول'));
      }
      if (expenseMdl.theStatement.length < 4) {
        return callback(null, resultRpst(false,'بيان العملية غير مقبول'));
      }
      // التحقق من وجود رقم الفئة في جدولها
      categoryRpst.getRecord(expenseMdl.categoryId, (error, results) => {
        if (error) {
            return callback(error, null);
          }   else if (results.length === 0) {
            return callback(null, resultRpst(false,'category not found')); 
          } else{
            expensesRpst.add(expenseMdl, (error, results) => {
                if (error) {
                    return callback(error, null);
                }     
                return callback(null, results); 
                });
        }
    });
}

function edit(id,expenseMdl, callback) {
    // التحقق من أن الرقم المستلم هو رقم صحيح
  if (isNaN(id)) {
    return callback(null, resultRpst(false,'Invalid ID', id= id)); 
  }

  if (!expenseMdl.categoryId || !expenseMdl.theDate || !expenseMdl.amount || !expenseMdl.theStatement) {
    return callback(null, resultRpst(false,'Missing required fields'));
  }
  if (isNaN(Date.parse(expenseMdl.theDate))) {
    return callback(null, resultRpst(false,'Invalid date format'));
  }
     if (expenseMdl.amount < 1) {
        return callback(null, resultRpst(false,'مبلغ العملية غير مقبول'));
      }
      if (expenseMdl.theStatement.length < 4) {
        return callback(null, resultRpst(false,'بيان العملية غير مقبول'));
      }
      // التحقق من وجود رقم الفئة في جدولها
      categoryRpst.getRecord(expenseMdl.categoryId, (error, results) => {
        if (error) {
            return callback(error, null);
          }   else if (results.length === 0) {
            return callback(null, resultRpst(false,'category not found')); 
          } else{
            expensesRpst.getRecord(id, (error, results) => {
                if (error) {
                    return callback(error, null);
                }   else if (results.length === 0) {
                    let resultDto = resultRpst(success= false, message= 'expense not found', id= id);
                    return callback(null, resultDto); 
                } else {
                    // الرقم موجود، قم بتعديل السجل
                    expensesRpst.edit(id,expenseMdl,(error, result) => {
                        if (error) {
                            return callback(error, null);
                        }     
                        return callback(null, result); 
                        });                     
                }
            });
        }
    });        
}


  function deleteExpense(id, callback) { 
    expensesRpst.getRecord(id, (error, results) => {
            if (error) {
                return callback(error, null);
              }   else if (results.length === 0) {
                let resultDto = resultRpst(success= false, message= 'expense not found', id= id);
                return callback(null, resultDto); 
              } else {
                // الرقم موجود، قم بحذف السجل                
                expensesRpst.deleteRecord(id, (error, result) => {
                    if (error) {
                        return callback(error, null);
                    }     
                    return callback(null, result); 
                    });                             
            }
        });
  }
  