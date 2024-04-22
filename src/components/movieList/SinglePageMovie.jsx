import "./movie.css";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getSingleMovie, getTrailerFromYouTube, getAllGenres } from "../../api";
import Card from "react-bootstrap/Card";
import { useContext } from "react";
import { ThemeContext } from "../../ThemeContext";
import { useState, useEffect } from "react";
import Header from "../header/Header";

const SinglePageMovie = () => {
  const { isLightMode } = useContext(ThemeContext);
  const params = useParams();
  const [genres, setGenres] = useState([]);

  const { data, isPending, isError } = useQuery({
    queryKey: ["movie-search", params.id],
    queryFn: () => getSingleMovie(parseInt(params.id || "")),
  });

  const {
    data: movieTrailer,
    isSuccess,
    error,
  } = useQuery({
    queryKey: ["movie-trailer", params.id],
    queryFn: () => getTrailerFromYouTube(parseInt(params.id)),
  });

  const { data: allGenresData } = useQuery({
    queryKey: ["all-genres"],
    queryFn: getAllGenres,
  });

  useEffect(() => {
    if (isSuccess && movieTrailer && movieTrailer.videos) {
      const foundTrailer = movieTrailer.videos.find(
        (vid) => vid.name === "Official Trailer"
      );
      setTrailer(foundTrailer || movieTrailer.videos[0]);
    }
  }, [isSuccess, movieTrailer]);
  console.log("succes", isSuccess);
  console.log("Trailer", movieTrailer);
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

  const videos = data?.videos?.results || [];

  return (
    <>
      <Header />

      <div
        style={{
          background: isLightMode ? "white" : "#0d262f",
          color: isLightMode ? "#0d262f" : "white",
        }}
        className="details"
      >
        <Card style={{ width: "25rem", border: "0px solid black" }}>
          <Card.Img
            variant="top"
            src={"https://image.tmdb.org/t/p/original/" + data?.poster_path}
          />
        </Card>
        <div
          style={{
            color: isLightMode ? "#0d262f" : "white",
          }}
          className="details-movie"
        >
          <h1 className="movie-title">{data?.title}</h1>
          <h2 className="movie-description">{data?.overview}</h2>
          <h4 className="movie-release">{data?.release_date}</h4>
          <h4 className="movie-release">Popularity:{data?.popularity}</h4>

          <h6 className="movie-genres">
            Genres: {genres.map((genre) => genre.name).join(", ")}
          </h6>
        </div>
        <div className='video-container'>
          {videos.length > 0 ? (
            <div>
              <div key={videos[0].key}>
                <iframe className='video'
                  src={`https://www.youtube.com/embed/${videos[0].key}`}
                  title={videos[0].name}
                  allowFullScreen
                ></iframe>
                <p className='video-title'>{videos[0].name}</p>
              </div>
            </div>
          ) : (
            <p>No videos available</p>
          )}
        </div>
      </div>
    </>
  );
};

export default SinglePageMovie;
