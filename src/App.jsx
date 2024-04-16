import "./App.css";
import Header from "./components/header/Header";
import Carousel from "./components/carusel/Carousel";
import HomePage from "./page/HomePage";
import SinglePageMovie from "./components/movieList/SinglePageMovie";

function App() {
  return (
    <>
      <Header />
      <HomePage />
      <SinglePageMovie />
      {/*<Carousel/>*/}
    </>
  );
}

export default App;
