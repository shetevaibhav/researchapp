import React from 'react'
import {Link} from 'react-router-dom'

const Mainheader = () => {
  return (
    <div>
       {/* navbar start */}
       <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">Research Gate</Link>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav navitem">
    <li class="nav-item active">
        { <Link class="nav-link" to="/">LOG OUT</Link> }
      </li>
    </ul>
   </div>
</nav>
 {/* navbar end */}
    </div>
  )
}

export default Mainheader
