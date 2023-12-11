const express = require('express');
const app = express();
const responseResult = require('./responseResult.js');
//const categoryRpst = require('./data/repository/categoryRpst.js');
const categoryUC = require('./useCase/categoryUC.js');
const CategoryMdl = require('./models/categoryMdl.js');

app.use(express.json());

// start category
app.get('/category/getTitle', function (req, res) {
    const operation_type="get";
    categoryUC.getTitle((title) => {
        responseResult.CheckResultSuccessValue(res,title,operation_type);
    });
});

app.get('/category', function (req, res) {
    const operation_type="get";
    categoryUC.getAll((error, results) => {
        responseResult.CheckResultSuccess(res, error, results,operation_type);
    });
 });

 app.get('/category/valueId', function (req, res) {
    const operation_type="get";
    categoryUC.getValueId((error, results) => {
        responseResult.CheckResultSuccess(res, error, results,operation_type);
    });
 });
 
 // Endpoint لإنشاء عنصر جديد
app.post('/category', (req, res) => {
    const oper_type="add";
    if (!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('isLimitAmount')
    || !req.body.hasOwnProperty('limitAmount')|| !req.body.hasOwnProperty('userId')) {
        let result = responseResult.getResponseError("444",'Missing required fields',oper_type);
      responseResult.getStatus400(res,result);
        return;
      }
    //const name = req.body.name;
    const { name, isLimitAmount,limitAmount, userId } = req.body;
    let newCategory = new CategoryMdl(name,isLimitAmount,limitAmount,userId);
    
    categoryUC.add(newCategory,(error, result) => {
        responseResult.CheckResultSuccessAED(res,error, result,oper_type);
    });

});

// Endpoint لتحديث عنصر موجود
app.put('/category/:id', (req, res) => {   
    const operation_type="edit";    
    if (!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('isLimitAmount')
    || !req.body.hasOwnProperty('limitAmount')) {
        let result = responseResult.getResponseError("444",error_message='Missing required fields',operation_type);
        return responseResult.getStatus400(res,result);
      }
    const { id } = req.params;
    const { name, isLimitAmount,limitAmount } = req.body;
    let category = new CategoryMdl(name,isLimitAmount,limitAmount,0);   
    categoryUC.edit(id,category,(error, result) => {
        responseResult.CheckResultSuccessAED(res,error, result,operation_type);
    });

});
// Endpoint لحذف عنصر موجود
app.delete('/category/:id', (req, res) => {
    const { id } = req.params;
    const operation_type="delete";
    categoryUC.deleteCategory(id,(error, result) => {
        responseResult.CheckResultSuccessAED(res,error, result,operation_type);
    });
   
  });
 // end category
 
 // start expenses
const expenseUC = require('./useCase/expenseUC.js');
const ExpensesMdl = require('./models/expensesMdl.js');
app.get('/expenses/getTitle', function (req, res) {
    const oper_type="get";
    expenseUC.getTitle((title) => {
        responseResult.CheckResultSuccessValue(res,title,oper_type);
    });
});

app.get('/expenses', function (req, res) {
    const operation_type="get";
    expenseUC.getTop((error, results) => {
        responseResult.CheckResultSuccess(res, error, results,operation_type);
    });
 });

 app.get('/expenses/:id', function (req, res) {
    const { id } = req.params;
    const operation_type="get";
    expenseUC.getBy(id,(error, results) => {
        responseResult.CheckResultSuccess(res, error, results,operation_type);
    });
 });

 app.post('/expenses', (req, res) => {
    const oper_type="add";
    if (!req.body.hasOwnProperty('categoryId') || !req.body.hasOwnProperty('theDate')
    || !req.body.hasOwnProperty('amount') || !req.body.hasOwnProperty('theStatement')
    || !req.body.hasOwnProperty('userId')) {
        let result = responseResult.getResponseError("444",'Missing required fields',oper_type);
      responseResult.getStatus400(res,result);
        return;
      }
    const { categoryId, theDate, amount, theStatement, userId} = req.body;
    let newExpense = new ExpensesMdl(categoryId, theDate, amount, theStatement, userId);
    
    expenseUC.add(newExpense,(error, result) => {
        responseResult.CheckResultSuccessAED(res,error, result,oper_type);
    });

});

app.put('/expenses/:id', (req, res) => {   
    const operation_type="edit";    
    if (!req.body.hasOwnProperty('categoryId') || !req.body.hasOwnProperty('theDate')
    || !req.body.hasOwnProperty('amount') || !req.body.hasOwnProperty('theStatement')) {
        let result = responseResult.getResponseError("444",error_message='Missing required fields',operation_type);
        return responseResult.getStatus400(res,result);
      }
    const { id } = req.params;
    const { categoryId, theDate, amount, theStatement} = req.body;
    let expense = new ExpensesMdl(categoryId, theDate, amount, theStatement,0);   
    expenseUC.edit(id,expense,(error, result) => {
        responseResult.CheckResultSuccessAED(res,error, result,operation_type);
    });

});

