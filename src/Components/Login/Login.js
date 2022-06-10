import './Login.css'
import { FaEnvelope } from "react-icons/fa"
import {FaKey} from 'react-icons/fa'

const Login=()=>{

    const letMeInHandler=event=>{
        event.preventDefault()
    }
    return (
        <div className='login-bg-container'>
            <div className='login-details-container'>
            <img alt="login page logo" 
            className='login-page-logo' src="http://192.168.0.116:8080/css/images/logo.png" />
            
            <h1 className='login-text'>Login</h1>
            <form className='form-container' onSubmit={letMeInHandler}>
                <div className='user-name-container'>
                    <div className='fa-envelope-container'>
                    <FaEnvelope/>
                    </div>
                    <div className='input-container'>
                    <input 
                    className='input-box'
                    placeholder='Username' type="text" />
                    </div>
                </div>
                <div className='user-name-container'>
                    <div className='fa-envelope-container'>
                    <FaKey/>
                    </div>
                    <div className='input-container'>
                    <input
                    className='input-box' placeholder='Password' type="text" />
                    </div>
                </div>
                <div>
                <button className='btn btn-primary btn-block btn-large let-me-in-button' type="submit">Let me in</button>
                </div>
                <div className='forgot-signup-container'>
                    <p className='white-text'>Forgot Password?</p>
                    <p className='white-text'>Sign up</p>
                </div>
            </form>
        </div>
        </div>
    )
}

export default Login