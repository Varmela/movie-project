import { useQuery } from "@tanstack/react-query";
import MovieCard from "./MovieCard";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { getAllMovies } from "../../api";
import { useContext } from "react";
import { ThemeContext } from "../../ThemeContext";
import { getAllGeners } from "../../api";
function MovieList() {
  const { isLightMode } = useContext(ThemeContext);
  const { data, isPending, isError } = useQuery({
    queryKey: ["movie-list"],
    queryFn: getAllMovies,
  });

  const { data: genresData } = useQuery({
    queryKey: ['movie-geners'],
    queryFn: getAllGeners
  });

  if (isError) {
    return <p>Something went wrong</p>;
  }
  if (isPending) return "Loading...";

  return (
    <section
      style={{
        background: isLightMode ? "white" : "#0d262f",
        color: isLightMode ? "#0d262f" : "white",
      }}
      className="movie-list"
    >
      <Row xs={1} md={4} className="g-4">
        {data.map((movie, index) => {
          const categories = getGenresNames(movie.genre_ids, genresData);
          return (
            <Col key={index}>
              <MovieCard
                style={{ backgroundColor: "#0d262f" }}
                categories={categories}
                movies={movie}
              />
            </Col>
          );
        })}
      </Row>
    </section>
  );
}

export default MovieList;


export function getGenresNames(genres_ids, genresData) {
  if (!genresData) return [""];

  const finalCategories = [];


  genres_ids.forEach((genre_id) => {
    genresData.forEach((genre_from_api) => {
      if (genre_from_api.id === genre_id) {
        finalCategories.push(genre_from_api.name)
      }
    })
  })
  return finalCategories
}