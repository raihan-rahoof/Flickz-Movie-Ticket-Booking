import React from 'react'
import ReactDOM from 'react-dom/client' 
import {NextUIProvider} from "@nextui-org/system";

import './index.css'
import { Route,Routes, RouterProvider, createBrowserRouter,createRoutesFromElements } from 'react-router-dom'
import Home from './pages/users/Home'
import Login from './pages/users/auth/Login'
import Register from './pages/users/auth/Register'
import Otp from './pages/users/auth/Otp'
import ResetPassword from './pages/users/auth/ResetPassword'
import ChangePassword from './pages/users/auth/ChangePassword'
import { ToastContainer } from 'react-toastify';
import { Toaster } from 'react-hot-toast'
import AdminLogin from './pages/admin/auth/AdminLogin'
import UserPage from './pages/admin/auth/UserPage'
import Movie from './pages/admin/movies/Movie'
import AddMovie from './pages/admin/movies/AddMovie'
import { AuthProvider } from './Context/AuthContext';
import MoveDetails from './pages/users/MoveDetails'
import TheatreRegister from './pages/theatre/TheatreRegister'
import TheatreLogin from './pages/theatre/TheatreLogin'
import TheatreOtp from './pages/theatre/TheatreOtp'
import TheatreList from './pages/admin/theatre/TheatreList'
import Theatre from './pages/theatre/Theatre';
import TheatreDashboard from './pages/theatre/theatreManagment/TheatreDashboard';


const router = createBrowserRouter(
  createRoutesFromElements(
    
    <Route>
   
    <Route path='/' element={ <AuthProvider><Home/></AuthProvider>}/>
    <Route path='/login' element={<AuthProvider><Login/></AuthProvider>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/register/otp' element={<Otp/>}/>
    <Route path='/reset-password' element={<ResetPassword/>}/>
    <Route path='/reset-password-confirm/:uid/:token' element={<ChangePassword/>}/>
    <Route path='/movie/:id' element={<MoveDetails/>}/>

    <Route path='/admin' element={<AdminLogin/>}/>
    <Route path='/admin/user-list' element={<UserPage/>}/>
    <Route path='/admin/movies' element={<Movie/>} />
    <Route path='/admin/add-movie' element={<AddMovie/>}/>
    <Route path='/admin/theatres' element={<TheatreList/>}/>


    <Route path='/theatre' element={<Theatre/>}/>
    <Route path='/theatre/register' element={<TheatreRegister/>}/>
    <Route path='/theatre/login' element={<TheatreLogin/>}/>
    <Route path='/theatre/verify-email' element={<TheatreOtp/>}/>
    <Route path='/theatre/dashboard' element={<TheatreDashboard/>}/>
     
  </Route>
    
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
    <Toaster/> 

    <RouterProvider router={router}/>
    </NextUIProvider>
  </React.StrictMode>
)
