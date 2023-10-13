
import axios from "axios";
import Cookies from "js-cookie";


const TaskAPI = {
    create:async(task)=>{
        let data = {
            TaskName:task
        }
        let accessToken = Cookies.get("accessToken");
            console.log("accessToken : "+accessToken);
            if(!accessToken) {
                return;
            }

        let result = null;
        let url = import.meta.env.VITE_API_URL;
        await axios.post(`${url}/create-task`,{
            data:data
        },{
            headers: {
                Authorization: `Bearer ${accessToken}`
              }
        })
        .then(response=>{
            console.log(response);
            result = response.status;
        })
        .catch(error=>{
            console.log(error);
            result = error.response.status;
        })

        return result;


    },
    getAllByUserId:async ()=>{
        let accessToken = Cookies.get("accessToken");
            console.log("accessToken : "+accessToken);
            if(!accessToken) {
                return;
            }

        let result = null;
        let url = import.meta.env.VITE_API_URL;
        await axios.get(`${url}/find-tasks-by-user`,{
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
    },

    update:async(TaskId,TaskName,TaskState)=>{
        try {
            let data = {
                TaskName:TaskName,
                State:TaskState
            }
            let accessToken = Cookies.get("accessToken");
                console.log("accessToken : "+accessToken);
                if(!accessToken) {
                    return;
                }
    
            let result = null;
            let url = import.meta.env.VITE_API_URL;
            await axios.put(`${url}/update-task/${TaskId}`,{
                data:data
            },{
                headers: {
                    Authorization: `Bearer ${accessToken}`
                  }
            })
            .then(response=>{
                console.log(response);
                result = response.status;
            })
            .catch(error=>{
                console.log(error);
                result = error.response.status;
            })
    
            return result;
        } catch (error) {
            
        }
    },

    delete:async(TaskId)=>{
        try {
            
            let accessToken = Cookies.get("accessToken");
                console.log("accessToken : "+accessToken);
                if(!accessToken) {
                    return;
                }
    
            let result = null;
            let url = import.meta.env.VITE_API_URL;
            await axios.delete(`${url}/delete-task/${TaskId}`,{
                headers: {
                    Authorization: `Bearer ${accessToken}`
                  }
            })
            .then(response=>{
                console.log(response);
                result = response.status;
            })
            .catch(error=>{
                console.log(error);
                result = error.response.status;
            })
    
            return result;
        } catch (error) {
            
        }
    }
}

export default TaskAPI;