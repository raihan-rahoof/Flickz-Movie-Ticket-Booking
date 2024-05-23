import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import createAxiosInstance from '../../utlis/axiosinstance';
import toast from 'react-hot-toast';
import { Modal, Image, Input, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Textarea } from "@nextui-org/react";

function MoviesList() {
    const [movies, setMovies] = useState([]);
    const axiosInstance = createAxiosInstance('admin');
    const [selectedMovie, setMovie] = useState(null);
    const [newPoster, setNewPoster] = useState(null);
    const [originalMovie, setOriginalMovie] = useState(null);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const response = await axiosInstance.get('cadmin/admin/add-movies/');
            setMovies(response.data);
        } catch (error) {
            toast.error('Failed to fetch movies, please refresh the page.');
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setNewPoster(file);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMovie((prevMovie) => ({
            ...prevMovie,
            [name]: value,
        }));
    };

    const handleUpdate = async () => {
        
        const changes = newPoster || Object.keys(selectedMovie).some(key => selectedMovie[key] !== originalMovie[key]);

        if (!changes) {
            toast('No changes to update');
            return;
        }

        const formData = new FormData();
        formData.append('title', selectedMovie.title);
        formData.append('language', selectedMovie.language);
        formData.append('genre', selectedMovie.genre);
        formData.append('duration', selectedMovie.duration);
        formData.append('release_date', selectedMovie.release_date);
        formData.append('description', selectedMovie.description);
        formData.append('cast', selectedMovie.cast);
        formData.append('certificate', selectedMovie.certificate);
        formData.append('trailer_link', selectedMovie.trailer_link);
        if (newPoster) {
            formData.append('poster', newPoster);
        }

        try {
            await axiosInstance.put(`/cadmin/admin/update-movie/${selectedMovie.id}/`, formData);
            toast.success('Movie updated successfully');
            fetchMovies();
            onOpenChange(false); // Close the modal
        } catch (error) {
            toast.error('Failed to update the movie');
        }
    };

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
                                <tr key={movie.id}>
                                    <td className="border border-gray-200 px-4 py-2 text-white"><img src={movie.poster} alt={movie.name} className="w-24 h-auto" /></td>
                                    <td className="border border-gray-200 px-4 py-2 text-white">{movie.title}</td>
                                    <td className="border border-gray-200 px-4 py-2 text-white">{movie.genre}</td>
                                    <td className="border border-gray-200 px-4 py-2 text-white">{movie.language}</td>
                                    <td className="border border-gray-200 px-4 py-2 text-white">{movie.release_date}</td>
                                    <td className="border border-gray-200 px-4 py-2 text-white">
                                        <Button onPress={() => { onOpen(); setMovie(movie); setOriginalMovie({ ...movie }); }} size='sm' radius='full' className="bg-blue-500 hover:bg-blue-700 text-white font-bold h-[2.5rem]"><box-icon name='edit' color='#ffffff'></box-icon></Button>
                                        <Button size='sm' radius='full' className="bg-red-500 hover:bg-red-700 text-white font-bold h-[2.5rem]"><box-icon name='trash' color='#ffffff'></box-icon></Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {selectedMovie && (
                <Modal scrollBehavior='outside' isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Edit Movie</ModalHeader>
                                <ModalBody>
                                    <Input
                                        autoFocus
                                        value={selectedMovie.title}
                                        label="Title"
                                        labelPlacement='outside'
                                        name="title"
                                        onChange={handleInputChange}
                                    />
                                    <Input
                                        autoFocus
                                        value={selectedMovie.language}
                                        label="Language"
                                        labelPlacement='outside'
                                        name="language"
                                        onChange={handleInputChange}
                                    />
                                    <Input
                                        autoFocus
                                        value={selectedMovie.genre}
                                        label="Genre"
                                        labelPlacement='outside'
                                        name="genre"
                                        onChange={handleInputChange}
                                    />
                                    <Input
                                        autoFocus
                                        value={selectedMovie.duration}
                                        label="Duration"
                                        labelPlacement='outside'
                                        name="duration"
                                        onChange={handleInputChange}
                                    />
                                    <Input
                                        autoFocus
                                        value={selectedMovie.release_date}
                                        label="Release Date"
                                        labelPlacement='outside'
                                        type='date'
                                        name="release_date"
                                        onChange={handleInputChange}
                                    />
                                    <Textarea
                                        autoFocus
                                        value={selectedMovie.description}
                                        label="Description"
                                        labelPlacement='outside'
                                        name="description"
                                        onChange={handleInputChange}
                                    />
                                    <Input
                                        autoFocus
                                        value={selectedMovie.cast}
                                        label="Cast"
                                        labelPlacement='outside'
                                        name="cast"
                                        onChange={handleInputChange}
                                    />
                                    <Input
                                        autoFocus
                                        value={selectedMovie.certificate}
                                        label="Certificate"
                                        labelPlacement='outside'
                                        name="certificate"
                                        onChange={handleInputChange}
                                    />
                                    <div className="mt-2 flex justify-center align-middle">
                                        <Image
                                            isZoomed
                                            width={240}
                                            alt="Failed to Fetch"
                                            src={newPoster ? URL.createObjectURL(newPoster) : selectedMovie.poster}
                                        />
                                    </div>
                                    <input
                                        onChange={handleFileChange}
                                        className="block w-[15rem] ml-[5rem] text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                        id="file_input"
                                        type="file"
                                    />
                                    <Input
                                        autoFocus
                                        value={selectedMovie.trailer_link}
                                        label="Movie Trailer"
                                        labelPlacement='outside'
                                        name="trailer_link"
                                        onChange={handleInputChange}
                                        endContent={<i className="fa-brands fa-youtube text-red-500"></i>}
                                    />
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button color="primary" className='hover:bg-green-400' onPress={handleUpdate}>
                                        Update
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            )}
        </>
    );
}

export default MoviesList;
