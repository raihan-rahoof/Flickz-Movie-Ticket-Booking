import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import axiosInstance from '../../utlis/axiosinstance';

function MoviesList() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const response = await axiosInstance.get('cadmin/admin/add-movies/');
            setMovies(response.data);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    return (
        <div className='h-screen bg-[#1b1c31]'>
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
                        <th className="border border-gray-200 px-4 py-2 text-white">Category</th>
                        <th className="border border-gray-200 px-4 py-2 text-white">Cast</th>
                        <th className="border border-gray-200 px-4 py-2 text-white">Release Date</th>
                        <th className="border border-gray-200 px-4 py-2 text-white">Certificate</th>
                        {/* <th className="border border-gray-200 px-4 py-2 text-white">Edit</th> */}
                    </tr>
                </thead>
                <tbody>
                    {movies.map(movie => (
                        <tr key={movie.id} className="">
                            <td className="border border-gray-200 px-4 py-2 text-white"><img src={movie.poster} alt={movie.name} className="w-24 h-auto" /></td>
                            <td className="border border-gray-200 px-4 py-2 text-white">{movie.title}</td>
                            <td className="border border-gray-200 px-4 py-2 text-white">{movie.category}</td>
                            <td className="border border-gray-200 px-4 py-2 text-white">{movie.cast}</td>
                            <td className="border border-gray-200 px-4 py-2 text-white">{movie.release_date}</td>
                            <td className="border border-gray-200 px-4 py-2 text-white">{movie.certificate}</td>
                            {/* <td className="border border-gray-200 px-4 py-2 text-white"><button data-modal-target="crud-modal" data-modal-toggle="crud-modal" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Edit</button></td> */}
                        </tr>
                    ))}
                </tbody>
            </table>

            

        </div>
        </div>
    );
}

export default MoviesList;
