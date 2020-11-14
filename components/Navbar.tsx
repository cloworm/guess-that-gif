import styles from './Navbar.module.css'
import Link from 'next/link'

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <Link href="/">
        <span className={styles.title}>Guess That Gif<em>!</em></span>
      </Link>
    </div>
  )
}
