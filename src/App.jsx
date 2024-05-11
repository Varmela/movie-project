import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SinglePageMovie from "./components/movieList/SinglePageMovie.jsx";
import Reservation from "./page/Reservation.jsx";
import SearchMovieAndGeners from "./page/SearchMovieAndGeners.jsx";
import FavoriteMovie from "./page/FavoriteMovie.jsx";
import { ThemeContext } from "./ThemeContext";
import { createContext, useEffect, useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from "./page/HomePage";
import PageNotFound from "./page/PageNotFound";
import Login from "./page/Login";
import Signup from "./page/Signup";
import TicketPage from "./page/ticketPage";
import UnauthorizedPage from "./page/UnauthorizedPage";
import Screen from "./page/adminDashboard/adminScreen/Screen";
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

  const [userId, setUserId] = useState('');
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
      path:'*',
      element:<PageNotFound/>
    },
    {
      path:'/login',
      element: <Login/>
    },
    {
      path:'/register',
      element:<Signup/>
    },
    {
      path:'/ticket',
      element:<TicketPage userId={userId} />
    },
    {
      path:'/admin-dashboard',
      element:<Screen/>
    },
    {
      path:'/unauthorized',
      element:<UnauthorizedPage/>
    },
    
  ]);
  return (
    <>
      <ThemeContext.Provider value={{ isLightMode, setIsLightMode }}>
        <QueryClientProvider client={queryClient}>
        <FavoriteContext.Provider value={{ favoriteMovieIds, setFavoriteMovieIds }}>
          <RouterProvider router={router} />
          <ToastContainer />
          </FavoriteContext.Provider>
        </QueryClientProvider>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
