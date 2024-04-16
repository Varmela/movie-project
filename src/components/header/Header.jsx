import React from "react";
import logo from "./logo2.jpg";
import { Link } from "react-router-dom";
import "./header.css";
function Header() {
  return (
   
      <nav className="navbar">
        <div className='title'>
          <img className="image" src={logo} />
          <h3>Cinema + </h3>
        </div>
        <div style={{width:'30%'}} className="search">
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button style={{backgroundColor:'orange'}} className="btn btn-outline" type="submit">
              Search
            </button>
          </form>
        </div>
        <div className="links">
        
        <Link to="/">Home</Link>

          <a href="#">My Favorites</a>
          
        </div>
      </nav>
  
  );
}

export default Header;
