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
            <div className="sub-details flex justify-left">
              <h5 className='text-white text-sm'><FontAwesomeIcon icon={faClock} style={{color: "#f5f5f4",}} />{props.flim.duration}</h5>
              <h5 className='text-white text-sm'>7/10</h5>
              <h5 className='text-white text-sm'>200+</h5>
            </div>
          
        </div>
      </div>
    </div>
  );
}

export default MoiveInfo;
