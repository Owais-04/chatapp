import React from 'react'
import assets, { imagesDummyData } from '../assets/assets'

const RightSidebar = ({ selectedUser }) => {
  return selectedUser && (
    <div className={`bg-gray-900/50 border border-gray-700 text-white w-full relative overflow-y-scroll p-4 ${selectedUser ? 'max-md:hidden' : ''}`}>
      
      {/* Profile Section */}
      <div className="flex flex-col items-center text-center">
        <img 
          src={selectedUser?.profilePic || assets.avatar_icon} 
          alt="Profile" 
          className="w-20 h-20 rounded-full mb-4" 
        />
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <h1 className="text-xl font-medium text-white">
            {selectedUser.fullName || selectedUser.name}
          </h1>
        </div>
        <p className="text-gray-400 text-sm">
          {selectedUser.bio || "No bio available"}
        </p>
      </div>

      <hr className='my-4 border-[#ffffff50]' />

      {/* Media Section */}
      <div className="px-5 text-xs">
        <p>Media</p>
        <div className='mt-2 max-h-[200px] overflow-y-scroll grid grid-cols-2 gap-4 opacity-80'>
          {imagesDummyData && imagesDummyData.length > 0 ? (
            imagesDummyData.map((url, index) => (
              <div 
                key={index} 
                onClick={() => window.open(url)} 
                className="cursor-pointer rounded"
              >
                <img 
                  src={url} 
                  alt={`media-${index}`} 
                  className="h-full rounded-md" 
                />
              </div>
            ))
          ) : (
            <p className="col-span-2 text-gray-400 text-center">No media available</p>
          )}
        </div>
      </div>
    <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-400 to-violet-600 text-white border-none text-sm font-light py-2 px-4 rounded-full cursor-pointer">
  Logout
</button>

    </div>
  )
}

export default RightSidebar
