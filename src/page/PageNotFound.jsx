import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import image from './notFound.png';
const PageNotFound = () => {
    const nav = useNavigate();
    setTimeout(() => {
        nav("/");
      }, 80000);

  return (
    <div style={{display:'flex',padding:'40px'}} className='page-not-found'>
    <div>
    <img style={{width:'600px',height:'600px'}} src={image}/>
    </div>
    <div>
    <p style={{fontSize:'50px'}}>404 we could not find the page you are looking for 😭😭</p> 
    <Link to="/">Go to homepage</Link>
    </div>
    
    
    </div>
  )
}

export default PageNotFound