import React, { useContext } from 'react'
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getAllGenres, getAllMovies } from '../api'
import MovieCard from '../components/movieList/MovieCard';
import { FavoriteContext } from "../App";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { getGenresNames } from '../components/movieList/MovieList';
import Header from "../components/header/Header";
import { ThemeContext } from '../ThemeContext';
import { useEffect } from 'react';
import { checkIfTokenIsValid } from '../helper';
const FavoriteMovie = () => {
  const {isLightMode} = useContext(ThemeContext)
  const {data,isLoading, isError,isPending} = useQuery({
    queryKey: ['favorite-movie'],
    queryFn: getAllMovies,
  });
  const {genresData} = useQuery({
    queryKey: ['movie-genre'],
    queryFn:getAllGenres
});
  if(isError){
    return <p>Somethingis wrong!</p>
}

  const nav = useNavigate();
  const {favoriteMovieIds} = useContext(FavoriteContext);

  const isLoggedIn = localStorage.getItem('token');
  useEffect(() => {
    if (checkIfTokenIsValid() === false) {
      nav("/login");
    }
  }, [nav]);
 
  return (
    <>
    <Header/>

    <div className="favorite-list">
    <section style={{
      background: isLightMode ? "white" : "#0d262f",
      color: isLightMode ? "#0d262f" : "white",
    }} className='movie-list'>
      <Row xs={1} md={4} className="g-4">
        {data?.map((movie, index) => {
          if (favoriteMovieIds.find((favMovie) => favMovie.id === movie.id)) {
            const categories = getGenresNames(movie.genre_id, genresData);
            return (
              <Col key={index}>
                <MovieCard movies={movie} categories={categories} />
              </Col>
            );
          }
          return null;
        })}
      </Row>
    </section>
  </div>
    </>
   
  )
}

export default FavoriteMovie