import React , {useContext} from 'react'
import Navbar from '../../components/users/Navbar'
import './Home.scss'
import  AuthContext  from '../../Context/AuthContext';
import { Navigate } from 'react-router-dom';


function Home() {
  const {isLoggedIn,setIsLoggedIn} = useContext(AuthContext)
  
  

  return (
    <>
     <div className="home-container">
      <Navbar />
     
      <div className="home-overlay"></div>
    </div>
    
    </>
  )
}

export default Home