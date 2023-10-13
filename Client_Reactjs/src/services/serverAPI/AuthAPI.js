import Cookies from "js-cookie";
import { toast } from "react-toastify";
import axios from "axios";
const AuthAPI = {

    SignUp:async(user)=>{
        try {
            
            let result = null;
            console.log(import.meta.env.VITE_API_URL)
            console.log(user);
            let url = import.meta.env.VITE_API_URL;
            await axios.post(`${url}/register`,{
                user: user
            })
            .then(function(response){
                console.log(response);
                result = response.status;
                // categories = response.data;
            })
            .catch(function(error){
                console.log(error);
                console.log("Error");
                result = error.response.status;
            })
            if(result) return result;
            return false;
            
        } catch (error) {
            
        }
    },

    SignIn:async(user)=>{
        try {
            let accessToken = null;
            let refreshToken = null;
            let result = null;
            let url = import.meta.env.VITE_API_URL;
            await axios.post(`${url}/login`,{
                user: user
            })
            .then(function(response){
                console.log(response);
                // result = response.status;
                // categories = response.data;
                result = true;
                accessToken = response.data.accessToken;
                refreshToken = response.data.refreshToken;

            })
            .catch(function(error){
                console.log(error);
                console.log("Error");
                result = false;
                // result = error.response.status;
            })

            if(!accessToken || !refreshToken){
                return false;

            }

            Cookies.set("accessToken",accessToken);
            Cookies.set("refreshToken",refreshToken);
            return true;

            
          } catch (error) {
            console.log(error);
            return false; // Trả về false nếu có lỗi xảy ra
          }


    },

    GetUserInfo:async(accessToken)=>{
        try {
            let result = null;
            let accessToken = Cookies.get("accessToken");
            console.log("accessToken : "+accessToken);
            if(!accessToken) {
                return;
            }
            let url = import.meta.env.VITE_API_URL;
            let userInfo = await axios.get(`${url}/getUserInfo`,{
                headers: {
                    Authorization: `Bearer ${accessToken}`
                  }
            })
            .then(response => {
                result = response.data;
                console.log(response);
            })
            .catch(err=>{
                result = err.response.status;

                console.log(err);
            })

            return result;

        } catch (error) {
            
        }
    }
}

export default AuthAPI;