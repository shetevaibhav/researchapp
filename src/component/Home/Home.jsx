import React from 'react'
import './Home.css'
import Img from '../../Images/img.jpg'
import {Link} from 'react-router-dom'

const Home = () => {
  return (
    <div>
   <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <Link className="navbar-brand" to="/">Research Gate</Link>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav navitem">
    <li class="nav-item active">
        <Link class="nav-link" to="/dashboard">LOG IN </Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link" to="/studyform">JOIN FOR FREE</Link>
      </li>
    </ul>
  </div>
</nav>
 {/* section start */}
 <div class="container">
  <div class="row">
    <div class="col">
    <h3 className='title'>
    Welcome to Research Gate We Are
    Providing Services on Research 
    Record Management.
    </h3>
    <button type="button" className="btn btn-info btn1">
    <Link class="nav-link" to="/dashboard">LOG IN </Link>
    </button>
    <button type="button" className="btn btn-dark btn2">
    <Link class="nav-link" to="/studyform">SIGN UP</Link>
    </button>
    </div>
    <div class="col">
      <img src={Img} alt=""></img>
    </div>
  </div>
</div>
{/* section start */}
</div>
  )
}
export default Home;
