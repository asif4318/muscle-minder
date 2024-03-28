import React from 'react'

const login = () => {
  return (
    <form action = "login">
        <input
        autoFocus
        id='username'
        type='text'
        placeholder='Username'
        required
        />
        <input
        id='password'
        type='text'
        placeholder='Password'
        required
        />
        <button
        type="submit"
        
        >
            Log In
       </button>
       <button
       type="button"
       >
            Sign Up
      </button>
    </form>
  )
}

export default login
