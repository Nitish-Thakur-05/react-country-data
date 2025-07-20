import React from 'react'
import styles from './HomePageShimmer.module.css'

export default function HomePageShimmer() {

    const maped = new Array(10).fill(undefined)

  return (
    maped.map((el, i) => {
        return (<div className={styles["skeleton-card"]} key={i}>
                <div className={`${styles.skeleton} ${styles.flag}`}></div>
                <div className={`${styles.skeleton} ${styles.text} ${styles.title}`}></div>
                <div className={`${styles.skeleton} ${styles.text}`}></div>
                <div className={`${styles.skeleton} ${styles.text}`}></div>
                <div className={`${styles.skeleton} ${styles.text}`}></div>
            </div>
        )
    })
  )
}
