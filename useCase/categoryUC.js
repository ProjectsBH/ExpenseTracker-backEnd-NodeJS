const categoryRpst = require('../data/repository/categoryRpst.js');
const expensesRpst = require('../data/repository/expensesRpst.js');
const { resultRpst } = require('../data/dal.js');

module.exports = {
    getTitle,
    getAll,
    add,
    edit,
    deleteCategory,
    getValueId
  };

  function getTitle(callback) {
    return callback("فئات المصروفات");
  }
  
  function getAll(callback) {
    categoryRpst.getAll((error, results) => {
        if (error) {
            return callback(error, null);
          }      
      results.forEach(item => {
        item.isLimitAmount = Boolean(item.isLimitAmount); // تحويل القيمة إلى بيان boolean
        item["isLimitAmountName"] = Boolean(item.isLimitAmount)===true ? "موجود" :"لا يوجد";
      });
      return callback(null, results);    
    });
  }

  function getValueId(callback) {
    categoryRpst.getValueId((error, results) => {
        if (error) {
            return callback(error, null);
          }      
      return callback(null, results);    
    });
  }

  function add(newCategory,callback) {  
    if (newCategory.isLimitAmount == true && newCategory.limitAmount < 1) {
        return callback(null, resultRpst(false,'مبلغ الحد غير مقبول'));
      }
      categoryRpst.getForExists(newCategory.name ,null, (error, results) => {
        if (error) {
            return callback(error, null);
          } else if (results.length > 0) {
            let resultDto = resultRpst(success= false, message= 'الفئة مكررة');
            return callback(null, resultDto); 
          } else {
            categoryRpst.add(newCategory, (error, results) => {
                if (error) {
                    return callback(error, null);
                }     
                return callback(null, results); 
                });      
    }
    }); 
}

function edit(id,category, callback) {
    // التحقق من أن الرقم المستلم هو رقم صحيح
  if (isNaN(id)) {
    return callback(null, resultRpst(false,'Invalid ID', id= id)); 
  }

  if (category.isLimitAmount == true && category.limitAmount < 1) {
    return callback(null, resultRpst(false,'مبلغ الحد غير مقبول'));
  }

    categoryRpst.getRecord(id, (error, results) => {
        if (error) {
            return callback(error, null);
          }   else if (results.length === 0) {
            let resultDto = resultRpst(success= false, message= 'category not found', id= id);
            return callback(null, resultDto); 
          } else {
            // الرقم موجود، قم بتعديل السجل
            categoryRpst.getForExists(category.name ,id, (error, result) => {
                if (error) {
                    return callback(error, null);
                  } else if (result.length > 0) {
                    let resultDto = resultRpst(success= false, message= 'الفئة مكررة');
                    return callback(null, resultDto); 
                  } else {
                    // الفئة غير مكرة، قم بتعديل السجل
                        categoryRpst.edit(id,category,(error, result) => {
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


  function deleteCategory(id, callback) { 
        categoryRpst.getRecord(id, (error, results) => {
            if (error) {
                return callback(error, null);
              }   else if (results.length === 0) {
                let resultDto = resultRpst(success= false, message= 'category not found', id= id);
                return callback(null, resultDto); 
              } else {
                // الرقم موجود، قم بحذف السجل
                expensesRpst.checkCategoryIdHasExpenses(id, (error, results) => {
                    if (error) {
                        return callback(error, null);
                      }   else if (results.length > 0) {
                        let resultDto = resultRpst(success= false, message= 'رقم الفئة مرتبطة بعمليات', id= id);
                        return callback(null, resultDto); 
                      } else {
                            // الرقم غيرمرتبط بعمليات، قم بحذف السجل
                            categoryRpst.deleteRecord(id, (error, result) => {
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
