'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Records', [{
      name: "午餐",
      amount: 200,
      category: "餐飲食品",
      date: "2019-05-05",
      createdAt: new Date(),
      updatedAt: new Date(),
      UserId: 1
    },
    {
      name: "水電費",
      amount: 1800,
      category: "家居物業",
      date: "2019-04-05",
      createdAt: new Date(),
      updatedAt: new Date(),
      UserId: 1
    },
    {
      name: "交通卡",
      amount: 1280,
      category: "交通出行",
      date: "2019-05-08",
      createdAt: new Date(),
      updatedAt: new Date(),
      UserId: 1
    },
    {
      name: "看電影",
      amount: 300,
      category: "休閒娛樂",
      date: "2019-04-05",
      createdAt: new Date(),
      updatedAt: new Date(),
      UserId: 1
    },
    {
      name: "買彩券",
      amount: 200,
      category: "其他",
      date: "2019-06-20",
      createdAt: new Date(),
      updatedAt: new Date(),
      UserId: 1
    },
    {
      name: "晚餐",
      amount: 400,
      category: "餐飲食品",
      date: "2019-05-05",
      createdAt: new Date(),
      updatedAt: new Date(),
      UserId: 2
    },
    {
      name: "水電費",
      amount: 1800,
      category: "家居物業",
      date: "2019-04-05",
      createdAt: new Date(),
      updatedAt: new Date(),
      UserId: 2
    },
    {
      name: "交通卡",
      amount: 1280,
      category: "交通出行",
      date: "2019-05-08",
      createdAt: new Date(),
      updatedAt: new Date(),
      UserId: 2
    },
    {
      name: "看電影",
      amount: 300,
      category: "休閒娛樂",
      date: "2019-04-05",
      createdAt: new Date(),
      updatedAt: new Date(),
      UserId: 2
    },
    {
      name: "買彩券",
      amount: 200,
      category: "其他",
      date: "2019-06-20",
      createdAt: new Date(),
      updatedAt: new Date(),
      UserId: 2
    }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('People', null, {});
  }
};
