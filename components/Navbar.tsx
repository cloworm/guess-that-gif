import styles from './Navbar.module.css'
import Link from 'next/link'

interface Props {
  hasBackButton: boolean,
}

export default function Navbar({
  hasBackButton,
}: Props) {
  return (
    <div className={styles.navbar}>
      { hasBackButton && (
        <Link href="/">
          ⬅
        </Link>
      ) }
    </div>
  )
}
