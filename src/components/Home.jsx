import React from 'react'
import "../styles/home.css"

import Inbox from './Inbox'
import Board from './Board'

const Home = () => {
  return (
    <div className="home">
        <Inbox/>
        <Board/>
    </div>
  )
}

export default Home