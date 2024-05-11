import React from 'react';
import '../../../pages/users/Moviedetails.scss';

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
            <div className="sub-details flex justify-left mt-2">
              <h5 className='text-white text-sm '><box-icon name='time' color='#ffffff' ></box-icon>{props.flim.duration}</h5>
              <h5 className='text-white text-sm '><box-icon name='heart' type='solid' color='#ffffff' ></box-icon>7/10</h5>
              <h5 className='text-white text-sm '><box-icon name='comment-detail' color='#ffffff' ></box-icon> 200+</h5>
            </div>
            <button  className="login-btn text-white mt-2 max-w-max focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center ">Get tickets</button>
        </div>
      </div>
    </div>
  );
}

export default MoiveInfo;
