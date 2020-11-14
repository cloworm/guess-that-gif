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

  const onClick = useCallback(
    (event) => {
      event.preventDefault();
      onPress()
    },
    [onPress]
  )

  return (
    <a href="#" onClick={onClick} className={styles.btn}>{label}</a>
  )
}
