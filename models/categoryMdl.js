class CategoryMdl {
    constructor(name, isLimitAmount, limitAmount, userId) {
      this.name = name;
      this.isLimitAmount = isLimitAmount;
      this.limitAmount = limitAmount;
      this.userId = userId;
    }
  }

  module.exports = CategoryMdl;