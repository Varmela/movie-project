import MovieList from "../components/movieList/MovieList";
import CarouselComponent from "../components/carusel/Carousel";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";


const HomePage = () => {
 

  return (
    <div style={{margin:'0px',padding:'0px'}} className="site-container">
      <Header />
      <CarouselComponent /> <br />
      <MovieList />
      <Footer />
    </div>
  );
};

export default HomePage;
