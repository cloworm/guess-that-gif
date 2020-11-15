import { useCallback } from 'react'

import styles from './GameButton.module.css'

interface Props {
  label: string;
  onPress?: () => void;
}

export default function GameButton({
  label,
  onPress,
}: Props) {

  const onClick = useCallback(
    (event) => {
      event.preventDefault();
      onPress && onPress()
    },
    [onPress]
  )

  return (
    <a href="#" onClick={onClick} className={styles.btn}>{label}</a>
  )
}
