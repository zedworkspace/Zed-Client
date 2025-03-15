import { Mic, MicOff, MonitorUp, PhoneOff, VideoOff } from 'lucide-react';
import React, { useState } from 'react'

const VoiceChannel = () => {
  const [mic,setMic] = useState(false);
  const user = [1,2];
  return (
    <div className='h-full bg-black'>
      <div className='h-full w-[100%] flex flex-col'>
      <div className="top w-full h-[80%] flex justify-center items-center gap-5 content-center flex-wrap">
           {
            user.map(()=>{
              return(
                <div className='w-[30rem] bg-primary h-[18rem] rounded-md flex flex-col p-3'>
                <div className='w-full h-[90%] flex justify-center items-center'><img className='h-16 w-16 rounded-full' src="https://res.cloudinary.com/dbr7bctve/image/upload/v1740980674/ts6i7dv7so2cawlsfhkt.png" alt="" /></div>
                <div className='flex justify-between px-5 w-full h-[10%]' >
                  <span>Abahy</span>
                  <span className='w-6 h-6 bg bg-gray-700 rounded-full flex justify-center items-center'><MicOff className='w-4 h-4 bg'/></span>
                </div>
              </div>
              )
            })
           } 
        </div>
        <div className="bottom w-full h-[20%] flex justify-center">
          <div className='w-[40%] flex justify-center items-center gap-5'>
              <button className='w-14 h-14 bg-primary rounded-full flex justify-center items-center'><VideoOff/></button>
              <button className='w-14 h-14 bg-primary rounded-full flex justify-center items-center'><MonitorUp/></button>
              <button onClick={()=>setMic(!mic)} className={`w-14 h-14 ${mic?'bg-gray-500':"bg-primary"} rounded-full flex justify-center items-center`}>{mic?<Mic/>:<MicOff/>}</button>
              <button className='w-14 h-14 bg-red-500 rounded-full flex justify-center items-center'><PhoneOff/></button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VoiceChannel
