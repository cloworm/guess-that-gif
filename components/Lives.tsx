import Repeat from './Repeat'

export default function Lives({ number }) {
  return (
    <div>
      <Repeat numTimes={number}>
        <span>X</span>
      </Repeat>
    </div>
  )
}