app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const operation_type="delete";
    expenseUC.deleteExpense(id,(error, result) => {
        responseResult.CheckResultSuccessAED(res,error, result,operation_type);
    });
   
  });
// end expenses


// start expensesReport
const expensesReportRpst = require('./data/repository/expensesReportRpst.js');
app.get('/expensesReport/getTitle', function (req, res) {
    const oper_type="get";
    expensesReportRpst.getTitle((title) => {
        responseResult.CheckResultSuccessValue(res,title,oper_type);
    });
});

app.get('/expensesReport/getByCategoryId/:id', function (req, res) {
    const { id } = req.params;
    const operation_type="get";
    expensesReportRpst.getByCategoryId(id,(error, results) => {
        responseResult.CheckResultSuccess(res, error, results,operation_type);
    });
 });

 
 app.get('/expensesReport/getByCategoryIdDates', function (req, res) {
    const operation_type="get";
    if (!req.query.hasOwnProperty('categoryId') || !req.query.hasOwnProperty('fromDate') 
    || !req.query.hasOwnProperty('toDate')) {
        let result = responseResult.getResponseError("444",error_message='Missing required fields',operation_type);
        return responseResult.getStatus400(res,result);
      }
      let { categoryId, fromDate, toDate } = req.query;

    if (isNaN(Date.parse(fromDate)) || isNaN(Date.parse(toDate))) {
        let result = responseResult.getResponseError("444",'Invalid date format',operation_type);
        return responseResult.getStatus400(res,result);
      }
      // تنسيق التاريخ بتنسيق "Y-m-d"
      fromDate = formatDate(fromDate);
  toDate = formatDate(toDate);

   
    expensesReportRpst.getByCategoryIdDates(categoryId,fromDate,toDate,(error, results) => {
        responseResult.CheckResultSuccess(res, error, results,operation_type);
    });
 });

 app.get('/expensesReport/getByDates', function (req, res) {
    const operation_type="get";
    if (!req.query.hasOwnProperty('fromDate') || !req.query.hasOwnProperty('toDate')) {
        let result = responseResult.getResponseError("444",error_message='Missing required fields',operation_type);
        return responseResult.getStatus400(res,result);
      }
    let {fromDate, toDate } = req.query;

    if (isNaN(Date.parse(fromDate)) || isNaN(Date.parse(toDate))) {
        let result = responseResult.getResponseError("444",'Invalid date format',operation_type);
        return responseResult.getStatus400(res,result);
      }
      // تنسيق التاريخ بتنسيق "Y-m-d"
      fromDate = formatDate(fromDate);
  toDate = formatDate(toDate);
  

//   let result={"fromDate":fromDate,"toDate":toDate};
//     return responseResult.CheckResultSuccess(res, null, result,operation_type);
    expensesReportRpst.getByDates(fromDate,toDate,(error, results) => {
        responseResult.CheckResultSuccess(res, error, results,operation_type);
    });
 });


  
  // دالة لتنسيق التاريخ بتنسيق "Y-m-d"
  function formatDate(date) {
    const parts = date.split('/');
const day = parts[1];
const month = parts[0];
const yearAndTime = parts[2];
const yearAndTimeParts = yearAndTime.split(' ');
const year = yearAndTimeParts[0];
const time = yearAndTimeParts[1];
const formattedDate = `${year}-${month}-${day} ${time}`;
return formattedDate;
    // const [month,day, year] = date.split('/');
    // return `${year}-${month}-${day}`;
  }
// end expensesReport


 // start auth
 const authUC = require('./useCase/authUC.js');
 app.post('/auth/login', (req, res) => {
    const oper_type="get";
    if (!req.body.hasOwnProperty('userName') || !req.body.hasOwnProperty('password')) {
        let result = responseResult.getResponseError("444",'Missing required fields',oper_type);
      responseResult.getStatus400(res,result);
        return;
      }
    const { userName, password } = req.body;    
    authUC.getLogin(userName, password,(error, result) => {
        responseResult.CheckResultSuccess(res,error, result,oper_type);
    });
});

 // Endpoint لإنشاء عنصر جديد
app.post('/auth/signUp', (req, res) => {
    const oper_type="add";
    if (!req.body.hasOwnProperty('userName') || !req.body.hasOwnProperty('email')
    || !req.body.hasOwnProperty('password')|| !req.body.hasOwnProperty('confirmPassword')) {
        let result = responseResult.getResponseError("444",'Missing required fields',oper_type);
      responseResult.getStatus400(res,result);
        return;
      }
    const { userName, email, password,confirmPassword } = req.body;    
    authUC.signUp(userName, email, password ,confirmPassword,(error, result) => {
        responseResult.CheckResultSuccessAED(res,error, result,oper_type);
    });

});
 // end auth


 app.get('/values/contact', function (req, res) {
    res.status(200).json(true);
});
const port = 3000;
//app.use(express.json());
 var server = app.listen(port, function () {
    //var host = server.address().address
    //var port = server.address().port
    console.log('I am listening in port: %s',port);
 })