import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { showErrMsg, showSuccessMsg } from '../../utils/notification/notification'
import { isLength, isMatch } from '../../utils/notification/validation/validation'

const initialState = {
    password: '',
    cf_password: '',
    err: '',
    success: ''
}

function ResetPassword() {

    const [data, setData] = useState(initialState)
    const { password, cf_password, err, success } = data
    const { token } = useParams()
    // console.log(id)

    const handleChangeInput = e => {
        const { name, value } = e.target
        setData({ ...data, [name]: value, err: '', success: '' })
    }

    const resetPassword = async () => {
        if (isLength(password))
            return setData({ ...data, err: 'Password must be at least 6 characters', success: '' })

        if (!isMatch(password, cf_password))
            return setData({ ...data, err: 'Password does not match', success: '' })

        try {
            const res = await axios.post('/user/reset', { password }, {
                headers: { Authorization: token }
            })
            setData({ ...data, err: '', success: res.data.msg })
        } catch (err) {
            err.response.data.msg && setData({ ...data, err: err.response.data.msg, success: '' })
        }
    }
    return (
        <div className='fg_password'>
            <h2> Reset Password</h2>

            <div className='row'>
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}

                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" value={password} onChange={handleChangeInput} />

                <label htmlFor="cf_password">ConfirmPassword</label>
                <input type="password" name="cf_password" id="password" value={cf_password} onChange={handleChangeInput} />

                <button onClick={resetPassword}>Reset your Password</button>




            </div>
        </div>
    )
}

export default ResetPassword
