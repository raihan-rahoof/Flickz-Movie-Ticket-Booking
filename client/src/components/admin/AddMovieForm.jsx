import React, { useState } from 'react';
import axios from 'axios';
import axiosInstance from '../../utlis/axiosinstance';
import {toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function AddMovieForm() {
    const [formData, setFormData] = useState({
        title: '',
        poster: null,
        trailer_link: '',
        cast: '',
        category: '',
        certificate: '',
        release_date: '',
        description: ''
    });

    const navigate = useNavigate()

    const [previewImage, setPreviewImage] = useState('');

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'poster' && files && files[0]) {
            setFormData(prevState => ({
                ...prevState,
                [name]: files[0], 
            }));
            setPreviewImage(URL.createObjectURL(files[0])); 
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    console.log(formData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('poster', formData.poster);
        formDataToSend.append('trailer_link', formData.trailer_link);
        formDataToSend.append('cast', formData.cast);
        formDataToSend.append('category', formData.category);
        formDataToSend.append('certificate', formData.certificate);
        formDataToSend.append('release_date', formData.release_date);
        formDataToSend.append('description', formData.description);

        try {
            const token = JSON.parse(localStorage.getItem('access'));
            console.log(token);
            const res = await axios.post('http://localhost:8000/api/v1/cadmin/admin/add-movies/', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}` 
                }
            });
            if (res.status == 200){
                toast.success('Movie added successfully')
                navigate('/admin/movies')
            }
        } catch (error) {
            
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-8 bg-gray-800 p-8 rounded-md">
            <h2 className="text-white text-2xl mb-6">Add Movie</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-white">Title</label>
                    <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="w-full bg-gray-700 text-white rounded-md px-3 py-2" />
                </div>
                <div className="mb-4">
                    <label htmlFor="poster" className="block text-white">Poster</label>
                    <input type="file" id="poster" name="poster" onChange={handleChange} className="w-full bg-gray-700 text-white rounded-md px-3 py-2" />
                </div>
                {previewImage && (
                    <div className="mb-4">
                        <img src={previewImage} alt="Preview" className="max-w-[14rem] mx-auto" />
                    </div>
                )}
                <div className="mb-4">
                    <label htmlFor="trailer_link" className="block text-white">Trailer Link</label>
                    <input type="url" id="trailer_link" name="trailer_link" value={formData.trailer_link} onChange={handleChange} className="w-full bg-gray-700 text-white rounded-md px-3 py-2" />
                </div>
                <div className="mb-4">
                    <label htmlFor="cast" className="block text-white">Cast</label>
                    <input type="text" id="cast" name="cast" value={formData.cast} onChange={handleChange} className="w-full bg-gray-700 text-white rounded-md px-3 py-2" />
                </div>
                <div className="mb-4">
                    <label htmlFor="category" className="block text-white">Category</label>
                    <input type="text" id="category" name="category" value={formData.category} onChange={handleChange} className="w-full bg-gray-700 text-white rounded-md px-3 py-2" />
                </div>
                <div className="mb-4">
                    <label htmlFor="certificate" className="block text-white">Certificate</label>
                    <input type="text" id="certificate" name="certificate" value={formData.certificate} onChange={handleChange} className="w-full bg-gray-700 text-white rounded-md px-3 py-2" />
                </div>
                <div className="mb-4">
                    <label htmlFor="release_date" className="block text-white">Release Date</label>
                    <input type="date" id="release_date" name="release_date" value={formData.release_date} onChange={handleChange} className="w-full bg-gray-700 text-white rounded-md px-3 py-2" />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-white">Description</label>
                    <textarea id="description" name="description" value={formData.description} onChange={handleChange} className="w-full bg-gray-700 text-white rounded-md px-3 py-2" rows="5"></textarea>
                </div>
                <div className="mb-4">
                    <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">Add Movie</button>
                </div>
            </form>
        </div>
    );
}

export default AddMovieForm;