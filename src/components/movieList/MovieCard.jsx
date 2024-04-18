import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./movie.css";
import { useNavigate } from "react-router-dom";


function MovieCard({ movies,categories }) {
  const nav = useNavigate();
  function handleGoToSingleMovie() {
    nav(`/movie/${movies.id}`);
  }
  
  return (
    <div className="cards">
      <Card style={{ width: "18rem", border: "0px solid black" }}>
        <Card.Img
          variant="top"
          src={"https://image.tmdb.org/t/p/original/" + movies.poster_path}
        />
        <Card.Body style={{ backgroundColor: "#0d262f", color: "white" }}>
          <Card.Title>{movies.title}</Card.Title>
          <Card.Text>{categories}</Card.Text>
          <Button
            onClick={handleGoToSingleMovie}
            style={{ backgroundColor: "orange" }}
          >
            Open
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default MovieCard;
