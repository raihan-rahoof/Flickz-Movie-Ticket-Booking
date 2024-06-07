import React, { useState } from 'react';
import TheatreNav from '../../pages/theatre/theatreManagment/TheatreNav';
import createAxiosInstance from '../../utlis/axiosinstance';
import axios from 'axios';


const TheatreSeatLayoutEdit = ({screenId}) => {
  
  const [layout, setLayout] = useState([]);
  const [rows,setRows]= useState(0)
  const [cols,setCols]= useState(0)
  const axiosInstance = createAxiosInstance('theatre')

  const fetchScreenData = async ()=>{
    try {
        const res = await axiosInstance.get('')
    } catch (error) {
        
    }
  }

  return (
    <>
      <TheatreNav />
      <div className='h-screen bg-black p-4'>
        <div className='text-white mb-4'>Edit Seat Layout</div>
        <div className='grid gap-2'>
          {layout.map((row, rowIndex) => (
            <div key={rowIndex} className='flex'>
              {row.map((seat, colIndex) => (
                <div
                  key={colIndex}
                  onClick={() => handleSeatClick(rowIndex, colIndex)}
                  className={`w-8 h-8 border ${
                    seat === 'S' ? 'bg-green-500' : 'bg-gray-700'
                  } cursor-pointer`}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TheatreSeatLayoutEdit;
