import React, { useState, useContext } from 'react' 
import './home.css'
import { UserContext } from '../../contexts/UserContext'
import ChatEntry from '../../components/chatEntry/ChatEntry'
import useChatFetch from '../../hooks/useChatFetch'
import ChatMessages from '../../components/chatMessages/ChatMessages'
import WelcomePage from '../../components/welcomePage/WelcomePage'
import Loading from '../../components/loading/Loading'
import ChatError from '../../components/chatError/ChatError'


export default function Home () {
  const [currentChat, setCurrentChat] = useState(null)
  const { messages, getMessagesError, getMessagesLoading } = useChatFetch(currentChat?._id)

  const { user } = useContext(UserContext)

  return <div className='main'>
    <div className='chats-container'>
      <section className='chats-list'>
        {
          user.hasChatsWith.map( singleUser => {
            return <ChatEntry fullData={singleUser} username={singleUser.username} chatChange={setCurrentChat} avatar={singleUser.avatarImage} key={singleUser._id} />
          })
        }
      </section>
      <section className='chat'>
        {
          getMessagesError ? <ChatError /> : 
          currentChat 
          ? getMessagesLoading ? <Loading /> :<ChatMessages destinatary={currentChat} messages={messages} />
          : <WelcomePage />
        }
      </section>
    </div>
  </div> 
}