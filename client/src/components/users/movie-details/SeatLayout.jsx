import React, { useState } from 'react';
import seatImg from '../../../../public/images/seat.svg';
import selectedSeatImg from '../../../../public/images/selectedImg.svg';
import screenImg from '../../../../public/images/screen.png';
import { Button,Chip } from '@nextui-org/react';

function SeatLayout({ show }) {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (seatId) => {
    setSelectedSeats(prevSelectedSeats => {
      if (prevSelectedSeats.includes(seatId)) {
        return prevSelectedSeats.filter(seat => seat !== seatId);
      } else {
        return [...prevSelectedSeats, seatId];
      }
    });
  };

  const getSeatNumber = (sectionIndex, rowIndex, colIndex) => {
    const rowLetter = String.fromCharCode(65 + rowIndex + sectionIndex * 4); // Adjust based on section index
    return `${rowLetter}${colIndex + 1}`;
  };

  const calculateTotalPrice = () => {
    return selectedSeats.reduce((total, seatId) => {
      for (const section of show.screen.sections) {
        for (const seat of section.seats) {
          if (seat.id === seatId) {
            return total + parseFloat(section.price);
          }
        }
      }
      return total;
    }, 0);
  };

  if (!show || !show.screen || !show.screen.sections) {
    return <div className='w-full h-screen flex justify-center items-center '><h1>Loading...</h1></div>; // or any other loading/error message
  }

  return (
    <>
      <div className='bg-[black] p-4 flex flex-col justify-center items-center'>
        <div className='flex items-center justify-center font-semibold text-2xl mt-20'>
          <h1>Select Your Seats</h1>
        </div>
        <div className='grid gap-2 flex-row items-center mt-8 justify-center'>
          {show.screen.sections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <div className="flex justify-center items-center mb-2">
              <Chip size='sm' className=''   >{section.name} ${section.price} </Chip>
              </div>
              {show.screen.layout.slice(sectionIndex * section.rows, (sectionIndex + 1) * section.rows).map((row, rowIndex) => (
                <div key={rowIndex} className='flex items-center justify-center'>
                  {row.map((seatId, colIndex) => (
                    <React.Fragment key={colIndex}>
                      {seatId === null ? (
                        <div className='w-8 h-8 mr-2' />
                      ) : (
                        <img
                          src={selectedSeats.includes(seatId) ? selectedSeatImg : seatImg}
                          onClick={() => handleSeatClick(seatId)}
                          className='w-8 h-8 mr-2 cursor-pointer'
                          alt={`Seat ${getSeatNumber(sectionIndex, rowIndex, colIndex)}`}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              ))}
            </div>
          ))}
          <div className="flex items-center justify-center mt-4">
            <img src={screenImg} className='max-w-[85%]' alt="Screen" />
          </div>
        </div>
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-700 to-blue-800 w-full flex rounded-xl relative top-20 justify-between items-center p-4">
          <div>
            <h3 className='text-lg font-semibold'>{show.theatre_details.theatre_name}</h3>
            <h3 className=''><i className="fa-solid fa-film"></i> {show.movie.title}</h3>
            <h3 className='text-sm'><i className="fa-solid fa-tv"></i> {show.screen.quality}</h3>
            <h3 className='text-sm'><i className="fa-solid fa-location-dot"></i> {show.theatre_details.city}, {show.theatre_details.district}</h3>
          </div>
          <div>
            <h3 className='text-lg font-semibold'>Seats</h3>
            <p>{selectedSeats.map(seatId => {
              for (const section of show.screen.sections) {
                for (const seat of section.seats) {
                  if (seat.id === seatId) {
                    return getSeatNumber(show.screen.sections.findIndex(s => s.seats.includes(seat)), seat.row_number, seat.column_number);
                  }
                }
              }
              return '';
            }).join(', ')}</p>
          </div>
          <div>
            <h3 className='text-lg font-semibold'>Total</h3>
            <p>${calculateTotalPrice().toFixed(2)}</p>
          </div>
          <div>
            <Button variant='bordered' color=''>Book tickets</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SeatLayout;
