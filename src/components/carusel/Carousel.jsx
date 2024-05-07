import { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ThemeContext } from "../../ThemeContext";
import { Carousel } from "react-bootstrap"; 
import "./carousel.css";
import { getAllMovies } from "../../api";

function CarouselComponent() {
  const { isLightMode } = useContext(ThemeContext);
  const { data} = useQuery({
    queryKey: ["movie-carousel"],
    queryFn: getAllMovies,
  });
  const [myData, setMyData] = useState([]);

  useEffect(() => {
    if (data) {
      setMyData(data); 
    }
  }, [data]);

  return (
    <div>
      <div
        style={{
          background: isLightMode ? "white" : "#0d262f",
          color: isLightMode ? "#0d262f" : "white",
        }}
        className="info-part"
      >
        <h1 className="cinema-title">Cinema +</h1>
        <p className="cinema-description">
          Welcome to a world where every frame tells a story. Step into the
          magic of Cinema +.
          <br />
          Lights, camera, action!
        </p>
      

      <Carousel className="carousel-part">
        {myData.map((movie, index) => (
          <Carousel.Item key={index}>
            <img style={{height:'600px'}}
              className="d-block w-100"
              src={"https://image.tmdb.org/t/p/original/" + movie.poster_path}
              alt={movie.title}
            />
            <Carousel.Caption style={{backgroundColor:'rgba(255, 255, 255, 0.2)',color:'black',fontSize:'30px'}}>
              <h1 style={{color:'orange'}}>{movie.title}</h1> 
              <p>{movie.overview.slice(0, 160)}...</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
    </div>
  );
}

export default CarouselComponent;
