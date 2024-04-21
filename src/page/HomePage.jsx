import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieList from "../components/movieList/MovieList";
import { ThemeContext } from "../ThemeContext";
import Carousel from "../components/carusel/Carousel";
import CinemaDetails from "../components/cinemaDetails/CinemaDetails";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
export const FavoriteContext = createContext({
  favoriteMovieIds: [],
  setFavoriteMovieIds: () => {},
});
const HomePage = () => {
  let movie_ids_from_local_storage = [];
const storedValue = localStorage.getItem("favorite_movies_ids");

if (storedValue) {
  try {
    movie_ids_from_local_storage = JSON.parse(storedValue);
    if (!Array.isArray( movie_ids_from_local_storage)) {
      movie_ids_from_local_storage = []; // Set to an empty array if the stored value is not an array
    }
  } catch (error) {
    console.error("Error parsing JSON from localStorage:", error);
    // Handle the error accordingly
  }
}
  const [favoriteMovieIds, setFavoriteMovieIds] = useState(
    movie_ids_from_local_storage
  );
  
  useEffect(() => {
    localStorage.setItem(
      "favorite_movies_ids",
      JSON.stringify(favoriteMovieIds)
    );
  }, [favoriteMovieIds]);
  const nav = useNavigate();
  const themeFromLocalStorage = localStorage.getItem("theme");
  const mode = themeFromLocalStorage
    ? themeFromLocalStorage === "lightMode"
    : true;
  const [isLightMode, setIsLightMode] = useState(mode);
  return (
    <ThemeContext.Provider value={{ isLightMode, setIsLightMode }}>
      <FavoriteContext.Provider
        value={{ favoriteMovieIds, setFavoriteMovieIds }}
      >
        <Header />
        <Carousel />

        <MovieList />
        <Footer />

        {/*<CinemaDetails/>*/}
      </FavoriteContext.Provider>
    </ThemeContext.Provider>
  );
};

export default HomePage;
