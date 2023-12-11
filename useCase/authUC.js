const userRpst = require('../data/repository/userRpst.js');
const { resultRpst } = require('../data/dal.js');

module.exports = {
    getLogin,
    signUp
  };

  function signUp(userName, email, password,confirmPassword, callback) {  
    if (password !== confirmPassword) {
        return callback(null, resultRpst(false,'كلمة المرور لا تساوي تأكيدها'));
      }
      userRpst.getDuplicate(userName, password, (error, results) => {
        if (error) {
            return callback(error, null);
          } else if (results.length > 0) {
            let resultDto = resultRpst(success= false, message= 'سياسة النظام لا تسمح بهذه البيانات');
            return callback(null, resultDto); 
          } else {
            userRpst.signUp(userName, password, email, (error, results) => {
                if (error) {
                    return callback(error, null);
                }     
                return callback(null, results); 
                });      
    }
    }); 
}

  function getLogin(userName, password, callback) {
    userRpst.login(userName, password,(error, results) => {
        if (error) {
            return callback(error, null);
          } else if (results.length === 0) {
            let resultDto = resultRpst(success= false, message= 'بيانات المستخدم غير صحيحة');
            return callback(null, resultDto);  
          }
          else     
            return callback(null, results[0]);    
    });
  }