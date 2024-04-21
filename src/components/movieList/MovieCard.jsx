import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import "./movie.css";
import { useNavigate } from "react-router-dom";
import FavoriteMovie from "../../page/FavoriteMovie";
import { useContext,useState } from "react";
import { FavoriteContext } from "../../page/HomePage";

function MovieCard({ movies, categories }) {
  const nav = useNavigate();
  function handleGoToSingleMovie() {
    nav(`/movie/${movies.id}`);
 
  }
  const context = useContext(FavoriteContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const addToFavorite = (e) => {
    e.stopPropagation();
    const updatedFavoriteIds = [...context.favoriteMovieIds, movies.id];
    context.setFavoriteMovieIds(updatedFavoriteIds);
    setIsFavorite(true);
    localStorage.setItem("favorite_movies_ids", JSON.stringify(updatedFavoriteIds));
  };

  return (
    <div className="cards">
      <Card style={{ width: "18rem", border: "0px solid black" }}>
        <Card.Img
          variant="top"
          src={"https://image.tmdb.org/t/p/original/" + movies.poster_path}
        />
        <Card.Body className="card-body" style={{ backgroundColor: "#0d262f", color: "white" }}>
         <div>
         
        <Card.Title>{movies.title}</Card.Title>
          <div className="genres">
            {categories.slice(0, 2).map((category, index) => (
              <Badge pill bg="dark" key={index} >{category}</Badge>
            ))}
         
          </div>
          <br/>
          <Button
            onClick={handleGoToSingleMovie}
            style={{ backgroundColor: "orange" }}
          >
            Open
          </Button>
          </div>
          {isFavorite ? "Movie exists in favorite list" : ""}
          <FavoriteMovie onClick={addToFavorite} className="heart" />
        </Card.Body>
       
      </Card>
    </div>
  );
}

export default MovieCard;
