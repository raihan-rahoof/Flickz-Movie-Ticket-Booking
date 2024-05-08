import React from 'react'
import ReactDOM from 'react-dom/client' 
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

    <Route path='/theatre/register' element={<TheatreRegister/>}/>
     
  </Route>
    
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <Toaster/> 

    <RouterProvider router={router}/>
    
  </React.StrictMode>
)
