import { useState } from "react";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { MdOutlineFavorite } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { getAllMovies } from "../api";
import MovieCard from "../components/movieList/MovieCard"; 

const FavoriteMovie = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['favorite-movie'],
    queryFn: getAllMovies
  });

  const [isFavorite, setIsFavorite] = useState(false);

 
  const addAllToFavorite = () => {
    setIsFavorite(true); 
  };

  return (
    <div>
   
      {isFavorite ? (
        <MdOutlineFavorite
          style={{ color: "white", fontSize: "30px" }}
          onClick={() => {
            setIsFavorite(false);
          }}
        />
      ) : (
        <MdOutlineFavoriteBorder
          style={{ color: "white", fontSize: "30px" }}
          onClick={addAllToFavorite} 
        />
      )}
    
      {isFavorite && data?.map(movie => (
        <MovieCard key={movie.id} movies={movie} />
      ))}
    </div>
  );
};

export default FavoriteMovie;
