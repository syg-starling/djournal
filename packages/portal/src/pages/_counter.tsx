import { useAppSelector } from "../hooks"
import { selectCount } from "../reducers/appSlice"

const Counter = () => {
  const counter = useAppSelector(selectCount)
  return <div>Sample counter is: {counter}</div>
}

export default Counter