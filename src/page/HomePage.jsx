
import { useNavigate } from "react-router-dom";
import MovieList from "../components/movieList/MovieList";
import CarouselComponent from "../components/carusel/Carousel";
import CinemaDetails from "../components/cinemaDetails/CinemaDetails";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const HomePage = () => {
  const nav = useNavigate();

  

  return (
   <>
   <Header />
      <CarouselComponent />
      <MovieList />
      {/*<CinemaDetails />*/}
      <Footer />
   </>
      
   
  );
};

export default HomePage;
