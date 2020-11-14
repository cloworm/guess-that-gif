import { Fragment } from 'react'

export default function Repeat(props) {
  let items = [];
  for (let i = 0; i < props.numTimes; i++) {
    items.push(
      <Fragment key={i}>
        {props.children(i)}
      </Fragment>
    );
  }
  return <div>{items}</div>;
}
