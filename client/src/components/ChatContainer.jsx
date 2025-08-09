import React, { useEffect, useRef } from 'react'
import assets, { messagesDummyData } from '../assets/assets'
import { formatMessageTime } from '../lib/utils'

const ChatContainer = ({ selectedUser, setSelectedUser }) => {
  const scrollEnd = useRef()

  useEffect(() => {
    if (scrollEnd.current) {
      scrollEnd.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messagesDummyData]) // Scroll on message update

  return selectedUser ? (
    <div className="h-full max-h-full flex flex-col bg-gray-900/50 border border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 py-3 mx-4 border-b border-stone-500 flex-shrink-0">
        <img
          src={selectedUser.image || assets.profile_martin}
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
        <p className="flex-1 text-lg flex items-center gap-2 text-white">
          {selectedUser.name}
          <span className="w-2 h-2 rounded-full bg-green-500 inline-block ml-2"></span>
        </p>
        <img
          onClick={() => setSelectedUser(null)}
          src={assets.arrow_icon}
          alt="Back"
          className="md:hidden w-5 cursor-pointer"
        />
        <img
          src={assets.help_icon}
          alt="Help"
          className="max-md:hidden w-5 cursor-pointer"
        />
      </div>

      {/* Chat messages */}
      <div className="flex-1 min-h-0 overflow-y-auto p-3 text-white">
        {messagesDummyData.map((msg, index) => {
          const isCurrentUser = msg.senderId === '680f50e4f10f3cd28382ecf9';

          return (
            <div
              key={index}
              className={`flex flex-col mb-4 ${
                isCurrentUser ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`flex items-end gap-2 ${
                  isCurrentUser ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                {msg.image ? (
                  <img
                    src={msg.image}
                    alt=""
                    className="max-w-[230px] border border-gray-700 rounded-lg overflow-hidden"
                  />
                ) : (
                  <p
                    className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg break-all bg-violet-500/30 text-white ${
                      isCurrentUser ? 'rounded-br-none' : 'rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </p>
                )}
              </div>
              <span className="text-xs text-gray-400 mt-1 px-1">
                {formatMessageTime(msg.createdAt)}
              </span>
            </div>
          );
        })}
        <div ref={scrollEnd} />
      </div>

      {/* Bottom input area */}
      <div className="flex items-center gap-3 p-3 border-t border-stone-500/20 flex-shrink-0">
        <div className="flex-1 flex items-center bg-gray-100/12 px-3 rounded-full">
          <input 
            type="text" 
            placeholder="Send a message..."
            className="flex-1 text-sm p-3 border-none rounded-lg outline-none text-white placeholder-gray-400 bg-transparent"
          />
          <input type="file" id="image" accept="image/png, image/jpeg" hidden/>
          <label htmlFor="image">
            <img src={assets.gallery_icon} alt="" className="w-5 mr-2 cursor-pointer"/>
          </label>
        </div>
        <img src={assets.send_button} alt="" className="w-7 cursor-pointer"/>
      </div>
    </div>
  ) : (
    <div className="h-full flex flex-col justify-center items-center text-white px-4 text-center">
      <img src={assets.logo_icon} className="w-16 mb-4" alt="Logo" />
      <p className="text-lg font-medium">Chat anytime, anywhere with anyone.</p>
    </div>
  )
}

export default ChatContainer