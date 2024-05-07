import axios from "axios";

export async function getAllMovies() {
  const res = await axios.get(
    "https://api.themoviedb.org/3/movie/popular?api_key=1d1d8844ae1e746c459e7be85c15c840"
  );
  return res.data.results;
}

export async function getSingleMovie(id) {
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=1d1d8844ae1e746c459e7be85c15c840&append_to_response=videos`
  );
  return res.data;
}

export async function getSearchResults(query) {
  const res = await axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=1d1d8844ae1e746c459e7be85c15c840&query=${query}`
  );
  return res.data.results;
}

export async function getAllGenres() {
  const res = await axios.get(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=1d1d8844ae1e746c459e7be85c15c840"
  );
  return res.data.genres;
}

export async function postDataProfile(data) {
  console.log(data);
  const res = await axios.post(
    " https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCTSIpXohgcKPlmZ07Ad-LO1Sj-GvFszUQ",
    data
  );
  return res.data;
}

export async function loginData(data) {
  const res = await axios.post(
    " https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCTSIpXohgcKPlmZ07Ad-LO1Sj-GvFszUQ ",
    data
  );
  return res.data;
}

export async function ticketLoader(userID) {
  const res = await axios.get("http://localhost:3000/reservations", userID);
  return res.data;
}

//update ticket
export async function updateTicket({ id, ticketToChange }) {
  const res = await axios.put(`http://localhost:3000/reservations/${id}`, {
    name: ticketToChange.name,
    date: ticketToChange.date,
    time: ticketToChange.time,
    theater: ticketToChange.theater,
  });

  return res.data;
}

//get all data for admin
export async function getAllTicket() {
  const res = await axios.get("http://localhost:3000/reservations");
  return res.data;
}

export async function updateTicketFromAdmin({ id, ticketChange }) {
  const res = await axios.put(
    `http://localhost:3000/reservations/${id}`,
    {
      user_id: ticketChange.user_id,
      name: ticketChange.name,
      email: ticketChange.email,
      movie_id:ticketChange.movie_id,
      date: ticketChange.date,
      time: ticketChange.time,
      theater: ticketChange.theater,
    }
  );
  return res.data;
}

export async function deleteTicket(id){
  const res = await axios.delete(`http://localhost:3000/reservations/${id}`);
  return res.data;
}
