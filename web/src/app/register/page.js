"use client"
import '../styles/auth.scss';
import logo from '../assets/logo.png';
import Image from 'next/image';
import { api, endpoints } from '../config/server';
import { useState } from 'react';
export default function Page() {
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState(null)
    async function registerUser(){
        await api.post(endpoints.register,{
            firstname,
            lastname,
            email,
            password
        }).then(res=>{
            console.log(res.data)
            localStorage.setItem('token',res.data.token)
            localStorage.setItem('user',JSON.stringify(res.data.user))
        }).catch(e=>{
   
            setErrors(e.response.data.errors)
        })
    }
    return (
        <div className="auth">
        <div className="top">
        <Image src={logo.src} width={40} height={40} alt="logo" />
        <label htmlFor="">
            HospitalOnWheels
        </label>

        </div>
        <div className="auth-form">
            <div className="title">
                <label htmlFor="">
                    Register
                </label>
               
            </div>
            <div className="group">
                <label htmlFor="email">Firstname</label>
                <input type="text" id="firstname" 
                className={errors && errors.firstname && 'error'}
                placeholder='Eg: Teddy'
                value={firstname}
                onChange={(e)=>setFirstname(e.target.value)}
                />
                {
                    errors && errors.firstname && <small>{errors.firstname}</small>
                }
            </div>
            <div className="group">
                <label htmlFor="email">Lastname</label>
                <input type="text" id="lastname" 
                className={errors && errors.lastname && 'error'}
                placeholder='Eg: Oweh'
                value={lastname}
                onChange={(e)=>setLastname(e.target.value)}
                />
                {
                    errors && errors.lastname && <small>{errors.lastname}</small>
                }
            </div>
            <div className="group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" 
                className={errors && errors.email && 'error'}
                placeholder='Eg: teddyoweh@gmail.com'
                value={email}

                onChange={(e)=>setEmail(e.target.value)}
                
                />
                {
                    errors && errors.email && <small>{errors.email}</small>
                }
            </div>
            <div className="group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password"
                placeholder='Enter your password'
                className={errors && errors.password && 'error'}
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                />
                {
                    errors && errors.password && <small>{errors.password}</small>
                }
            </div>
        
            <div className="group">
                <button
                onClick={registerUser}
                
                >Register</button>
            </div>
            <div className="group-btm">
                <label htmlFor="">Already have an account? <a href="/login">Login</a></label>
            </div>
        </div>
        </div>
    )
}