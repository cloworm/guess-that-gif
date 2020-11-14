import Score from '../components/Score'
import Lives from '../components/Lives'
import styles from './game.module.css'
import Gif from '../components/Gif'
import Button from '../components/Button'

export default function Game() {
  return (
    <div className="container">
      <main>
        <div className={styles.statusContainer}>
          <Lives number={3} />
          <Score value={0} />
        </div>
        <Gif />

        <Button onPress={() => {console.log('pressed Coarse')}} label="Coarse" />
        <Button onPress={() => {console.log('pressed Corse')}} label="Corse" />
        <Button onPress={() => {console.log('pressed Course')}} label="Course" />
      </main>
    </div>
  )
}
