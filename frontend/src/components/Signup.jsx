import React, { useState } from 'react'

const Signup = ({ onSignup, isLogin, setIsLogin }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [email, setEmail] = useState('')
    const [confirmEmail, setConfirmEmail] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("SIGN UP: ", username, password, email)
        if (password !== confirmPassword || email !== confirmEmail) {
            alert("Passwords or emails do not match.")
            return
        }
        const result = await onSignup(username, password, email)
        console.log("Signup: ", result)
        if (result.success) {
            alert(`Signup successful! Welcome, ${result.username}.`)
        } else {
            alert(result.message)
        }
    }

    return (
        <div className='signup'>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    {/* <label>Username:</label> */}
                    <input
                        type="text"
                        placeholder='Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    {/* <label>Password:</label> */}
                    <input
                        type="email"
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    {/* <label>Password:</label> */}
                    <input
                        type="email"
                        placeholder='Confirm Email'
                        value={confirmEmail}
                        onChange={(e) => setConfirmEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    {/* <label>Password:</label> */}
                    <input
                        type="password"
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    {/* <label>Password:</label> */}
                    <input
                        type="password"
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <br/>
                <button type="submit">Sign Up</button>
                <button onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
                </button>
            </form>
        </div>
    )
}

export default Signup