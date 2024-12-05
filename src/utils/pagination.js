const handlePagination = async (model, page, limit, sort) => {
    const skip = (page - 1) * limit;
    return await model.find().sort(sort).skip(skip).limit(limit);
  };
  
  module.exports = { handlePagination };
  