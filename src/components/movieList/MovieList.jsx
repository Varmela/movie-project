import { useQuery } from '@tanstack/react-query';
import { getAllMovies } from "../../api"


function MovieList() {
    const {data,isPending,isError} = useQuery({
        queryKey: ['movie-list'],
        queryFn:getAllMovies
    })

    if(isError){
        return <p>Something went wrong</p>

    }
    if(isPending) return 'Loading...'

  return (
    <section className="movie-list">
    {data.map((movie) => (
        <div key={movie.id}>
            <h4>{movie.title}</h4>
            <p>{movie.overview}</p>
            <img src={movie.poster_path} alt={movie.title} />
        </div>
    ))}
</section>



  )
}

export default MovieList