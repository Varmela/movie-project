import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import "./movie.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FavoriteContext } from "../../App";
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import { ThemeContext } from "../../ThemeContext";

function MovieCard({ movies, categories }) {
  const nav = useNavigate();

 
  const {isLightMode} = useContext(ThemeContext);

  function handleGoToSingleMovie() {
    nav(`/movie/${movies.id}`);
  }
  const { favoriteMovieIds, setFavoriteMovieIds } = useContext(FavoriteContext);

  function checkIfMovieIsInLocalStorage() {
    const favoriteMovie = favoriteMovieIds.find(
      (movie) => movie.id === movies.id
    );
    if (favoriteMovie) return true;
    return false;
  }

  const addToFavorite = (e) => {
    // Check if user is logged in
  const isLoggedIn = localStorage.getItem('token');

  if (!isLoggedIn) {
    // If user is not logged in, redirect to login page
    nav('/login');
    return; // Exit the function to prevent further execution
  }
    if (checkIfMovieIsInLocalStorage()) {
      const updateListOfFavoriteMovie = favoriteMovieIds.filter(
        (movie) => movie.id !== movies.id
      );
      setFavoriteMovieIds(updateListOfFavoriteMovie);
    } else {
      e.stopPropagation();
      setFavoriteMovieIds([
        ...favoriteMovieIds,
        { id: movies.id, title: movies.title },
      ]);
    }
  };

  

 

  return (
    <div  className="cards">
      <Card style={{ width: "18rem", border: "0px solid black" }}>
        <Card.Img
          variant="top"
          src={"https://image.tmdb.org/t/p/original/" + movies.poster_path}
        />
        <Card.Body
          className="card-body"
          style={{
            background: isLightMode ? "white" : "#0d262f",
            color: isLightMode ? "#0d262f" : "white",
          }}
        >
          <div>
            <Card.Title>{movies.title}</Card.Title>
            <div className="genres">
              {categories.slice(0, 2).map((category, index) => (
                <Badge pill bg="dark" key={index}>
                  {category}
                </Badge>
              ))}
            </div>
            <br />
            <Button className="open-movie"
              onClick={handleGoToSingleMovie}
              style={{ backgroundColor: "orange" }}
            >
              Open
            </Button>
          </div>
          <button style={{
            background: isLightMode ? "white" : "#0d262f",
            color: isLightMode ? "#0d262f" : "white",
          }} className="heart" onClick={addToFavorite}>
            {checkIfMovieIsInLocalStorage() ? (
              <MdOutlineFavorite onClick={addToFavorite} className="heart" />
            ) : (
              <MdOutlineFavoriteBorder className="heart" />
            )}
          </button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default MovieCard;
