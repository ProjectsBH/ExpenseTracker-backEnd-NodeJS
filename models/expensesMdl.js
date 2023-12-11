
class ExpensesMdl {
    constructor(categoryId, theDate, amount, theStatement, userId) {
      this.categoryId = categoryId;
      this.theDate = theDate;
      this.amount = amount;
      this.theStatement=theStatement;
      this.userId = userId;
    }
  }

  module.exports = ExpensesMdl;