import React, { useEffect, useState } from 'react'
import './Header.css'
import styles from '../App.module.css'

const Header = () => {
  const [theme, setTheme] = useState('light')
  
  // theme change
  if(!localStorage.theme) {
    window.localStorage.setItem('theme', theme)
  }
  useEffect(() => {
    if(localStorage.theme === 'light') {
      document.body.classList.remove('dark')
    } else {
      document.body.classList.add('dark')
    }
  }, [theme])

  function toggleTheme() {
    document.body.classList.toggle('dark');

    const nightBtn = document.querySelector('.night-btn');
    const dayBtn = document.querySelector('.day-btn');

    nightBtn.classList.toggle(styles.hide);
    dayBtn.classList.toggle(styles.hide);

    if(document.body.classList.contains('dark')) {
      localStorage.setItem('theme', 'dark')
      setTheme('dark')
    } else {
      localStorage.setItem('theme', 'light')
      setTheme('light')
    }
  }

  return (
    <header>
      <div className="header-content">
        <a href="#">Where in the World?</a>
        <div className="theme-btn">
          <p className="night-btn btn" onClick={toggleTheme}>
            <i className="fa-regular fa-moon night-icon"></i>&nbsp; Dark Mode
          </p>
          <p className={`day-btn btn ${styles.hide}`} onClick={toggleTheme}>
            <i className="fa-solid fa-sun"></i>&nbsp; Light Mode
          </p>
        </div>
      </div>
    </header>
  )
}

export default Header
