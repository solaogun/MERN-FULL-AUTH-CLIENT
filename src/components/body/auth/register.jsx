import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { showErrMsg, showSuccessMsg } from './../../utils/notification/notification';
// import { dispatchLogin } from '../../../redux/actions/authAction';
// import { useDispatch } from 'react-redux'
import { isEmpty, isEmail, isLength, isMatch } from '../../utils/notification/validation/validation';


const initialState = {
    name: '',
    email: '',
    password: '',
    cf_password: '',
    err: '',
    success: ''
}

function Register() {
    const [user, setUser] = useState(initialState)
    // const dispatch = useDispatch()
    // const history = useHistory()

    const { name, email, password, cf_password, err, success } = user

    const handleChangeInput = e => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value, err: '', success: '' })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        if (isEmpty(name) || isEmpty(password))
            return setUser({ ...user, err: "Please fill in all field", success: '' })

        if (!isEmail(email))
            return setUser({ ...user, err: "Invalid emails", success: '' })

        if (isLength(password))
            return setUser({ ...user, err: "Password must be atleast 6 characters", success: '' })

        if (!isMatch(password, cf_password))
            return setUser({ ...user, err: "Password did not match", success: '' })
        try {
            const res = await axios.post('/user/register', { name, email, password })
            setUser({ ...user, err: '', success: res.data.msg })
            // localStorage.setItem('firstLogin', true)

            // dispatch(dispatchLogin());
            // history.push("/");
        } catch (err) {
            err.response.data.msg && setUser({ ...user, err: err, success: '' })
        }
    }

    return (
        <div className='login_page'>
            <h2>Register</h2>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" placeholder='Enter your name' id='name' value={name} name='name' onChange={handleChangeInput} />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" placeholder='Enter your email address' id='email' value={email} name='email' onChange={handleChangeInput} />
                </div>
                <div >
                    <label htmlFor="email">Password</label>
                    <input type="password" placeholder='Enter your password' id='password' value={password} name='password' onChange={handleChangeInput} />
                </div>
                <div >
                    <label htmlFor="cf_password">Confirm Password</label>
                    <input type="password" placeholder='Confirm your password' id='cf_password' value={cf_password} name='cf_password' onChange={handleChangeInput} />
                </div>
                <div className='row'>
                    <button type='submit'>Register</button>
                </div>
                <p>Already have account ? <Link to='/login'>Login</Link></p>
            </form>
        </div>
    )
}



export default Register
