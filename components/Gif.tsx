import styles from './Gif.module.css'

interface Props {
  url: string
}

export default function Gif({
  url,
}: Props) {
  return (
    <img
      src={url}
      className={styles.img}
    />
  )
}
