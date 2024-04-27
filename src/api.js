import axios from "axios";

export async function getAllMovies(){
    const res = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=1d1d8844ae1e746c459e7be85c15c840');
    return res.data.results;
    
}


export async function getSingleMovie(id){
    const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=1d1d8844ae1e746c459e7be85c15c840&append_to_response=videos`);
    return res.data;
  
  
  }

  export async function getSearchResults(query){
    const res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=1d1d8844ae1e746c459e7be85c15c840&query=${query}`);
    return res.data.results
  }



 export async function getAllGenres(){
    const res = await axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=1d1d8844ae1e746c459e7be85c15c840');
    return  res.data.genres;
}

export async function getTrailerFromYouTube(id){
    const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=1d1d8844ae1e746c459e7be85c15c840&append_to_response=videos`);
    return res.data.videos.results;
}

export async function postDataProfile(data){ console.log(data)
  const res = await axios.post(' https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCTSIpXohgcKPlmZ07Ad-LO1Sj-GvFszUQ',data);
  return res.data;
}

export async function loginData(data){
  const res = await axios.post(' https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCTSIpXohgcKPlmZ07Ad-LO1Sj-GvFszUQ ',data);
  return res.data;

}