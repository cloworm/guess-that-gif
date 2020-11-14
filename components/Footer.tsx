import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.link}>
        <a href="https://github.com/cloworm/guess-that-gif" target="_blank" rel="noopener noreferrer">
          View on GitHub
        </a>
      </div>
    </footer>
  )
}
