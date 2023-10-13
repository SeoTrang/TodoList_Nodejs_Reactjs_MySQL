import React, { useEffect, useState } from 'react';
import { Link, redirect, useNavigate } from 'react-router-dom';

import TextField from '@mui/material/TextField';


import styles from './authStyles.module.scss';
import { toast } from 'react-toastify';
import AuthAPI from '../../services/serverAPI/AuthAPI';


const SignIn = () => {

    const [	UserName,setUserName] = useState();
    const [Pass,setPass] = useState();

    let navigate = useNavigate();
    const Redirect = () =>{
        // return redirect('/');
        return navigate('/');
    }

    const handleSubmit = async () => {
        if(!UserName || !Pass) {
            toast.warning("Vui lòng nhập đầy đủ dữ liệu !")
            return false;
            
        }
        let user = {
            UserName: UserName,
            Pass: Pass,
        }

        const result = await AuthAPI.SignIn(user);
        console.log(result);
        if(result) {
            toast.success("Đăng nhập thành công !");
            return Redirect();
        }
        return toast.error("Tài khoảng hoặc mật khẩu không hợp lệ !");
    }



   

    return (
        
        <div className={styles.boxAuth + " boxAuth"}>
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
                        <span>Đăng nhập với email & mật khẩu</span>
                    </div>
                </div>
            </div>

            <div className={styles.formAuth}>
                <div className={styles.form}>

                <TextField 
                    id="outlined-basic" 
                    label="Tên của bạn" 
                    onChange={(e)=>{setUserName(e.target.value)}}
                    variant="outlined" />
                    
                
                </div>
                <div className={styles.form}>

                <TextField type="password" 
                    id="outlined-basic" 
                    label="Mật khẩu" 
                    onChange={(e)=>{setPass(e.target.value)}}
                    variant="outlined" />
                </div>
            </div>

            <div className={styles.formAction}>
                <div className={styles.btnSignIn}>
                    <button 
                    onClick={handleSubmit}
                    >Đăng nhập</button>
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
                <div className={styles.signUp}>
                    <span>Không có tài khoản?<Link to="/sign-up">Đăng ký ngay</Link></span>
                </div>
                <div className={styles.forgotPassword}>
                    <span>Quên mật khẩu của bạn?<Link>Lấy lại</Link></span>
                </div>
            </div>
        </div>
        </div>
    );
};

export default SignIn;