import { useEffect, useState } from "react";
import axios from "axios";


export default function useChatFetch (id) {
  
  const [messages, setMessages] = useState([])
  const [getMessagesLoading, setGetMessagesLoading] = useState(false)
  const [getMessagesError, setGetMessagesError] = useState(false)
  
  useEffect(() => {
    
    const getMessages = async () => {
      setGetMessagesLoading(true)
      if (!id) return
      try {
        const res = await axios.get(process.env.NODE_ENV === 'production' ? 'fill' : 'http://localhost:8800/api/chat/'+id, {
          withCredentials: true,
          credentials: true
        })
        if (res) setMessages(res.data)
      }
      catch (err) {
        setGetMessagesError(true)
      }

      setGetMessagesLoading(false)
      }

    getMessages()
  }, [id])
  return { messages, getMessagesError, getMessagesLoading }
} 