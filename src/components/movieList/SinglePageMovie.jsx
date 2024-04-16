import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom'
import { getSingleMovie } from '../../api';



function SinglePageMovie() {
  const params = useParams();
  const {data,isPending,isError} = useQuery({
    queryKey: ['movie',params.id],
    queryFn: ()=> getSingleMovie(parseInt(params.id || ''))
  })
  return (
    <>
    <div>
  
    </div>
    <div>
    <h3>{data?.title}</h3>
    <p>Gener</p>
    <button>Watch triler</button>
    <h4> 💔  📑</h4>   
    <p>OverView</p>
    <p>popularity</p>
    
    </div>
    
    
    </>
  )
}

export default SinglePageMovie