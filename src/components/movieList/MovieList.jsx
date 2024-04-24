import { useQuery } from "@tanstack/react-query";
import MovieCard from "./MovieCard";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { getAllMovies } from "../../api";
import { useContext } from "react";
import { ThemeContext } from "../../ThemeContext";
import { getAllGenres } from "../../api";
import { FavoriteContext } from "../../App";
function MovieList({movies
}) {
  const { isLightMode } = useContext(ThemeContext);
 const {favoriteMovieIds,setFavoriteMovieIds} = useContext(FavoriteContext);
  const { data, isPending, isError } = useQuery({
    queryKey: ["movie-list"],
    queryFn: getAllMovies,
  });

  const { data: genresData } = useQuery({
    queryKey: ['movie-genres'],
    queryFn: getAllGenres
  });

  if (isError) {
    return <p>Something went wrong</p>;
  }
  if (isPending){ return "Loading..."};


  const addToFavorite = (e) => {
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
    <section
      style={{
        background: isLightMode ? "white" : "#0d262f",
        color: isLightMode ? "#0d262f" : "white",
      }}
      className="movies-list"
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
                addToFavorite={() => addToFavorite(movie.id, movie.title)}
                isFavorite={favoriteMovieIds.some(favMovie => favMovie.id === movie.id)}
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