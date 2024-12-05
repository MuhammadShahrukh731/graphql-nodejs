const Employee = require('../models/Employee');
const { handlePagination } = require('../utils/pagination');

const resolvers = {
  Query: {
    listEmployees: async (_, { page = 1, limit = 10, sort = 'name' }) => {
      const employees = await handlePagination(Employee, page, limit, sort);
      return employees;
    },
    getEmployee: async (_, { id }) => await Employee.findById(id),
  },
  Mutation: {
    addEmployee: async (_, args) => {
      const newEmployee = new Employee(args);
      return await newEmployee.save();
    },
    updateEmployee: async (_, { id, ...updates }) => {
      return await Employee.findByIdAndUpdate(id, updates, { new: true });
    },
  },
};

module.exports = resolvers;
