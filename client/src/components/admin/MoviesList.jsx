import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import createAxiosInstance from '../../utlis/axiosinstance';
import toast from 'react-hot-toast';
import MovieUpdateModal from './MovieUpdateModal';



function MoviesList() {
    const [movies, setMovies] = useState([]);
    const axiosInstance = createAxiosInstance('admin')
    const [selectedMovie, setMovie] = useState()
    const [isModelopen,setModelopen] = useState(false)
    console.log(isModelopen);
    console.log(selectedMovie);
    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const response = await axiosInstance.get('cadmin/admin/add-movies/');
            setMovies(response.data);
            console.log(response.data)
        } catch (error) {
            toast.error('Failed to Fetch,Please refresh Your page')
        }
    };

    const handleEditClick = (movie) =>{
        setMovie(movie)
        setModelopen(true)
    }

    const handleCloseModal = ()=>{
        setMovie(null)
        setModelopen(false)
    }

    return (
        <>
        <div className='h-auto bg-[#1b1c31]'>
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-semibold mb-4 text-white">Movie List</h2>
            <Link to="/admin/add-movie">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
                    Add Movie
                </button>
            </Link>
            <table className="w-full border-collapse border border-gray-200">
                <thead>
                    <tr>
                        <th className="border border-gray-200 px-4 py-2 text-white">Poster</th>
                        <th className="border border-gray-200 px-4 py-2 text-white">Name</th>
                        <th className="border border-gray-200 px-4 py-2 text-white">Genre</th>
                        <th className="border border-gray-200 px-4 py-2 text-white">Language</th>
                        <th className="border border-gray-200 px-4 py-2 text-white">Release date</th>
                        <th className="border border-gray-200 px-4 py-2 text-white">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map(movie => (
                      <tr key={movie.id} className="">
                      <td className="border border-gray-200 px-4 py-2 text-white"><img src={movie.poster} alt={movie.name} className="w-24 h-auto" /></td>
                      <td className="border border-gray-200 px-4 py-2 text-white">{movie.title}</td>
                      <td className="border border-gray-200 px-4 py-2 text-white">{movie.genre}</td>
                      <td className="border border-gray-200 px-4 py-2 text-white">{movie.language}</td>
                      <td className="border border-gray-200 px-4 py-2 text-white">{movie.release_date}</td>
                      <td className="border border-gray-200 px-4 py-2 text-white">
                          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={()=>handleEditClick(movie)} ><box-icon name='edit' color='#ffffff' ></box-icon></button>
                          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" ><box-icon name='trash' color='#ffffff' ></box-icon></button>
                      </td>
                  </tr>
                    ))}
                </tbody>
            </table>

            

        </div>
        </div>

       

        </>
    );
}

export default MoviesList;
