import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const PageNotFound = () => {
    const nav = useNavigate();
    setTimeout(() => {
        nav("/");
      }, 8000);

  return (
    <div className='page-not-found'>
    <h1> Error 404</h1>
    <h3>😭</h3>
    <Link to="/">Go to homepage</Link>
    
    </div>
  )
}

export default PageNotFound