import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import Cookies from "js-cookie";

import styles from './authStyles.module.scss';
import AuthAPI from '../../services/serverAPI/AuthAPI';
import { toast } from 'react-toastify';


const SignUp = () => {

   const [	UserName,setUserName] = useState();
   const [Pass,setPass] = useState();
   const [ConfirmPass,setConfirmPass] = useState();


    let navigate = useNavigate();
    const Redirect = () =>{
        // return redirect('/');
        return navigate('/sign-in');
    }

    const handleSubmit = async () => {
        console.log("UserName : " + UserName);
        console.log("Pass : " + Pass);
        console.log("ConfirmPass : " + ConfirmPass);
        if(!UserName || !Pass || !ConfirmPass) {
            console.log("nhap day du du lieu ");
            return false;
            
        }
        let user = {
            UserName: UserName,
            Pass: Pass,
        }
        if(!(Pass === ConfirmPass)) {
            console.log("mat khau khong khop");
            return false;
        }
        // let user = {
        //      "trang",
        //  "123",
        //   "123"
        // }

        const result = await AuthAPI.SignUp(user);
        console.log(result);
        if(result == 200) {
            toast.success("Tạo tài khoản thành công!");
            return Redirect();
        }
        if(result == 409) {
            return toast.error("Người dùng đã tồn tại!");
        }
        return toast.error("Tạo tài khoản thất bại!");


    }

    return (
        <div className={styles.boxAuth +" boxAuth"}>
            <div className={styles.content}>
            <div className={styles.authTop}>
                <div className={styles.logo}>
                    {/* <img src={logo} alt="" /> */}
                </div>
                <div className={styles.authTitle}>
                    <div className={styles.title}>
                        <h3>Quản lí công việc với TodoList</h3>
                    </div>
                    <div className={styles.description}>
                        <span>Vui lòng nhập đầy đủ thông tin</span>
                    </div> 
                </div>
            </div>

            <div className={styles.formAuth}>
                
                <div className={styles.form}>

                    <TextField 
                        id="outlined-basic" 
                        label="Tên của bạn" 
                        variant="outlined" 
                        onChange={(e)=>{setUserName(e.target.value)}} />
                </div>
                <div className={styles.form}>
                    <TextField 
                        type='password' 
                        id="outlined-basic" 
                        label="Mật khẩu" 
                        onChange={(e)=>{setPass(e.target.value);}}
                        variant="outlined" />
                        
                    
                </div>
                <div className={styles.form}>
                    <TextField 
                        type='password' 
                        id="outlined-basic" 
                        label="Nhập lại mật khẩu" 
                        onChange={(e)=>{setConfirmPass(e.target.value);}}
                        variant="outlined" />
                </div>
            </div>

            <div className={styles.formAction}>
                <div className={styles.btnSignUp}>
                    <button 
                    onClick={handleSubmit}
                    >Đăng ký</button>
                </div>
                <div className={styles.lineOr}>
                    <div className={styles.line}></div>
                    <div className={styles.or}>Hoặc</div>
                    <div className={styles.line}></div>
                </div>

                <div className={styles.btnSignInGoogle}>
                    <button>Đăng nhập bằng Google</button>
                </div>
                <div className={styles.btnSignInFacebook}>
                    <button>Đăng nhập bằng Facebook</button>
                </div>


            </div>

            <div className={styles.authBottom}>
                <div className={styles.signIn}>
                    <span>Đã có tài khoản?<Link to="/sign-in">Đăng nhập</Link></span>
                </div>
                {/* <div className={styles.forgotPassword}>
                    <span>Quên mật khẩu của bạn?<Link>Lấy lại</Link></span>
                </div> */}
            </div>
        </div>
        </div>
    );
};

export default SignUp;