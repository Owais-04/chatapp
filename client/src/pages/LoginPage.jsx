import React from 'react'
import assets from '../assets/assets'

const LoginPage = () => {
  const [currState, setCurrState] = React.useState('Sign up')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [isDataSubmitted, setIsDataSubmitted] = React.useState(false)
  const [agreed, setAgreed] = React.useState(false)

  const toggleState = () => {
    setCurrState(currState === 'Login' ? 'Sign up' : 'Login')
    setIsDataSubmitted(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (currState === 'Sign up' && password !== confirmPassword) {
      alert("Passwords do not match")
      return
    }

    if (!agreed) {
      alert("You must agree to the terms of use & privacy policy.")
      return
    }

    const submittedData = {
      email,
      password
    }

    console.log("Form Submitted:", submittedData)
    setIsDataSubmitted(true)
  }

  return (
    <div className='min-h-screen flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl bg-black/40'>
      {/* Left side with image */}
      <img src={assets.logo_big} alt="Logo" className="w-[min(30vw,250px)]" />

      {/* Right side with login form */}
      <form 
        className='border-2 bg-white/10 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg w-[min(90vw,400px)]'
        onSubmit={handleSubmit}
      >
        <h2 className='font-medium text-2xl flex justify-between items-center'>
          {currState}
          <img 
            src={assets.arrow_icon} 
            alt="Toggle" 
            className='w-5 cursor-pointer rotate-90' 
            onClick={toggleState}
          />
        </h2>

        <input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='bg-transparent border-b border-gray-400 py-2 px-1 outline-none placeholder-white text-sm' 
          required 
        />

        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='bg-transparent border-b border-gray-400 py-2 px-1 outline-none placeholder-white text-sm' 
          required 
        />

        {currState === 'Sign up' && (
          <input 
            type="password" 
            placeholder="Confirm Password" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className='bg-transparent border-b border-gray-400 py-2 px-1 outline-none placeholder-white text-sm' 
            required 
          />
        )}

        {/* Terms checkbox */}
        <label className='flex items-center gap-2 text-sm text-gray-300'>
          <input 
            type="checkbox" 
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="accent-purple-600"
          />
          Agree to terms of use & privacy policy
        </label>

        {/* Submit Button */}
        <button 
          type="submit" 
          className='bg-purple-600 hover:bg-purple-700 transition-colors text-white py-2 rounded-md text-sm font-semibold'
        >
          {currState}
        </button>

        {/* Submission status */}
        {isDataSubmitted && (
          <p className="text-xs text-center text-green-400">Data submitted successfully!</p>
        )}

        {/* Toggle link */}
        <p className="text-xs text-center text-gray-300">
          {currState === 'Login' ? "Don't have an account?" : "Already have an account?"}{' '}
          <span 
            onClick={toggleState} 
            className="text-purple-400 underline cursor-pointer"
          >
            {currState === 'Login' ? "Sign up" : "Login"}
          </span>
        </p>
      </form>
    </div>
  )
}

export default LoginPage
