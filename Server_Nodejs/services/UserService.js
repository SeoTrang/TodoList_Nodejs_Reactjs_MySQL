const UserRepository = require('../models/UserRepository');

const UserService = {
  createUser: async (userData) => {
    try {
      await UserRepository.createUser(userData);
      return true;
    } catch (error) {
      console.error('Lỗi khi tạo người dùng:', error);
      return false;
    }
  },

  updateUser: async (userId, updatedUserData) => {
    try {
      await UserRepository.updateUser(userId, updatedUserData);
      return true;
    } catch (error) {
      console.error('Lỗi khi cập nhật người dùng:', error);
      return false;
    }
  },

  deleteUser: async (userId) => {
    try {
      await UserRepository.deleteUser(userId);
      return true;
    } catch (error) {
      console.error('Lỗi khi xóa người dùng:', error);
      return false;
    }
  },

  findUserById: async (userId) => {
    try {
      const user = await UserRepository.findUserById(userId);
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
      const user = await UserRepository.findUserByName(userName);
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

  // Các phương thức khác liên quan đến logic kinh doanh của ứng dụng
}

module.exports = UserService;
