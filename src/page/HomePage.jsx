
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieList from "../components/movieList/MovieList";
import { ThemeContext } from "../ThemeContext";
import Carousel from '../components/carusel/Carousel';
import CinemaDetails from "../components/cinemaDetails/CinemaDetails";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const HomePage = () => {
  const nav = useNavigate();
  const themeFromLocalStorage = localStorage.getItem("theme");
  const mode = themeFromLocalStorage
    ? themeFromLocalStorage === "lightMode"
    : true;
  const [isLightMode, setIsLightMode] = useState(mode);
  return (
    <ThemeContext.Provider value={{ isLightMode, setIsLightMode }}>
      <Header />
      <Carousel/>
     
      <MovieList />
      <Footer/>
      
      {/*<CinemaDetails/>*/}
      
    </ThemeContext.Provider>
  );
};

export default HomePage;
