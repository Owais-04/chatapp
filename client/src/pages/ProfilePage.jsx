import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import assets from '../assets/assets'

const ProfilePage = () => {
  const [selectedImg, setSelectedImg] = useState(null)
  const navigate = useNavigate()
  const [name, setName] = useState('Martin Johnson')
  const [bio, setBio] = useState('Hi Everyone, I am Using QuickChat')

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedImg(URL.createObjectURL(file))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const profileData = { name, bio, profilePic: selectedImg }
    console.log('Profile Saved:', profileData)

    // Simulate navigation
    navigate('/chat') // Adjust as needed
  }

  return (
    <div className="min-h-screen bg-cover bg-no-repeat flex items-center justify-center bg-black/50 backdrop-blur-2xl">
      <div className="w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg p-4">
        {/* Left Side: Profile Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-10 flex-1">
          <h3 className="text-lg font-semibold">Profile details</h3>

          {/* Upload image */}
          <div className="flex flex-col items-center gap-2">
            <img
              src={selectedImg || assets.avatar_icon}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover"
            />
            <label className="text-sm text-purple-300 cursor-pointer hover:underline">
              Upload profile image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-transparent border-b border-gray-500 py-2 px-1 outline-none placeholder-gray-300"
            placeholder="Full Name"
          />

          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="bg-transparent border border-gray-500 rounded-md px-3 py-2 outline-none resize-none focus:ring-2 focus:ring-violet-500"
            rows={4}
            placeholder="Write your bio..."
          />

          <button
            type="submit"
            className="bg-gradient-to-r from-purple-400 to-violet-600 text-white p-2 rounded-full text-lg cursor-pointer"
          >
            Save
          </button>
        </form>

        {/* Right Side: Logo Icon */}
        <img
          className="max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10"
          src={assets.logo_icon}
          alt="Logo"
        />
      </div>
    </div>
  )
}

export default ProfilePage
