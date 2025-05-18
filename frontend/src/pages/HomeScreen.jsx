import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import Login from '../components/Login'
import Signup from '../components/Signup'
import handleLogin from '../services/handleLogin'
import handleSignup from '../services/handleSignup'
import handleLogout from '../services/handleLogout'

const HomeScreen = () => {
    const { user, setUser } = useContext(AuthContext)
    const [isLogin, setIsLogin] = React.useState(true)

    const login = async (username, password) => {
        const result = await handleLogin(username, password)
        if (result.success) {
            setUser({ username: result.username })
        } else {
            alert(result.message)
        }
    }

    const signup = async (username, password, email) => {
        const result = await handleSignup(username, password, email)
        console.log(result)
        if (result.success) {
            setIsLogin(true)
        } else {
            alert(result.message)
        }
    }

    const logout = async () => {
        const result = await handleLogout()
        console.log("HomeScreen: ", result)
        if (result) {
            setUser(null)
        } else {
            alert(result)
        }
    }

    return (
        <div>
            <div>
                {user ? (
                    <>
                        <h2>Hello, {user.username}!</h2>
                        <button onClick={logout}>Log Out</button>
                    </>
                ) : (<></>)}
                    <button>
                        <Link to="/game">Start Game</Link>
                    </button>
                {user ? (
                    <></>
                ) : (
                    <>
                        {isLogin ? (
                            <Login onLogin={login} isLogin={isLogin} setIsLogin={setIsLogin}/>
                        ) : (
                            <Signup onSignup={signup} isLogin={isLogin} setIsLogin={setIsLogin}/>
                        )}

                    </>
                )}
            </div>
        </div>
    )
}

export default HomeScreen