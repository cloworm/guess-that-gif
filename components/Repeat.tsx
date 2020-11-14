import { Fragment } from 'react'
interface Props {
  children: ((i: number) => JSX.Element) | JSX.Element;
  numTimes: number;
}

export default function Repeat({
  children,
  numTimes,
}: Props) {
  let items = [];
  for (let i = 0; i < numTimes; i++) {
    if (typeof children === 'function') {
      items.push(children(i))
    } else {
      items.push(
        <Fragment key={i}>
          {children}
        </Fragment>
      );
    }
  }
  return <div>{items}</div>;
}
