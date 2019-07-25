'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Users', [{
        name: 'John Doe',
        email: 'user1@example.com',
        password: '12345678',
        monthlyBudget: 5000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Alice',
        email: 'user2@example.com',
        password: '12345678',
        monthlyBudget: 4000,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
