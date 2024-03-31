import '../styles/auth.scss';
import logo from '../assets/logo.png';
import Image from 'next/image';
export default function Page() {
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
                    Login
                </label>
               
            </div>
            <div className="group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" 
                placeholder='Eg: teddy@gmail.com'
                />
            </div>
            <div className="group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password"
                placeholder='Enter your password'
                />
            </div>
            <div className="group-opt">
                <div className="checkbox">
                    <input type="checkbox" id="remember"/>
                    <label htmlFor="remember">Remember me</label>
                </div>
                <a href="">Forgot password?</a>
            </div>
            <div className="group">
                <button>Login</button>
            </div>
            <div className="group-btm">
                <label htmlFor="">Don't have an account? <a href="/register">Sign up</a></label>
            </div>
        </div>
        </div>
    )
}