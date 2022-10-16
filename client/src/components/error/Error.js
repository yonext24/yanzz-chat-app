import React, { useEffect, useState } from 'react'
import './error.css'

export default function Error({ error, parentSetError }) {
  const [showing, setShowing] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setShowing(true)
    }, 100)
    setTimeout(() => {
      setShowing(false)
    }, 3000)
    setTimeout(() => {
      parentSetError(false)
    }, 3250)
  }, [parentSetError])

  return <div className={`error-container ${showing ? 'visible' : ''}`}>
    <span className='error'>{error}</span>
  </div>
}