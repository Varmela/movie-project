import React from "react";
import { Switch } from "antd";
import { useContext, useState } from "react";
import { ThemeContext } from "../../ThemeContext";
import logo from '../../components/header/logo2.jpg';
import { Link, useNavigate } from "react-router-dom";
import { MdFavorite } from "react-icons/md";
import { LoginOutlined } from "@ant-design/icons";
import { BsFillTicketPerforatedFill } from "react-icons/bs";
import { GrUserAdmin } from "react-icons/gr";
function NavAdmin() {
  const context = useContext(ThemeContext);
  const nav = useNavigate();

  
  function handleSwitchOnChange(checked) {
    if (checked) {
      localStorage.setItem("theme", "darkMode");
    } else {
      localStorage.setItem("theme", "lightMode");
    }
    context.setIsLightMode(!checked);
  }



  return (
    <nav
      style={{
        background: context.isLightMode ? "white" : "#323c4d",
        color: context.isLightMode ? "#323c4d" : "white",
      }}
      className="navbar"
    >
      <div className="title">
        <img className="image" src={logo} />
        <h3>Cinema + </h3>
      </div>
      <div className="links">
        <Switch
          defaultChecked={!context.isLightMode}
          onChange={handleSwitchOnChange}
        />
        <Link style={{
          background: context.isLightMode ? "white" : "#323c4d",
          color: context.isLightMode ? "#323c4d" : "white",
        }} to="/">Home</Link>
      <Link style={{
        background: context.isLightMode ? "white" : "#323c4d",
        color: context.isLightMode ? "#323c4d" : "white",
      }} onClick={()=> {
        localStorage.removeItem('token')
        nav('/login')
      }}><LoginOutlined /></Link>
        <Link style={{
          background: context.isLightMode ? "white" : "#323c4d",
          color: context.isLightMode ? "#323c4d" : "white",
        }}  to="/favorite-movie"><MdFavorite size={'30px'} />My Favorites</Link>
       <Link style={{
        background: context.isLightMode ? "white" : "#323c4d",
        color: context.isLightMode ? "#323c4d" : "white",
      }} to='/ticket'> <BsFillTicketPerforatedFill size={'30px'} /></Link>

      <Link style={{
        background: context.isLightMode ? "white" : "#323c4d",
        color: context.isLightMode ? "#323c4d" : "white",
      }} to='/admin-dashboard'> <GrUserAdmin size={'30px'} /></Link>
      
      </div>
    </nav>
  );
}

export default NavAdmin;
