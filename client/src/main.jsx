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
import UserProfile from './pages/users/Profile/UserProfile';
import TheatreShows from './pages/theatre/theatreManagment/TheatreShows';
import TheatreScreens from './pages/theatre/theatreManagment/TheatreScreens';
import TheatreSeatLayoutEdit from './components/Theatre/TheatreSeatLayoutEdit';
import AvailabeTheatres from './pages/users/AvailabeTheatres';
import SelectSeat from './pages/users/SelectSeat';
import PaymentFailed from './components/users/movie-details/PaymentFailed';
import PaymentSuccess from './components/users/movie-details/PaymentSuccess';
import TicketDetails from './pages/users/Profile/TicketDetails';
import TicketDetailView from './pages/users/Profile/TicketDetailView';

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
    <Route path='/user-profile' element={<AuthProvider><UserProfile/></AuthProvider>}/>
    <Route path='/tickets' element={<AuthProvider><TicketDetails/></AuthProvider>}/>
    <Route path='/tickets/details/:id' element={<AuthProvider><TicketDetailView/></AuthProvider>}/>
    <Route path='/moive/available-shows/:id' element={<AuthProvider><AvailabeTheatres/></AuthProvider>}/>
    <Route path='/moive/select-seat/' element={<AuthProvider><SelectSeat/></AuthProvider>}/>
    <Route path="/payment-success" element={<PaymentSuccess/>} />
    <Route path="/payment-failed" element={<PaymentFailed/>} />

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
    <Route path='/theatre/shows' element={<TheatreShows/>}/>
    <Route path='/theatre/screens' element={<TheatreScreens/>}/>
    <Route path='/theatre/screens/edit-layout/:screenId' element={<TheatreSeatLayoutEdit/>}/>
    
     
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
