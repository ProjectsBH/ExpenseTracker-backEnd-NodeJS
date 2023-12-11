const mysql = require('mysql');

const userTable = 'usertb';
const categoryTable = 'expensecategorytb';
const expensesTb = 'expensestb';
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'expensetrackerdb_api',
});

connection.connect((error) => {
  if (error) {
    //throw error;
    console.error('Error connecting to database: ', error);
  } else {
    console.log('Connected to database');
  }
});

function resultRpst(success = false, message= 'تمت العملية بنجاح', id= null)
    {
        let result = {
            "success": success,
            "message": message,
            "id": id
        };
        return result;
    }

    function getExpenseQuery()
  {
    query ="SELECT exps.*, cate.name categoryName from "+expensesTb+" exps inner join " +categoryTable+" cate on cate.id=exps.categoryId ";
    return query;
  }

//module.exports = connection;
module.exports = {
    connection,
    userTable,
    categoryTable,
    expensesTb,
    resultRpst,
    getExpenseQuery
  };