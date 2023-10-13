import React, { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import TaskAPI from '../../services/serverAPI/TaskAPI';
import { toast } from 'react-toastify';


const Card = ({ title, task, classes,gif,changeToUpdate,refresh }) => {
    const [show, setShow] = useState(false);
    const [idDeleteItem, setIdDeleteItem] = useState();
    const [nameDeleteItem, setNameDeleteItem] = useState();
    const [activeCardIndex, setActiveCardIndex] = useState(null);

    const cardRef = useRef(null);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    

    const toggleActions = (index) => {
        if (index === activeCardIndex) {
            // Nếu thẻ đã được nhấn một lần nữa, ẩn nó đi
            setActiveCardIndex(null);
        } else {
            // Nếu thẻ chưa được nhấn, hiển thị nó và ẩn thẻ trước (nếu có)
            setActiveCardIndex(index);
        }
    }

    useEffect(() => {
        const handleDocumentClick = (e) => {
            // Kiểm tra nếu phần tử được click không nằm trong listAction và card
            if (!cardRef.current.contains(e.target)) {
                setActiveCardIndex(null);
            }
        };

        document.addEventListener('click', handleDocumentClick);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    const handleUpdate = (value,id,state) => {
        changeToUpdate(value,id,state);
        setActiveCardIndex(null);
    }

    // const [TaskId,setTaskId] = useState();
    // const [TaskName,setTaskName] = useState();
    // const [TaskState,setTaskState] = useState();



    const ChangeState = async(TaskId,TaskName,TaskState) => {
        let result = await TaskAPI.update(TaskId,TaskName,TaskState);
        console.log(result);
        if(result == 200) {
            toast.success("Đã cập nhật công việc !")
            refresh();
            // setRefresh(!refresh);
            
            return;
        }
        return toast.error("Cập nhật thất bại !");
    }

    const deleteTask = async (TaskId) => {
        let result = await TaskAPI.delete(TaskId);
        console.log(result);
        if(result == 200) {
            toast.success("Đã xóa nhật công việc !")
            refresh();
            // setRefresh(!refresh);
            setShow(false);
            
            return;
        }
        
        return toast.error("Xóa thất bại !");
    }

    const handleDelete = (id, name) => {
        setShow(true);
        setIdDeleteItem(id);
        setNameDeleteItem(name);
        
        
    }

    

    return (
        <>
            <div ref={cardRef} className={"card " + classes}>
                <div className="title">
                    <div className='titleTop'>
                        <span>{title}</span>
                        <img src={gif} alt="" />
                    </div>
                    <hr />
                </div>

                <div className="listItem">
                    {task &&
                        task.map((value, index) => {
                            return (
                                <>
                                <div className={"rowTask "+classes+"rowTask"} key={index}>
                                    <div className="task">
                                        <span className ="">{value.TaskName}</span>
                                    </div>
                                    <div className="action">
                                        <i className="fa-solid fa-ellipsis menu" onClick={() => toggleActions(index)}></i>

                                        {index === activeCardIndex && (
                                            <div className="listAction">
                                                {classes === "BoxDoing" && 
                                                    <div className="ItemAction item-primary" onClick={()=>{ChangeState(value.id,value.TaskName,0)}}>
                                                        <i className="fa-solid fa-left-long"></i>
                                                        <span>Chuyển sang cần làm</span>
                                                    </div>
                                                    }
       
                                                <div className="ItemAction item-primary" onClick={()=>(handleUpdate(value.TaskName,value.id,value.State))}>
                                                    <i className="fa-solid fa-pen-to-square edit"></i>
                                                    <span>Chỉnh sửa</span>
                                                </div>
                                                
                                                
                                                {classes === "BoxNeed" && 
                                                    <div className="ItemAction item-primary" onClick={()=>{ChangeState(value.id,value.TaskName,1)}}>
                                                        <i className="fa-solid fa-right-long"></i>
                                                        <span>Chuyển sang đang làm</span>
                                                    </div>
                                                    
                                                }
                                                {classes === "BoxDoing" && 
                                                    <div className="ItemAction item-primary" onClick={()=>{ChangeState(value.id,value.TaskName,2)}}>
                                                        <i className="fa-solid fa-square-check"></i>
                                                        <span>Đánh dấu đã làm</span>
                                                    </div>
                                                    
                                                }
                                                {classes === "BoxDid" && 
                                                    <div className="ItemAction item-primary" onClick={()=>{ChangeState(value.id,value.TaskName,1)}}>
                                                        <i className="fa-regular fa-calendar-check"></i>
                                                        <span>Khôi phục công việc</span>
                                                    </div>
                                                    
                                                }
                                                <div className="ItemAction item-danger" onClick={() => { handleDelete(value.id, value.TaskName) }}>
                                                    <i className="fa-solid fa-trash delete" ></i>
                                                    <span>Xóa công việc</span>

                                                </div>
                                                
                                            </div>
                                        )}
                                    </div>
                                    
                                {classes === "BoxDid" && <div className='line'><hr/></div>}
                                </div>
                                </>
                            )
                        })
                    }
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận xóa</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn chắc chắn muốn xóa công việc "{nameDeleteItem}"</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button variant="danger" onClick={()=>{deleteTask(idDeleteItem)}}>
                        Xóa
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Card;
