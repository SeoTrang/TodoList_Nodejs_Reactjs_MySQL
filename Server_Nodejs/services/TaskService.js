const TaskRepository = require('../models/TaskRepository');

const TaskService = {
  createTask: async (taskData) => {
    return TaskRepository.createTask(taskData);
  },

  updateTask: async (taskId, updatedTaskData) => {
    return TaskRepository.updateTask(taskId, updatedTaskData);
  },

  deleteTask: async (taskId) => {
    return TaskRepository.deleteTask(taskId);
  },

  findTaskById: async (taskId) => {
    return TaskRepository.findTaskById(taskId);
  },

  findAllTasksByUserId: async (userId) => {
    return TaskRepository.findAllTasksByUserId(userId);
  }
};

module.exports = TaskService;
