import React from 'react';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SinglePageMovie from './components/movieList/SinglePageMovie.jsx';
import Reservation from './page/Reservation.jsx';
import SearchMovieAndGeners from './page/SearchMovieAndGeners.jsx';

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path:'movie/:id',
    element:<SinglePageMovie/>
  },

  {
    path:'/reservation',
    element: <Reservation/>
  },
  {
    path:'search/:query',
    element:<SearchMovieAndGeners/>
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <QueryClientProvider client={queryClient}>
  
  <RouterProvider router={router} />
  
  </QueryClientProvider>
  
  
   
  </React.StrictMode>,
)
