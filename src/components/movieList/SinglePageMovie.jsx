// SinglePageMovie.js
import "./movie.css";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleMovie, getAllGenres } from "../../api";
import Card from "react-bootstrap/Card";
import { useContext } from "react";
import { ThemeContext } from "../../ThemeContext";
import { useState, useEffect } from "react";
import Header from "../header/Header";
import { RingLoader } from "react-spinners";

const SinglePageMovie = () => {
  const nav = useNavigate();
  const { isLightMode } = useContext(ThemeContext);
  const params = useParams();
  const [genres, setGenres] = useState([]);

  const { data, isPending, isError, isSuccess } = useQuery({
    queryKey: ["movie-search", params.id],
    queryFn: () => getSingleMovie(parseInt(params.id || "")),
  });

  const { data: allGenresData } = useQuery({
    queryKey: ["all-genres"],
    queryFn: getAllGenres,
  });

  useEffect(() => {
    if (allGenresData) {
      setGenres(allGenresData);
    }
  }, [allGenresData]);

  if (isError) {
    return <p>Error fetching movie data</p>;
  }

  if (isPending) {
    return <RingLoader color="#36d7b7" />;
  }

  const videos = data?.videos?.results || [];

  const handleReservation = () => {
    const isLoggedIn = localStorage.getItem("token");

    if (!isLoggedIn) {
      nav("/login");
      return;
    }
    nav(`/reservation?movieId=${params.id}`);
  };

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
            className="img-sng-cards"
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
        <div className="video-container">
          {videos.length > 0 ? (
            <div>
              <div key={videos[0].key}>
                <iframe
                  className="video"
                  src={`https://www.youtube.com/embed/${videos[0].key}`}
                  title={videos[0].name}
                  allowFullScreen
                ></iframe>
                <p className="video-title">{videos[0].name}</p>
              </div>
            </div>
          ) : (
            <p>No videos available</p>
          )}
        </div>
        <button
          onClick={handleReservation}
          style={{ marginBottom: "-300px" }}
          className="reservation-button1"
        >
          Reserve Movie
        </button>
      </div>
    </>
  );
};

export default SinglePageMovie;
