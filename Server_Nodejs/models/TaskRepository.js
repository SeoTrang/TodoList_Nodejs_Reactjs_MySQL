const Task = require('./Task');

const TaskRepository = {
  createTask: async (taskData) => {
    try {
      await Task.create(taskData);
      return true;
    } catch (error) {
      console.error('Lỗi khi tạo Task:', error);
      return false;
    }
  },

  updateTask: async (taskId, updatedTaskData) => {
    try {
      const [updated] = await Task.update(updatedTaskData, { where: { id: taskId } });
      if (updated === 1) {
        return true;
      } else {
        console.error('Không tìm thấy Task hoặc lỗi khi cập nhật.');
        return false;
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật Task:', error);
      return false;
    }
  },

  deleteTask: async (taskId) => {
    try {
      const deletedCount = await Task.destroy({ where: { id: taskId } });
      if (deletedCount === 1) {
        return true;
      } else {
        console.error('Không tìm thấy Task hoặc lỗi khi xóa.');
        return false;
      }
    } catch (error) {
      console.error('Lỗi khi xóa Task:', error);
      return false;
    }
  },

  findTaskById: async (taskId) => {
    try {
      const task = await Task.findOne({ where: { id: taskId } });
      return task;
    } catch (error) {
      console.error('Lỗi khi tìm kiếm Task:', error);
      return null;
    }
  },

  findAllTasksByUserId: async (userId) => {
    try {
      const tasks = await Task.findAll({ where: { UserId: userId } });
      return tasks;
    } catch (error) {
      console.error('Lỗi khi tìm kiếm tất cả Tasks của người dùng:', error);
      return null;
    }
  }
}

module.exports = TaskRepository;
