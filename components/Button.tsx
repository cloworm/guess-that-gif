import { useCallback } from 'react'

import styles from './Button.module.css'
import Link from 'next/link'

interface Props {
  label: string;
  path?: string;
  onPress: () => void;
}

export default function Button({ label, path, onPress }: Props) {
  if (path) {
    return (
      <Link href={path}>
        <a className={styles.btn}>{label}</a>
      </Link>
    )
  }

  return (
    <a href="#" onClick={(event) => {event.preventDefault(); onPress()}} className={styles.btn}>{label}</a>
  )
}
