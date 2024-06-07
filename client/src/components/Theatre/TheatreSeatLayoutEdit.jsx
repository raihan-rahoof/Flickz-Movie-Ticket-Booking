import React, { useState, useEffect } from 'react';
import TheatreNav from '../../pages/theatre/theatreManagment/TheatreNav';
import createAxiosInstance from '../../utlis/axiosinstance';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import screenImg from '../../../public/images/screen.png';
import seatImg from '../../../public/images/seat.svg';
import rSeat from '../../../public/images/removeseat.svg';
import { Button } from '@nextui-org/react';

const TheatreSeatLayoutEdit = () => {
  const { screenId } = useParams();
  const [layout, setLayout] = useState([]);
  const [originalLayout, setOriginalLayout] = useState([]);
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);
  const axiosInstance = createAxiosInstance('theatre');

  const fetchScreenData = async () => {
    try {
      const res = await axiosInstance.get(`/screen/update-screen/${screenId}/`);
      const screenData = res.data;
      setLayout(screenData.layout);
      setOriginalLayout(screenData.layout);  // Store the original layout
      setRows(screenData.rows);
      setCols(screenData.cols);
    } catch (error) {
      console.log(error);
      toast.error('Failed to get screen data');
    }
  };

  useEffect(() => {
    fetchScreenData();
  }, [screenId]);

  const handleSeatClick = (rowIndex, colIndex) => {
    const newLayout = layout.map((row, rowIdx) =>
      row.map((seatId, colIdx) => {
        if (rowIdx === rowIndex && colIdx === colIndex) {
          // Toggle between null and the original seat value
          return seatId ? null : originalLayout[rowIdx][colIdx];
        }
        return seatId;
      })
    );
    setLayout(newLayout);
  };

  console.log(layout);

  const handleSave = async () => {
    try {
      const res = await axiosInstance.put(`/screen/update-layout/${screenId}/`, { layout });
      toast.success('Layout saved successfully');
    } catch (error) {
      console.log(error);
      toast.error('Failed to save layout');
    }
  };

  return (
    <>
      <TheatreNav />
      <div className='h-screen bg-black p-4'>
        <div className='flex items-center justify-center font-semibold text-2xl mt-4 mb-8'>
          <h1>Edit Seat Layout</h1>
        </div>
        <div className='grid gap-2 flex-row items-center justify-center '>
          {layout.map((row, rowIndex) => (
            <div key={rowIndex} className='flex items-center justify-center'>
              {row.map((seatId, colIndex) => (
               <React.Fragment key={colIndex}>
                  {seatId ? (
                    <img
                      src={seatImg} // Provide the correct path to your SVG or other image here
                      onClick={() => handleSeatClick(rowIndex, colIndex)}
                      className='w-8 h-8 mr-2 cursor-pointer'
                      alt={`Seat ${rowIndex}-${colIndex}`} // Adding alt attribute for accessibility
                    />
                  ) : (
                    <img
                      src={rSeat} // Provide the correct path to your SVG or other image here
                      onClick={() => handleSeatClick(rowIndex, colIndex)}
                      className='w-8 h-8 mr-2 cursor-pointer'
                      alt={`Seat ${rowIndex}-${colIndex}`} // Adding alt attribute for accessibility
                    />
                  )}
                </React.Fragment>
                
              ))}
            </div>
          ))}
          <div className="flex items-center justify-center mt-4">
            <img src={screenImg} className='max-w-[85%]' alt="" />
          </div>
          
        </div>
        <div className="flex justify-center items-center mt-9">
        <Button
          onClick={handleSave}
          variant='shadow'
          className='bg-indigo-500'
        >
          Save
        </Button>
        </div>
      </div>
    </>
  );
};

export default TheatreSeatLayoutEdit;
