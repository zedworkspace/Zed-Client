import { Github } from 'lucide-react'
import React from 'react'

const TrackerHeader = () => {
  return (
    <div className="p-3 sticky border-b border-primary/50 text-base flex gap-2  bg-black text-white/70">
    <Github/>
    <span>Git Hub</span>
  </div>
  )
}

export default TrackerHeader
