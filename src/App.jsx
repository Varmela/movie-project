import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SinglePageMovie from "./components/movieList/SinglePageMovie.jsx";
import Reservation from "./page/Reservation.jsx";
import SearchMovieAndGeners from "./page/SearchMovieAndGeners.jsx";
import FavoriteMovie from "./page/FavoriteMovie.jsx";
import { ThemeContext } from "./ThemeContext";
import { createContext, useEffect, useState } from "react";

import HomePage from "./page/HomePage";
import PageNotFound from "./page/PageNotFound";
import Login from "./page/Login";

export const FavoriteContext = createContext({
  favoriteMovieIds: [],
  setFavoriteMovieIds: () =>{},
});
function App() {
  const themeFromLocalStorage = localStorage.getItem("theme");
  const mode = themeFromLocalStorage
    ? themeFromLocalStorage === "lightMode"
    : true;
  const [isLightMode, setIsLightMode] = useState(mode);
  const queryClient = new QueryClient();

  const favoriteMovieFromLocalStorage = JSON.parse(
    localStorage.getItem("favorite_movies_ids") || "[]"
  );
  const [favoriteMovieIds, setFavoriteMovieIds] = useState(
    favoriteMovieFromLocalStorage
  );
  useEffect(() => {
    localStorage.setItem(
      "favorite_movies_ids",
      JSON.stringify(favoriteMovieIds)
    );
  }, [favoriteMovieIds]);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "movie/:id",
      element: <SinglePageMovie />,
    },

    {
      path: "/reservation",
      element: <Reservation />,
    },
    {
      path:"/favorite-movie",
      element: <FavoriteMovie/>
    },
    {
      path: "search/:query",
      element: <SearchMovieAndGeners />,
    },
    
    
    {
      path:'/not-found',
      element:<PageNotFound/>
    },
    {
      path:'/login',
      element: <Login/>
    }
  ]);
  return (
    <>
      <ThemeContext.Provider value={{ isLightMode, setIsLightMode }}>
        <QueryClientProvider client={queryClient}>
        <FavoriteContext.Provider value={{ favoriteMovieIds, setFavoriteMovieIds }}>
          <RouterProvider router={router} />
          </FavoriteContext.Provider>
        </QueryClientProvider>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
