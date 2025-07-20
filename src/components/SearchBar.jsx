import React from 'react'
import styles from '../App.module.css'

const SearchBar = ({searchFunction}) => {
  return (
    <>
        <i className="fa-solid fa-magnifying-glass"></i>
        <input type="text" placeholder="Search for a country....." className={styles["search-bar"]} onChange={searchFunction} />
    </>
  )
}

export default SearchBar