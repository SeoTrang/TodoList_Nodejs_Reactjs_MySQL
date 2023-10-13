const bcrypt = require("../util/bcrypt");
const UserService = require('../services/UserService');
const { generateAccesstoken, generateRefreshtoken } = require("../auth/auth");
const Auth = require("../auth/auth");
const AuthController = {
    register:async (req,res)=>{
        try {
            // console.log("vao");
            const user = req.body.user;
            console.log("user: " + user);
            if(user.UserName){
                let user_temp = await UserService.findUserByName(user.UserName);
                if(user_temp) return res.status(409).json("Người dùng đã tồn tại")
            }
            // res.json(user);
            const encodePass = await bcrypt.hash(user?.Pass);
            console.log("encodePass : ",encodePass);
            user.Pass = encodePass;
            const User = await UserService.createUser(user);
            if (User) {
                console.log("Tạo người dùng thành công");
                return res.status(200).json("Người dùng đã được tạo thành công");
            } else {
                console.log("Lỗi khi tạo người dùng");
                return res.json("Lỗi khi tạo người dùng");
            }
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({message: error.message});
        }
    },
    login:async(req,res)=>{
        try {
            
            // const userId = req.params.id;
            const data = req.body.user;
            const user = await UserService.findUserByName(data.UserName);
            if(!user) {
                return res.status(404).json("not found");
            }
            if(!await bcrypt.compare(data.Pass,user.Pass)) return res.status(404).json('username or pass invalid');

            let accessToken;
            let refreshToken;
            // console.log(await bcrypt.compare(pass,user_temp.pass));
            if (user) {
                // return res.json(user);
                // console.log(user);
                accessToken = await generateAccesstoken(user);
                refreshToken = await generateRefreshtoken(user);

            // console.log("accessToken : ",accessToken);
            // console.log("refreshToken : ",refreshToken);
            } 
            if(refreshToken && accessToken){
                let user_decode = await Auth.verifyAccessToken(accessToken);
                console.log("test=====>>>>!!!");
                console.log(user.id);
                let userUpdate = {
                    UserName: user.name,
                    Pass: user.Pass,
                    RefreshToken:refreshToken
                }
                const addRefreshToken = await UserService.updateUser(user.id,userUpdate);

    
                console.log(addRefreshToken);
                if(addRefreshToken){
                    
                    return res.status(200).json({
                        refreshToken:refreshToken,
                        accessToken:accessToken
                    })
                }

                console.log("234");
               
            }
            return res.status(500).json('server error');
        } catch (error) {
            
        }
    },

    refreshToken:async(req,res,next)=>{
        
    },

    getUserInfo:async(req,res,next)=>{
        try {
            console.log(req.body);
            const userId = req.body.decode.id;
            if(!userId) return res.status(401); 
            let user = await UserService.findUserById(userId);
            if(user) return res.status(200).json(user);

            return res.status(500).json("error");
        } catch (error) {
            
        }
    }

}

module.exports = AuthController;