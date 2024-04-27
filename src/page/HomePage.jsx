import MovieList from "../components/movieList/MovieList";
import CarouselComponent from "../components/carusel/Carousel";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";


const HomePage = () => {
 

  return (
    <>
      <Header />
      <CarouselComponent /> <br />
      <MovieList />
      <Footer />
    </>
  );
};

export default HomePage;
