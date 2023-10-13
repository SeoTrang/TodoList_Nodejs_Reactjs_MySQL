const jwt = require("jsonwebtoken");
const auth = require("../auth/auth");

const checkLogin = async (req,res,next)=>{
    try {

        // console.log(req);
        console.log("accesstoken ======>>> :  ",req.headers.authorization);
        const token = req.headers.authorization.split(' ')[1]; //get token
        // console.log("token :",token);
        // console.log("env access token : ",process.env.ACCESS_TOKEN_SECRET);
        const decode = await auth.verifyAccessToken(token);
        console.log("decode : ",decode);


        if(decode === "jwt expired") {
            console.log("access token expired");
            
            return res.status(401).json("access token expired");
        }else if(!decode) return res.status(401).json("invalid access token");

        // res.json(req.cookies.accesstoken);

        // let access_token = await req.cookies.accesstoken;
        
        // let logined = await jwt.verify(access_token,'accesstoken_key');

        req.body.decode = decode;

        next();
    } catch (error) {
        console.log(error);
    }

}


module.exports = checkLogin;