import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SinglePageMovie from './components/movieList/SinglePageMovie.jsx';

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path:'movie/:id',
    element:<SinglePageMovie/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <QueryClientProvider client={queryClient}>
  <RouterProvider router={router} />
  
  </QueryClientProvider>
   
  </React.StrictMode>,
)
