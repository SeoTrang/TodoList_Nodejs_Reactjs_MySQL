const TaskService = require('../services/TaskService');

const TaskController = {
  CreateTask: async (req, res) => {
    const taskData = req.body.data;
    console.log(req.body.decode.id);
    console.log(taskData);
    let UserId = req.body.decode.id;
    if(!UserId || !taskData) return res.status(400).json("missing data")
    let Task = {
      TaskName: taskData.TaskName,
      UserId: UserId,
    }
    // res.json(Task);
    const task = await TaskService.createTask(Task);
    if (task) {
      return res.json("Task đã được tạo thành công");
    } else {
      return res.json("Lỗi khi tạo Task");
    }
  },

  UpdateTask: async (req, res) => {
    const taskId = req.params.id;
    const updatedTaskData = req.body.data;
    const updated = await TaskService.updateTask(taskId, updatedTaskData);
    if (updated) {
      return res.json("Task đã được cập nhật thành công");
    } else {
      return res.json("Lỗi khi cập nhật Task");
    }
  },

  DeleteTask: async (req, res) => {
    const taskId = req.params.id;
    const deleted = await TaskService.deleteTask(taskId);
    if (deleted) {
      return res.json("Task đã được xóa thành công");
    } else {
      return res.json("Lỗi khi xóa Task");
    }
  },

  FindTaskById: async (req, res) => {
    const taskId = req.params.id;
    const task = await TaskService.findTaskById(taskId);
    if (task) {
      return res.json(task);
    } else {
      return res.json("Không tìm thấy Task hoặc có lỗi xảy ra");
    }
  },

  FindAllTasksByUserId: async (req, res) => {

    let UserId = req.body.decode.id;
    const tasks = await TaskService.findAllTasksByUserId(UserId);
    if (tasks) {
      return res.json(tasks);
    } else {
      return res.json("Không tìm thấy các Task hoặc có lỗi xảy ra");
    }
  }
}

module.exports = TaskController;
