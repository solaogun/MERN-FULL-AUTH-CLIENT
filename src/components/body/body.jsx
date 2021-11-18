import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './auth/Login'
import Register from './auth/register'
import ActivationEmail from './auth/ActivationEmail'
import { useSelector } from 'react-redux'
import NotFound from '../utils/notfound/notfound'
import ForgotPassword from './auth/forgotPassword'
import ResetPassword from './auth/resetPassword'
import Profile from '../body/profile/profile'
import EditUser from '../body/profile/editUser'


function Body() {
    const auth = useSelector(state => state.auth)
    const { isLogged, isAdmin } = auth
    return (
        <section>
            <Switch>
                <Route path="/login" component={isLogged ? NotFound : Login} exact />
                <Route path="/register" component={isLogged ? NotFound : Register} exact />
                <Route path="/forgot_password" component={ForgotPassword} exact />
                <Route path="/user/reset/:token" component={ResetPassword} exact />
                <Route path="/profile" component={isLogged ? Profile : NotFound} exact />
                <Route path="/edit_user/:id" component={isAdmin ? EditUser : NotFound} exact />
                <Route path="/user/activate/:activation_token" component={ActivationEmail} exact />
            </Switch>
        </section>
    )
}

export default Body
