import "./movie.css";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getSingleMovie } from "../../api";
import Card from "react-bootstrap/Card";
import { FaPlay } from "react-icons/fa";
//import Header from "../header/Header";


const SinglePageMovie = () => {
  const params = useParams();

  const { data, isPending, isError } = useQuery({
    queryKey: ["movie-search", params.id],
    queryFn: () => getSingleMovie(parseInt(params.id || "")),
  });
  
  return (
    <>

    <div className="details">
      <Card style={{ width: "25rem", border: "0px solid black" }}>
        <Card.Img
          variant="top"
          src={"https://image.tmdb.org/t/p/original/" + data?.poster_path}
        />
      </Card>
      <div style={{ color: "black" }} className="details-movie">
        <h1 className="movie-title">{data?.title}</h1>
        <p className="movie-description">{data?.overview}</p>
        <h4 className="movie-relade">{data?.release_date}</h4>
        <button ><FaPlay />Play Trailer</button>
      </div>
    </div>
    </>
    
  );
};

export default SinglePageMovie;
