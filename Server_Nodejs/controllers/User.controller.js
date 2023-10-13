const UserService = require('../services/UserService');

const UserController = {
    Home: async (req, res) => {
        return res.json("hello world");
    },
    CreateUser: async (req, res) => {
        console.log(req.body.data);
        const User = await UserService.createUser(req.body.data);
        if (User) {
            console.log("Tạo người dùng thành công");
            return res.json("Người dùng đã được tạo thành công");
        } else {
            console.log("Lỗi khi tạo người dùng");
            return res.json("Lỗi khi tạo người dùng");
        }
    },
    UpdateUser: async (req, res) => {
        // console.log("test");
        const userId = req.params.id;
        // console.log(userId);
        const updatedUserData = req.body.data;
        console.log(updatedUserData);
        // return res.json(updatedUserData);
        const updated = await UserService.updateUser(userId, updatedUserData);
        if (updated) {
            console.log("Cập nhật người dùng thành công");
            return res.json("Người dùng đã được cập nhật thành công");
        } else {
            console.log("Lỗi khi cập nhật người dùng");
            return res.json("Lỗi khi cập nhật người dùng");
        }
    },
    DeleteUser: async (req, res) => {
        const userId = req.params.id;
        const deleted = await UserService.deleteUser(userId);
        if (deleted) {
            console.log("Xóa người dùng thành công");
            return res.json("Người dùng đã được xóa thành công");
        } else {
            console.log("Lỗi khi xóa người dùng");
            return res.json("Lỗi khi xóa người dùng");
        }
    },
    FindUserById: async (req, res) => {
        const userId = req.params.id;
        const user = await UserService.findUserById(userId);
        if (user) {
            return res.json(user);
        } else {
            return res.json("Không tìm thấy người dùng hoặc có lỗi xảy ra");
        }
    }
}

module.exports = UserController;
