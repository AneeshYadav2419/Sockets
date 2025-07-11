import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import './index.css'


function App() {
  const [messages , setMessages] = useState(["hi there",'kive aa']);

  const wsRef = useRef ();
  useEffect(() => {
    const ws = new WebSocket("http://localhost:8080");
    ws.onmessage = (event) => {
      setMessages(m => [...m , event.data])
    }
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(JSON.stringify({
        type :"join",
      payload:{
        roomId :"red"
      }    
      }))
    }
    return () => {
      ws.close()
    }
  },[]);
  return (
    <div className='h-screen bg-black'>
      <br /> <br /> <br />  
      <div className='h-[90vh]'>
        {messages.map(messages => <div className='m-8'>
          <span className='bg-white text-black rounded p-4
           m-8'>
            {messages}
            </span>  
            </div>)}
      </div>
         <div className='w-full bg-white flex '>
        <input id="message" className=' flex-1 p-4 border-2'></input>
        <button onClick = {() => {
          const message = document.getElementById("message")?.Value;
          wsRef.current.send(JSON.stringify({
            type: "chat",
            payload : {
              message:message
            }
          }))
        }}     className='bg-purple-600 text-white p-4 '>
          Send Message
          </button>
         </div>
    </div>

  )
}

export default App
