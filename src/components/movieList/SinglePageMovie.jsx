import "./movie.css";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getSingleMovie, getTrailerFromYouTube, getAllGenres } from "../../api"; 
import Card from "react-bootstrap/Card";
import { FaPlay } from "react-icons/fa";
import YouTube from "react-youtube";
import { useState, useEffect } from "react";
//import Header from "../header/Header";

const SinglePageMovie = () => {
  const params = useParams();
  const [playing, setPlaying] = useState(false);
  const [trailer, setTrailer] = useState(null);
  const [genres, setGenres] = useState([]);

  const { data, isPending, isError } = useQuery({
    queryKey: ["movie-search", params.id],
    queryFn: () => getSingleMovie(parseInt(params.id || "")),
  });

  const { data: movieTrailer, isSuccess, error } = useQuery({
    queryKey: ['movie-trailer', params.id],
    queryFn: () => getTrailerFromYouTube(parseInt(params.id)),
  });

  const { data: allGenresData } = useQuery({
    queryKey: ['all-genres'],
    queryFn: getAllGenres,
  });

  useEffect(() => {
    if (isSuccess && movieTrailer && movieTrailer.videos) {
      const foundTrailer = movieTrailer.videos.find(vid => vid.name === "Official Trailer");
      setTrailer(foundTrailer || movieTrailer.videos[0]);
    }
  }, [isSuccess, movieTrailer]);
 console.log('succes',isSuccess);
 console.log('Trailer',movieTrailer);
  useEffect(() => {
    if (allGenresData) {
      setGenres(allGenresData);
    }
  }, [allGenresData]);

  if (isError) {
    return <p>Error fetching movie data</p>;
  }

  if (isPending) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ backgroundImage: `url('https://image.tmdb.org/t/p/original/' + ${data?.backdrop_path}')`, height: '500px' }} className="details">
      <Card style={{ width: "25rem", border: "0px solid black" }}>
        <Card.Img
          variant="top"
          src={"https://image.tmdb.org/t/p/original/" + data?.poster_path}
        />
      </Card>
      <div style={{ color: "black" }} className="details-movie">
        <h1 className="movie-title">{data?.title}</h1>
        <h2 className="movie-description">{data?.overview}</h2>
        <h4 className="movie-release">{data?.release_date}</h4>
        <h4 className="movie-release">Popularity:{data?.popularity}</h4>

        <h6 className="movie-genres">Genres: {genres.map(genre => genre.name).join(", ")}</h6>
        {movieTrailer && (
          <>
         
              <YouTube
                videoId={'LPkNFRemZrM'}
                className={"youtube amru"}
                containerClassName={"youtube-container amru"}
                opts={{
                  width: '100%',
                  height: '100%',
                  playerVars: {
                    autoplay: 0,
                    controls: 1,
                    cc_load_policy: 0,
                    fs: 0,
                    iv_load_policy: 0,
                    modestbranding: 0,
                    rel: 0,
                    showinfo: 0,
                  }
                }}
              />
            
            {!playing && trailer && (
              <button onClick={() => setPlaying(true)} type="button"><FaPlay />Play Trailer</button>
            )}
          </>
        )}
        {!movieTrailer && <p>Sorry, no trailer available</p>}
      </div>
     
    </div>
  );
};

export default SinglePageMovie;
