import Repeat from './Repeat'

export default function Lives({ number }) {
  if (number > 3 || number < 0) {
    number = 0;
  }

  return (
    <div>
      <Repeat numTimes={number}>
        {() => <span>X</span>}
      </Repeat>
    </div>
  )
}
