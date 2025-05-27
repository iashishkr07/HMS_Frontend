import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import API from '../api'

const Login = () => {
  const [state, setState] = useState('Admin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await API.post(`/${state.toLowerCase()}/login`, { email, password })

      if (response.data.success) {
        toast.success(`${state} logged in successfully`)

        
        const tokenKey = state === 'Admin' ? 'adminToken' : 'doctorToken'
        localStorage.setItem(tokenKey, response.data.token)

        
        if (state === 'Admin') {
          navigate('/admin')
        } else {
          navigate('/doctor')
        }
      } else {
        toast.error(response.data.message)
      }
    } catch (err) {
      console.error(err)
      toast.error('Login failed. Please check your credentials.')
    }
  }

  return (
    <form onSubmit={handleLogin} className='min-h-[80vh] flex items-center justify-center'>
      <div className='flex flex-col gap-3 p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-gray-500 text-sm shadow-lg'>
        <p className='text-2xl font-semibold text-center'>
          <span className='text-primary'>{state}</span> Login
        </p>
        <div>
          <p>Email</p>
          <input
            className='border rounded w-full p-2 mt-1'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <p>Password</p>
          <input
            className='border rounded w-full p-2 mt-1'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className='bg-primary text-white py-2 rounded-md' type='submit'>
          Login
        </button>
        {state === 'Admin' ? (
          <p>
            Doctor Login?{' '}
            <span className='text-primary underline cursor-pointer' onClick={() => setState('Doctor')}>
              Click here
            </span>
          </p>
        ) : (
          <p>
            Admin Login?{' '}
            <span className='text-primary underline cursor-pointer' onClick={() => setState('Admin')}>
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  )
}

export default Login
