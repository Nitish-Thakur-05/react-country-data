import React from 'react'
import styles from './Country.module.css'

export default function Spinner() {
  return (
    <div className={styles['spinner-container']}>
        <div className={styles.spinner}></div>
        <h2>Please Wait While We Are Fetching Data.....</h2>
    </div>
  )
}
