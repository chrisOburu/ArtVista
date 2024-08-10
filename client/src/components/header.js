import { useState } from 'react'
import '../styles/header.css'

function Header() {


  return (
    <>
        <header id='header'>
            <div id='nav-logo'className='nav-item'><span></span></div>
            <nav id='navbar'>
              <div id='nav-search'>
                <input type='search' placeholder='search' />
                <i class="bi bi-search"></i>
              </div>
              <div className="nav-item" id='nav-login'>
                <h2>login</h2>
              </div>
              <div className="nav-item" id='nav-register'>
                <h2>register</h2>
              </div>
            </nav>

        </header>
    </>
  )
}
