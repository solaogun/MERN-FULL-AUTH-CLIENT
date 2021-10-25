import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const initialState = {
    name: '',
    password: '',
    cf_password: '',
    err: '',
    success: ''
}

function Profile() {
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)

    const [data, setData] = useState(initialState)

    const [avatar, setAvatar] = useState(false)
    const [loading, setLoading] = useState(false)
    const [callback, setCallback] = useState(false)

    const { user, isAdmin } = auth
    const { name, password, cf_password, err, success } = data

    return (
        <div className='profile_page'>
            <div className='col-left'>
                <h2>{isAdmin ? "Admin Profile" : "User Profile"}</h2>

                <div className='avatar'>
                    <img src={avatar ? avatar : user.avatar} alt="" />
                    <span>
                        <i className="fas fa-camera"></i>
                        <p>Change</p>
                        <input type="file" name="file" id="file_up" />
                    </span>
                </div>
                <div className='form-group'>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" placeholder="Your name" defaultValue={user.name} />
                </div>

                <div className='form-group'>
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" placeholder="Enter your email" defaultValue={user.email} />
                </div>

                <div className='form-group'>
                    <label htmlFor="password">New Password</label>
                    <input type="password" name="password" id="password" placeholder="Enter your password" value={password} />
                </div>

                <div className='form-group'>
                    <label htmlFor="cf_password">Confirm New Password</label>
                    <input type="password" name="cf_password" id="cf_password" placeholder="Confirm your password" value={cf_password} />
                </div>
            </div>

            <div className='col-right'></div>

        </div>
    )
}

export default Profile
