import styles from './Button.module.css'
import Link from 'next/link'

export default function Button({ label }) {
  return (
    <Link href="/">
      <a className={styles.btn}>{label}</a>
    </Link>
  )
}
