import { useNavigate } from 'react-router-dom'
import error from '../assets/error.gif'
import styles from './Error.module.css'

export default function Error() {
  const navigate = useNavigate()

  function backBtn() {
    navigate('/')
  }

  return (
    <section className={styles.container}>
      <h1 className={styles.errMsg}>Look like you're lost</h1>
      <div className={styles.imgContainer}>
          <img src={error} alt="error-gif" className={styles.errorImg} loading='lazy'/>
      </div>
      <p>The page you are looking for is not available!</p>
      <button onClick={backBtn}>Go Back</button>
    </section>
  )
}
