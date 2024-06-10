import React from 'react';
import '../../../pages/users/Moviedetails.scss';
import { Link } from 'react-router-dom';

function MoiveInfo(props) {
  return (
    <div className="w-full h-full flex justify-center relative bottom-[12rem] overflow-hidden">
      <div className="info-container pt-2 flex ">
        <div className="detail-poster overflow-hidden">
          <img className="w-full" src={props.flim.poster} alt="" />
        </div>
        <div className="info">
          <h2 className="text-xl  text-white font-bold">{props.flim.title}</h2>
          
            <p className="description text-sm text-white">{props.flim.description}</p>
            <div className="sub-details flex justify-left mt-2 gap-4 font-bold">
              <h5 className='text-white text-sm '><i class="fa-regular fa-clock"></i> {props.flim.duration}</h5>
              <h5 className='text-white text-sm '><i class="fa-solid fa-heart"></i> 7/10</h5>
              <h5 className='text-white text-sm '><i class="fa-solid fa-comment"></i> 200+</h5>
            </div>
            <Link to={`/moive/available-shows/${props.flim.id}`} className="login-btn text-white mt-2 max-w-max focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center ">Get tickets</Link>
        </div>
      </div>
    </div>
  );
}

export default MoiveInfo;
