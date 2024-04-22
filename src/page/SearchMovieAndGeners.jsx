import { useQuery } from '@tanstack/react-query';
import { useParams } from "react-router-dom"
import { getAllGenres, getSearchResults } from '../api';
import MovieCard from '../components/movieList/MovieCard';
import { getGenresNames } from '../components/movieList/MovieList';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { FavoriteContext } from '../App';
import { useContext } from 'react';
import Header from '../components/header/Header';
const SearchMovieAndGeners = ({movies}) => {
    const { favoriteMovieIds, setFavoriteMovieIds } = useContext(FavoriteContext);
    
    function checkIfMovieIsInLocalStorage() {
        const favoriteMovie = favoriteMovieIds.find(
          (movie) => movie.id === movies.id
        );
        if (favoriteMovie) return true;
        return false;
      }
    
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
    

    const params = useParams();
    const {data,isPending,isError} = useQuery({
        queryKey:['movie-search'],
        queryFn: ()=>getSearchResults(params.query || '')
    });
    const {genresData} = useQuery({
        queryKey: ['movie-genre'],
        queryFn:getAllGenres
    });

    if(isError){
        return <p>Somethingis wrong!</p>
    }
   if(isPending){
    return 'Loading...'
   }
  return (
    <>
    <Header/>
    <section style={{backgroundColor:"#0d262f"}} className='movie-list'>
    <Row xs={1} md={4} className="g-4">
    {
        data?.map((movie,index)=>{
            const categories = getGenresNames(movie.genre_id,genresData);
            return(
                <Col key={index}>
             <MovieCard movies = {movie} categories = {categories}  addToFavorite={() => addToFavorite(movie.id, movie.title)}
             isFavorite={favoriteMovieIds.find(favMovie => favMovie.id === movie.id)}/>
             </Col>
             );
        })
    }
    </Row>
    {data.length === 0 && !isPending && <p>No results found</p>}

    
    </section>
    </>
  
  )
}

export default SearchMovieAndGeners