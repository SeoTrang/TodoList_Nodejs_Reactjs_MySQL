const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Task = sequelize.define("tasks",{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey: true,
    },
    TaskName:{
        type:DataTypes.STRING,
        allowNull:false
    },

    State:{
        type:DataTypes.INTEGER,
        allowNull:true,
        defaultValue:0
    },
    

})

// Define the foreign key relationship in the Task model
Task.belongsTo(User, {
    foreignKey: 'UserId', // This specifies the foreign key column name
    
});

// Task.belongsTo(User); // Một Task thuộc về một User

sequelize.sync()
  .then(() => {
    console.log('Tạo bảng Tasks thành công');
  })
  .catch(err => {
    console.error('Lỗi khi tạo bảng Tasks:', err);
  });

module.exports = Task;