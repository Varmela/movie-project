import React from 'react'
import { AiOutlineStop } from "react-icons/ai";
import { Link } from 'react-router-dom';
const UnauthorizedPage = () => {
  return (
    <div style={{textAlign:'center',color:'red'}}>
    <AiOutlineStop size={'150px'} />
    <h1>Sorry, you are not authorized to access this page.</h1>
    <h3> Please contact your administrator for assistance or log in with appropriate credentials </h3>
    <h5>Please click <Link to='/'>here  </Link> to go to the home page </h5>
    
    </div>
  )
}

export default UnauthorizedPage
