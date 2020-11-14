import styles from './Button.module.css'
import Link from 'next/link'

export default function Button({ label, path }) {
  if (path) {
    return (
      <Link href={path}>
        <a className={styles.btn}>{label}</a>
      </Link>
    )
  }

  return (
    <a href="#" onClick={(event) => {event.preventDefault()}} className={styles.btn}>{label}</a>
  )
}
