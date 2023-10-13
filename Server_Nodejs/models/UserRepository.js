const User = require('../models/User');

const UserRepository = {
  createUser: async (userData) => {
    try {
      console.log(userData);
      await User.create(userData);
      return true;
    } catch (error) {
      console.error('Lỗi khi tạo người dùng:', error);
      return false;
    }
  },

  updateUser: async (userId, updatedUserData) => {
    try {
      console.log(updatedUserData);
      console.log(userId);
      const [updated] = await User.update(updatedUserData, { where: { id: userId } });
      if (updated === 1) {
        return true;
      } else {
        console.error('Không tìm thấy người dùng hoặc lỗi khi cập nhật.');
        return false;
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật người dùng:', error);
      return false;
    }
  },

  deleteUser: async (userId) => {
    try {
      const deletedCount = await User.destroy({ where: { id: userId } });
      if (deletedCount === 1) {
        return true;
      } else {
        console.error('Không tìm thấy người dùng hoặc lỗi khi xóa.');
        return false;
      }
    } catch (error) {
      console.error('Lỗi khi xóa người dùng:', error);
      return false;
    }
  },

  findUserById: async (userId) => {
    try {
      const user = await User.findByPk(userId);
      if (user) {
        return user;
      } else {
        console.error('Không tìm thấy người dùng với ID đã cho.');
        return null;
      }
    } catch (error) {
      console.error('Lỗi khi tìm người dùng theo ID:', error);
      return null;
    }
  },

  findUserByName: async (userName) => {
    try {
      const user = await User.findOne({
        where:{
          UserName: userName
        }
      });
      if (user) {
        return user;
      } else {
        console.error('Không tìm thấy người dùng với ID đã cho.');
        return null;
      }
    } catch (error) {
      console.error('Lỗi khi tìm người dùng theo ID:', error);
      return null;
    }
  },


}

module.exports = UserRepository;
