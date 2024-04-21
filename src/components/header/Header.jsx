import React from "react";
import { Switch } from "antd";
import { useContext, useState } from "react";
import { ThemeContext } from "../../ThemeContext";
import logo from "./logo2.jpg";
import { Link, useNavigate } from "react-router-dom";
import { MdFavorite } from "react-icons/md";
import "./header.css";
function Header() {
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

  //search part
  const [query, setQuery] = useState("");
  function handleSearch() {
    const splitQuery = query.split(" ").join("+").trim();
    nav("/search/" + splitQuery);
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
      <div style={{ width: "30%" }} className="search">
        <form className="d-flex">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={(event) => setQuery(event.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </form>
      </div>
      <div className="links">
        <Switch
          defaultChecked={!context.isLightMode}
          onChange={handleSwitchOnChange}
        />
        <Link to="/">Home</Link>

        <Link  to="/favorite-movie"><MdFavorite size={'30px'} />My Favorites</Link>
      </div>
    </nav>
  );
}

export default Header;
