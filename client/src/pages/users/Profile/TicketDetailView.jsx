import React from 'react';
import { useLocation } from 'react-router-dom';
import formatDateString from '../../../utlis/Dateformat';
import formatTime12Hour from '../../../utlis/formatTime12';
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";

const TicketDetailPage = () => {
  const location = useLocation();
  const { booking } = location.state || {};

  if (!booking) {
    return <div>No booking details available.</div>;
  }

  return (
    <div>
      <h1>Booking Details</h1>
      <p>Theatre: {booking.show.theatre_details.theatre_name}</p>
      <p>Show Name: {booking.show.show_name}</p>
      <p>Date: {formatDateString(booking.show.date)}</p>
      <p>Time: {formatTime12Hour(booking.show.start_time)} - {formatTime12Hour(booking.show.end_time)}</p>
      <p>Screen: {booking.show.screen.name}</p>
      <h4>Movie: {booking.show.movie.title}</h4>
      <img src={booking.show.movie.poster} alt="Movie Poster" />
    </div>
  );
};

export default TicketDetailPage;
