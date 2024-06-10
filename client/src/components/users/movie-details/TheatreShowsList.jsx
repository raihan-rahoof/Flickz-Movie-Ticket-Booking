import React, { useState, useEffect } from 'react';
import createAxiosInstance from '../../../utlis/axiosinstance';
import { toast } from 'react-toastify';
import formatTime12Hour from '../../../utlis/formatTime12';
import formatDateString from '../../../utlis/Dateformat';

function TheatreShowsList({ movie_id }) {
  const [shows, setShows] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTheatres, setFilteredTheatres] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');

  const axiosInstance = createAxiosInstance('theatre');

  const fetchShows = async () => {
    try {
      const res = await axiosInstance.get(`/theatre/movies/${movie_id}/available-shows/`);
      setShows(res.data);
      setFilteredTheatres(res.data);
    } catch (error) {
      toast.error('There was an error fetching the shows!');
      console.log(error);
    }
  };

  useEffect(() => {
    fetchShows();
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 0) {
      const filtered = shows.filter(show =>
        show.theatre_details.theatre_name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredTheatres(filtered);
    } else {
      setFilteredTheatres(shows);
    }
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);

    if (date) {
      const filtered = shows.filter(show =>
        new Date(show.date).toISOString().slice(0, 10) === new Date(date).toISOString().slice(0, 10)
      );
      setFilteredTheatres(filtered);
    } else {
      setFilteredTheatres(shows);
    }
  };

  const groupShowsByTheatreAndDate = (shows) => {
    const groupedShows = {};

    shows.forEach(show => {
      const theatreName = show.theatre_details.theatre_name;
      const date = show.date;

      if (!groupedShows[theatreName]) {
        groupedShows[theatreName] = {};
      }

      if (!groupedShows[theatreName][date]) {
        groupedShows[theatreName][date] = [];
      }

      groupedShows[theatreName][date].push(show);
    });

    console.log("Grouped Shows:", groupedShows); // Debugging log
    return groupedShows;
  };

  const groupedShows = groupShowsByTheatreAndDate(filteredTheatres);

  return (
    <>
      <div className="flex flex-col justify-center container h-screen mx-auto p-4">
        <div className="flex justify-center items-center text-center mb-6">
          <div>
            <h3 className="text-3xl font-semibold mb-2">Search Theatre</h3>
            <input
              type="text"
              placeholder="Search Theatres"
              value={searchQuery}
              onChange={handleSearchChange}
              className="rounded-full px-4 py-2 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
        </div>

        <div className="mb-6">
          <div className="flex space-x-2 justify-start bg-slate-400 rounded-md pt-2 pb-2 pl-8">
            <button
              onClick={() => handleDateClick('')}
              className='bg-gray-700 text-white px-4 py-2 rounded'
            >
              All
            </button>
            {[...new Set(shows.map(show => show.date))].map(date => (
              <button
                key={date}
                onClick={() => handleDateClick(date)}
                className={`bg-gray-700 text-white px-4 py-2 rounded ${selectedDate === date ? 'bg-blue-700' : ''}`}
              >
                {formatDateString(date)}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4 bg-green-300 p-8 rounded-lg">
          {Object.keys(groupedShows).map(theatreName => (
            Object.keys(groupedShows[theatreName]).map(date => (
              <div key={`${theatreName}-${date}`} className="bg-gray-800 rounded-lg p-4 mb-4">
                <h2 className="text-xl font-semibold mb-2">{theatreName} : {groupedShows[theatreName][date][0].theatre_details.city}</h2>
                <div className="flex">
                  <h3 className=""><i className="fa-solid fa-tv"></i> {groupedShows[theatreName][date][0].screen.quality}</h3>
                  <p className="text-default-500 ml-2"><i className="fa-solid fa-volume-low"></i> {groupedShows[theatreName][date][0].screen.sound}</p>
                </div>
                <div className="flex gap-2 flex-wrap mt-2">
                  {groupedShows[theatreName][date].map(show => (
                    <button key={show.id} className="bg-gray-700 text-white px-4 py-2 rounded mb-2">
                      {formatTime12Hour(show.start_time)} - {formatTime12Hour(show.end_time)}
                    </button>
                  ))}
                </div>
              </div>
            ))
          ))}
        </div>
      </div>
    </>
  );
}

export default TheatreShowsList;
