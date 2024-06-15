import React, { useEffect, useState } from 'react';
import createAxiosInstance from '../../../utlis/axiosinstance';
import toast from 'react-hot-toast';
import Navbar from '../../../components/users/Navbar';
import { Card, CardHeader, CardBody, Image, CardFooter } from "@nextui-org/react";
import formatDateString from '../../../utlis/Dateformat';
import formatTime12Hour from '../../../utlis/formatTime12';
import { Link } from 'react-router-dom';

function TicketDetails() {
  const [bookings, setBookings] = useState([]);
  const axiosInstance = createAxiosInstance('user');

  const fetchBookings = async () => {
    try {
      const response = await axiosInstance.get('/booking/show-tickets/');
      if (response.status === 200) {
        setBookings(response.data);
      } else {
        toast.error('Error fetching details. Please refresh the page.');
      }
    } catch (error) {
      console.log(error);
      toast.error('Error fetching details. Please refresh the page.');
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <>
      <Navbar />
      <div className="h-screen p-5 mt-6">
        <div className="gap-2 grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
          {bookings.map((item, index) => (
            <Link
              to={`/tickets/details/${item.id}`}
              state={{ booking: item }}
              key={index}
            >
              <Card className="py-4 cursor-pointer">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                  <p className="text-md uppercase font-bold">{item.show.theatre_details.theatre_name}</p>
                  <p className="text-md">{item.show.show_name}</p>
                  <p className="text-md">{formatDateString(item.show.date)}</p>
                  <p className="text-md">{formatTime12Hour(item.show.start_time)} - {formatTime12Hour(item.show.end_time)}</p>
                  <p className="text-md">{item.show.screen.name}</p>
                  <h4 className="font-bold text-large">{item.show.movie.title}</h4>
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                  <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src={item.show.movie.poster}
                    width={270}
                  />
                </CardBody>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default TicketDetails;
