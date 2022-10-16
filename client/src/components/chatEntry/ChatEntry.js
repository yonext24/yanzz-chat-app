import React from 'react' 
import './chatentry.css'
import defaultAvatar from '../../user.png'

export default function ChatEntry ({ fullData, username, avatar, chatChange }) {

  const handleChatChange = () => {
    chatChange(fullData)
  }

  return <article className='chat-user'>
    <button onClick={handleChatChange}>
      <img className='chat-avatar' alt='avatar' src={avatar || defaultAvatar} />
      <span className='chat-username'>{username}</span>
    </button>
  </article>
}