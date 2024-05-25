import React, { useState,useEffect } from 'react'
import './Moviedetails.scss'
import { useParams } from 'react-router-dom'
import createAxiosInstance from '../../utlis/axiosinstance'
import MoiveInfo from '../../components/users/movie-details/MovieInfo'



function MoveDetails() {

    const {id} = useParams()
    const [movie , setMovie] = useState(null)
    const axiosInstance = createAxiosInstance('user')

    const fetchMovieDetail = async ()=>{
        try{
            const res = await axiosInstance.get(`/home/movie/${id}/`)
            setMovie(res.data)
        }catch(error){
            console.error('Error fetching movie details:', error);
        }
    }


    useEffect(() => {
      fetchMovieDetail();
    }, [])
    

    if (!movie) {
        return <div>Loading...</div>;
    }

  return (
    <>
    <div className="cover-container" style={{ backgroundImage: `url(${movie.cover_image})` }}>
        <div className="cover-overlay"></div>
    </div>
    <MoiveInfo flim={movie}/>
    </>
  )
}

export default MoveDetails