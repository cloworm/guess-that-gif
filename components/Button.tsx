import styles from './Button.module.css'
import Link from 'next/link'

export default function Button({ label, path }) {
  return (
    <Link href={path}>
      <a className={styles.btn}>{label}</a>
    </Link>
  )
}
