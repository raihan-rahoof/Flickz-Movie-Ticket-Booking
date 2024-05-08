import React, { useState, useEffect, useContext } from 'react';
import './nav.scss';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import createAxiosInstance from '../../utlis/axiosinstance';
import { toast } from 'react-toastify';
import AuthContext from '../../Context/AuthContext';

function Navbar() {
    
    const user = JSON.parse(localStorage.getItem('user'));
    const jwt_token = JSON.parse(localStorage.getItem('access'));
    const refresh_token = JSON.parse(localStorage.getItem('refresh'));
    const navigate = useNavigate()
    const {isLoggedIn,setIsLoggedIn} = useContext(AuthContext)

    const axiosInstance = createAxiosInstance('user')

    console.log(isLoggedIn)
    useEffect(() => {
        if (jwt_token && user) {
            testauth();
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false);
        }
    }, [jwt_token, user,isLoggedIn]);

    const handleLogout = async () => {
        const res = await axiosInstance.post('/auth/logout/', { 'refresh_token': refresh_token , 'access_token':jwt_token });
        if (res.status === 200) {
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            localStorage.removeItem('user');
            setIsLoggedIn(false);
            navigate('/login')
            toast.success('Logout success');
        }
    }

    const testauth = async () => {
        try {
            const res = await axiosInstance.get('/auth/testauth/');
            if (res.status === 200) {
                console.log(res.data);
            }
        } catch (error) {
            console.error('Error while testing authentication:', error);
        }
    }

    return (
        <>
            <nav className="bg-transparent">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">FLICKZ</span>
                    </a>
                    <div className="nav-right flex gap-2">
                        <div className="relative hidden md:block">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                                <span className="sr-only">Search icon</span>
                            </div>
                            <input type="text" id="search-navbar" className="hover:border-blue-500 block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..."/>
                        </div>
                        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                            { isLoggedIn ? <button onClick={handleLogout} className="login-btn text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center ">Logout</button> : 
                            <Link to='/login' className="login-btn text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center ">Login</Link>
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
