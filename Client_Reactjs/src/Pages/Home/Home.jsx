import { useEffect, useState } from 'react'

import avatar from '../../assets/img/avatar.jpg'
import '../../App.css'
import Card from '../../components/card/Card'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import AuthAPI from '../../services/serverAPI/AuthAPI';


import gifCheck from "../../assets/img/check.gif"
import gifFolder from "../../assets/img/folder.gif"
import gifFolder2 from "../../assets/img/folder2.gif"
import gifInfo from "../../assets/img/info.gif"
import gifBookmark from "../../assets/img/bookmark.gif"
import { toast } from 'react-toastify';
import TaskAPI from '../../services/serverAPI/TaskAPI';

function Home() {
  const [count, setCount] = useState(0)
  const [user,setUser] = useState();
  const [refresh,setRefresh] = useState(false);

  const [ListTasks,setListTasks] = useState();
  const [TasksNeed,setTasksNeed] = useState();
  const [TasksDoing,setTasksDoing] = useState();
  const [TasksDid,setTasksDid] = useState();
  let navigate = useNavigate();
    const Redirect = () =>{
        // return redirect('/');
        return navigate('/sign-in');
    }
  useEffect(()=>{
    let accessToken = Cookies.get("accessToken");
    console.log("refreshToken : "+accessToken);
    if(!accessToken) {
        return Redirect();
    }
     async function fetchData(){
        let result = await AuthAPI.GetUserInfo();
        if(result == 401){
            return Redirect();
        }
        if(result){
            return setUser(result);
        }
    }
    fetchData();
  },[]);


  useEffect(()=>{
    console.log(user);
  },[user]);

  const handleLogout = () => {
    Cookies.remove('refreshToken');
    Cookies.remove('accessToken');
    setUser(null);
    return Redirect();
  }

  const tasks = ["viec 1", "viec 2", "viec 3", "viec 4"];

  const [updateInput,setUpdateInput] = useState(false);
  const [updateValue,setUpdateValue] = useState();
  const [idValueUpdate,setIdValueUpdate] = useState();
  const [TaskState,setTaskState] = useState();

  const [taskInput,setTaskInput] = useState();



  const changeToUpdate = (updateValue,idValueUpdate,TaskState) => {
    console.log("updateValue: " + updateValue);
    console.log("idValueUpdate: " + idValueUpdate);
    setUpdateInput(true);
    setIdValueUpdate(idValueUpdate);
    setUpdateValue(updateValue);
    setTaskState(TaskState);

    

    
  }

  const handleUpdate = async() => {
    console.log(updateValue);
    if(!updateValue) return toast.warning("Vui lòng nhập tên công việc !");
    
    // let task = {
    //     TaskName: updateValue,

    // }
    console.log("TaskName : "+updateValue);
    console.log("TaskId : "+idValueUpdate);
    console.log("TaskState :"+TaskState);
    let result = await TaskAPI.update(idValueUpdate,updateValue,TaskState);
    console.log(result);
    if(result == 200) {
        toast.success("Đã cập nhật công việc !")
        setRefresh(!refresh);
        setIdValueUpdate("");
        setTaskInput("");
        setUpdateInput(false);
        return;
    }
    return toast.error("Cập nhật thất bại !");
    

  }

  const handleSave = async() => {
    console.log(taskInput);
    if(!taskInput) return toast.warning("Vui lòng nhập tên công việc !");
    let result = await TaskAPI.create(taskInput);
    console.log(result);
    if(result == 200) {
        toast.success("Đã thêm công việc !")
        setRefresh(!refresh);
        return setTaskInput("");
    }

    return toast.error("Thêm công việc thất bại !")
    
  }

  useEffect(()=>{

    async function fetchData(){
        let result = await TaskAPI.getAllByUserId();
        if(result) {
            setListTasks(result);

        }
    }
    fetchData();
  },[refresh])

  useEffect(()=>{
    if(ListTasks){
        const tasksNeed = ListTasks.filter(task => task.State === 0);
        const tasksDoing = ListTasks.filter(task => task.State === 1);
        const tasksDid = ListTasks.filter(task => task.State === 2);

        setTasksNeed(tasksNeed);
        setTasksDoing(tasksDoing);
        setTasksDid(tasksDid);
    }

  },[ListTasks])

  const handleRefresh = ()=>{
    return setRefresh(!refresh);
  }

  return (
    <>
      
        <div className="container">
          {/* <input type="checkbox" name="" id="" /> */}
              <div className="header">
                {
                    user ?
                    <div className="User">
                        <img src={avatar} alt="" />
                        <span className='userName'>Trang</span>
                        <div className='logout' onClick={handleLogout}>
                            Đăng xuất
                        </div>
                    </div>

                    :
                    <Link to={'/sign-in'} className="User">
                        <div className='userIcon'>

                            <i class="fa-regular fa-user"></i>
                        </div>
                        <span className='login'>Đăng nhập</span>
                    
                    </Link>
                }
                
                
                {
                    updateInput?
                    <div class="input-group">
                  
                        <input onChange={(e)=>{setUpdateValue(e.target.value)}} value={updateValue} type="text" class="input" id="task" name="task" placeholder="Nhập công việc.."/>
                        <input  class="button--submit" onClick={handleUpdate} value="Lưu thay đổi" type="submit"/>
                    </div>
                    :
                    <div class="input-group">
                    
                        <input onChange={(e)=>{setTaskInput(e.target.value)}} value={taskInput} type="text" class="input" id="task" name="task" placeholder="Nhập công việc.."/>
                        <input  class="button--submit" onClick={handleSave} value="Thêm mới" type="submit"/>
                    </div>
                }

                
              </div>
              <div className="list-todo mt-3">
                <div className="needToDo">
                  <Card 
                    classes = {"BoxNeed"} 
                    title={"Việc cần làm"} 
                    gif={gifBookmark}
                    changeToUpdate={changeToUpdate}
                    refresh={handleRefresh}
                    task={TasksNeed}/>
                    
                </div>
                <div  className="doing">
                  <Card 
                    classes = {"BoxDoing"} 
                    title={"Việc đang làm"} 
                    changeToUpdate={changeToUpdate}
                    refresh={handleRefresh}
                    gif={gifFolder2}
                    task={TasksDoing}/>
                </div>

                <div  className="did">
                  <Card 
                    classes = {"BoxDid"} 
                    title={"Việc đã làm"} 
                    changeToUpdate={changeToUpdate}
                    refresh={handleRefresh}
                    gif={gifCheck}
                    task={TasksDid}/>

                </div>
              </div>
        </div>
        
    </>
  )
}

export default Home
