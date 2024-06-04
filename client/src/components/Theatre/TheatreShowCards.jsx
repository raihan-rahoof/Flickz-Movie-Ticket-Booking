import React, { useEffect, useState } from 'react';
import {
  Card,
  CardBody,
  DateInput,
  TimeInput,
  Select,
  SelectItem,
  CardFooter,
  Image,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from '@nextui-org/react';
import axios from 'axios';
import toast from 'react-hot-toast';

function TheatreShowCards() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [shows,setShows]=useState([])
  const [movieList, setMovieList] = useState([]);
  const [formData, setFormData] = useState({
    show_name: '',
    movie: null,
    screen: '',
    date:null,
    start_time: null,
    end_time: null,
  });
  

  const handleInputChange = (field, value) => {
    
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const handleSave = async () => {
  try {
    
    const simplifiedFormData = {
      show_name: formData.show_name,
      movie:  formData.movie , 
      screen: formData.screen,
      date: formData.date,
      start_time: formData.start_time,
      end_time: formData.end_time,
    };

    console.log(simplifiedFormData);

    const response = await axios.post('http://localhost:8000/api/v1/theatre/shows/', simplifiedFormData);
    if (response.status === 201) {
      toast.success('New Show Added');
      onOpenChange();
    } else {
      toast.error('Please Try again One more time');
    }
  } catch (error) {
    console.log(error);
    toast.error('Failed to add show. Please try again.');
  }
};


  const handleMovieSelect = (movie) => {
    const movieId = movie.id
    setFormData((prevFormData) => ({
      ...prevFormData,
      movie: movieId,
    }));
  };

  useEffect(() => {
    fetchMovies();
    fetchShows();
  }, [shows]);

  const fetchMovies = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/theatre/view-movies');
      setMovieList(response.data);
    } catch (error) {
      toast.error('Failed to fetch movies, please refresh the page.');
    }
  };

  const fetchShows = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/theatre/shows/list/');
      setShows(response.data);
    } catch (error) {
      toast.error('Failed to fetch shows, please refresh the page.');
    }
  };

  

  

  return (
    <>
      <div className="h-screen p-4 bg-black">
        <Button className="bg-indigo-500 mb-4" onPress={onOpen}>
          Shows +
        </Button>
        <div className="gap-2 grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
          {shows.length > 0 && (
            <>
              {shows.map((show) => (
                <Card key={show.id} className='' shadow="sm" isPressable onPress={() => console.log('item pressed')}>
                  <CardBody className="overflow-visible  p-0">
                    <Image shadow="sm" radius="lg" width="100%" className="w-full object-cover " src={show.movie.poster} />
                  </CardBody>
                  <CardFooter className="text-small flex flex-col justify-center items-start">
                    <h2 className='text-lg font-bold'>{show.show_name}</h2>
                    <h3 className="font-bold font-md">{show.movie.title}</h3>
                    <p className="text-default-500">Language : {show.movie.language}</p>
                    <p className="text-default-500">Date : {show.date}</p>
                    <p className="text-default-500">{show.start_time} - {show.end_time}</p>

                  </CardFooter>
                </Card>
              ))}
            </>
)}
        </div>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center" backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Add Show</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  labelPlacement="outside"
                  label="Show name"
                  placeholder="Enter show name"
                  variant="bordered"
                  value={formData.show_name}
                  onChange={(e) => handleInputChange('show_name', e.target.value)}
                  required
                />

                <Select
                  label="Movie"
                  placeholder="Select a movie"
                  labelPlacement="outside"
                  required
                >
                  {movieList.length > 0 &&
                    movieList.map((movie) => (
                      <SelectItem key={movie.id} textValue={movie.title} onClick={(e)=>handleMovieSelect(movie)}>
                        <div className="flex gap-2 items-center">
                          <Image isZoomed width={80} alt="NextUI Fruit Image with Zoom" src={movie.poster} />
                          <div className="flex flex-col">
                            <span className="text-small">{movie.title}</span>
                            <span className="text-tiny text-default-400">{movie.language}</span>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                </Select>

                <Select
                  label="Screen"
                  labelPlacement="outside"
                  placeholder="Select the Screen available"
                  onChange={(e) => {handleInputChange('screen', e.target.value);}}
                  required
                >
                  <SelectItem value="Screen 1">Screen 1</SelectItem>
                  <SelectItem value="Screen 2">Screen 2</SelectItem>
                  <SelectItem value="Screen 3">Screen 3</SelectItem>
                </Select>

                <div className="mb-4">
                    <label htmlFor="release_date" className="block text-white text-sm">Show Date</label>
                    <input type="date" id="release_date" onChange={(e) => handleInputChange('date', e.target.value)} name="date"  className="w-full text-white text-sm rounded-md px-3 py-2" />
                </div>


                <Input
                  
                  labelPlacement="outside"
                  label="Start time"
                  placeholder="Enter start time"
                  variant="bordered"
                  value={formData.start_time}
                  onChange={(e) => handleInputChange('start_time', e.target.value)}
                  required
                />
                <Input
                 
                  labelPlacement="outside"
                  label="End Time"
                  placeholder="Enter end time"
                  variant="bordered"
                  value={formData.end_time}
                  onChange={(e) => handleInputChange('end_time', e.target.value)}
                  required
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleSave}>
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default TheatreShowCards;
