import { useQuery } from "@tanstack/react-query";
import { getAllMovies } from "../api";
import MovieCard from "../components/movieList/MovieCard";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Carousel from "../components/carusel/Carousel";
function HomePage() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["movie-list"],
    queryFn: getAllMovies,
  });

  if (isError) {
    return <p>Something went wrong</p>;
  }
  if (isPending) return "Loading...";

  return (
    <section style={{backgroundColor:' #0d262f'}} className="movie-list">
    <Carousel/>
    <Row xs={1} md={4} className="g-4">
    {data.map((movie,index) => (
        // <div key={movie.id}>
        //   <h4>{movie.title}</h4>
        //   <p>{movie.overview}</p>
        //   <img src={movie.poster_path} alt={movie.title} />
        // </div>
      
     
    <Col key={index}>

    <MovieCard style={{backgroundColor:' #0d262f'}} movies = {movie}/>
  
    </Col>

    ))}
    </Row>
     
    </section>
  );
}

export default HomePage;
