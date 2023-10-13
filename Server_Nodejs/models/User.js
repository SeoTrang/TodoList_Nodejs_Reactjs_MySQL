const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');
// const Task = require('./Task');

const User = sequelize.define('users', {
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey: true,
    },

    UserName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    Pass:{
        type:DataTypes.STRING,
        allowNull:false
    },
    RefreshToken:{
        type:DataTypes.STRING,
        allowNull:true
    }
});

sequelize.sync()
  .then(() => {
    console.log('Tạo bảng users thành công');
  })
  .catch(err => {
    console.error('Lỗi khi tạo bảng users : ', err);
  });

// User.hasMany(Task);

module.exports = User;