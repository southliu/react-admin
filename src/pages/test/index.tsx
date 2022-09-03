import type { AppDispatch, RootState } from "@/stores"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '@/stores/menu'

function Test() {
  const count = useSelector((state: RootState) => state.menu.value)
  const dispatch: AppDispatch = useDispatch()

  return (
    <div>
      <Link className="mr-20px" to="/login">to login</Link>
      <Link to="/dashboard">to dashboard</Link>

      <div>{ count }</div>
      <button onClick={() => dispatch(increment())}>累加</button>
      <button onClick={() => dispatch(decrement())}>递减</button>
    </div>
  )
}

export default Test