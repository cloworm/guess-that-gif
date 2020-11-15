import Score from '../components/Score'
import Lives from '../components/Lives'
import styles from './game.module.css'
import Gif from '../components/Gif'
import GameButton from '../components/GameButton'

export default function Game() {
  return (
    <div className="container">
      <main>
        <div className={styles.statusContainer}>
          <Lives number={3} />
          <Score value={0} />
        </div>
        <Gif />

        <GameButton onPress={() => {console.log('pressed Coarse')}} label="Coarse" />
        <GameButton onPress={() => {console.log('pressed Corse')}} label="Corse" />
        <GameButton onPress={() => {console.log('pressed Course')}} label="Course" />
      </main>
    </div>
  )
}
