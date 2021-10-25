import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'


function Header() {
    const auth = useSelector(state => state.auth)

    const { user, isLogged } = auth

    const handleLogout = async () => {
        try {
            await axios.post('/user/logout')
            localStorage.removeItem('firstLogin')
            window.location.href = "/"
        } catch (err) {
            window.location.href = "/"
        }
    }

    const userLink = () => {
        return <li className='drop-nav'>
            <Link to='#' className='avatar'>
                <img src={user.avatar} alt="" />{user.name} <i className="fas fa-angle-down"></i>
                <ul className='dropdown'>
                    <li><Link to='/profile'>Profile</Link></li>
                    <li><Link to='/logout' onClick={handleLogout}>Logout</Link></li>
                </ul>
            </Link>
        </li>
    }

    const transform = {
        transform: isLogged ? "translateY(-5px)" : 0
    }

    return (
        <header className='header'>
            <div className='logo'>
                <h1><Link to='/'>Saidat Shop</Link></h1>
            </div>

            <ul style={transform}>
                <li><Link to='/'><i className="fas fa-shopping-cart"></i> Cart</Link></li>
                {isLogged
                    ? userLink()
                    : <li><Link to='/login'><i className="fas fa-user"></i> Sign in</Link></li>
                }

            </ul>
        </header>

    )
}

export default Header
