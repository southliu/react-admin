import { Link } from "react-router-dom"

function Test() {
  return (
    <div>
      <Link className="mr-20px" to="/login">to login</Link>
      <Link to="/dashboard">to dashboard</Link>
    </div>
  )
}

export default Test