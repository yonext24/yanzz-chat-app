import React, { useEffect, useState } from 'react' 
import './chatmessages.css'

export default function ChatMessages ({ destinatary, messages = [] }) {
  const [messagesState, setMessagesState] = useState(messages)

  useEffect(() => {
    setMessagesState(messages)
  }, [messages, destinatary])

  const handleSubmit = async () => {
    return
  }

  return <div className='chat-messages'>
     <header>
        <span>{destinatary.username}</span>
     </header>
     <div className='messages'>
      {
        messagesState.map(message => {
          return <div key={message.id} className={`message${message.fromSelf ? ' isFromSelf' : ''}`}>{message.message}</div>
        })
      }
     </div>

     <footer>
      <form onSubmit={handleSubmit}>
        <input type='text'></input>
        <input type='submit'></input>
      </form>
     </footer>
  </div>
}