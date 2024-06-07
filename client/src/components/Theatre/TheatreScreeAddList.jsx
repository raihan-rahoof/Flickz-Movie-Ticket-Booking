import React, { useEffect, useState } from 'react';
import createAxiosInstance from '../../utlis/axiosinstance';
import {
  Card,
  CardBody,
  CardFooter,
  Modal,
  Image,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from '@nextui-org/react';
import toast from 'react-hot-toast';
import axios from 'axios';

function TheatreScreenAddList() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [screens, setScreens] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedScreen, setSelectedScreen] = useState(null);
  const [formData, setFormData] = useState({
    screen_name: '',
    screen_quality: '',
    screen_sound: '',
    screen_image: '',
    rows: 10,
    cols: 10,
    sections: [],
  });
  const axiosInstance = createAxiosInstance('theatre');

  console.log(formData)

  const handleInputChange = (e) => {
    const { name, value, files, type } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSectionChange = (index, e) => {
    const { name, value } = e.target;
    const newSections = [...formData.sections];
    newSections[index] = { ...newSections[index], [name]: value };
    setFormData({ ...formData, sections: newSections });
  };

  const addSection = () => {
    setFormData({
      ...formData,
      sections: [...formData.sections, { name: '', rows: '', price: '' }],
    });
  };

  const removeSection = (index) => {
    const newSections = formData.sections.filter((_, i) => i !== index);
    setFormData({ ...formData, sections: newSections });
  };

  const handleSubmit = async (e) => {
    e.preventDefault;
    const { screen_name, screen_quality, screen_sound, rows, cols, sections, screen_image } = formData;

    const totalSectionRows = sections.reduce((total, section) => total + parseInt(section.rows, 10), 0);

    if (totalSectionRows !== parseInt(rows, 10)) {
      toast.error(`Total rows in sections (${totalSectionRows}) must match the total number of rows specified (${rows}).`);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('screen_name', screen_name);
    formDataToSend.append('screen_quality', screen_quality);
    formDataToSend.append('screen_sound', screen_sound);
    formDataToSend.append('rows', rows);
    formDataToSend.append('cols', cols);
    if (screen_image) {
      formDataToSend.append('screen_image', screen_image);
    }
    formDataToSend.append('sections', JSON.stringify(sections));

    try {
      if (isEditMode) {
        await updateScreen(selectedScreen.id, formDataToSend);
      } else {
        await createScreen(formDataToSend);
      }
      onOpenChange(false);
      fetchScreens();
    } catch (error) {
      toast.error(`Failed to ${isEditMode ? 'update' : 'create'} screen. Please try again.`);
    }
  };

  const createScreen = async (formData) => {
    try {
      const res = await axiosInstance.post('/screen/add-screen/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Screen created successfully');
      console.log('Screen created:', res.data);
    } catch (error) {
      console.log(error);
      throw new Error('Failed to create screen');
    }
  };

  const updateScreen = async (screenId, formData) => {
    try {
      const res = await axiosInstance.put(`/screen/update-screen/${screenId}/`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      toast.success('Screen updated successfully');
      console.log('Screen updated:', res.data);
    } catch (error) {
      console.log(error);
      throw new Error('Failed to update screen');
    }
  };

  const fetchScreens = async () => {
    try {
      const response = await axiosInstance.get('/screen/add-screen/');
      setScreens(response.data);
    } catch (error) {
      toast.error('Failed to fetch screens, please refresh the page.');
    }
  };

  const handleCardClick = (screen) => {
    setSelectedScreen(screen);
    setFormData({
      screen_name: screen.name,
      screen_quality: screen.quality,
      screen_sound: screen.sound,
      rows: screen.rows,
      cols: screen.cols,
      sections: screen.sections,
    });
    setIsEditMode(true);
    onOpen();
  };

  useEffect(() => {
    fetchScreens();
  }, []);

  return (
    <>
      <div className="h-screen p-4 bg-black">
        <div className="flex pb-8 pt-4">
          <h1 className="text-3xl font-semibold">Manage Screens</h1>
        </div>

        <Button className="bg-indigo-500 mb-4" onPress={() => { setIsEditMode(false); setFormData({ screen_name: '', screen_quality: '', screen_sound: '', screen_image: '', rows: 10, cols: 10, sections: [] }); onOpen(); }}>
          Add Screen
        </Button>
        <div className="gap-2 grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
          {screens.length > 0 &&
            screens.map((screen) => (
              <Card key={screen.id} className="" shadow="sm" isPressable onPress={() => handleCardClick(screen)}>
                <CardBody className="overflow-visible p-0">
                  <Image shadow="sm" radius="lg" width="100%" className="w-full object-cover" src={screen.image} />
                </CardBody>
                <CardFooter className="text-small flex flex-col justify-center items-start">
                  <h2 className="text-lg font-bold">{screen.name}</h2>
                  <h3 className="font-bold font-md">{screen.quality}</h3>
                  <p className="text-default-500">{screen.sound}</p>
                  <div className="flex gap-3">
                    {screen.sections.map((section) => (
                      <p key={section.name} className="text-default-500">
                        {section.name}
                      </p>
                    ))}
                  </div>
                </CardFooter>
              </Card>
            ))}
        </div>
      </div>

      <Modal size="2xl" isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center" backdrop="blur">
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">{isEditMode ? 'Edit Screen' : 'Create Your Screen'}</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  labelPlacement="outside"
                  label="Screen name"
                  placeholder="Enter screen name"
                  variant="bordered"
                  name="screen_name"
                  value={formData.screen_name}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  labelPlacement="outside"
                  label="Screen Type"
                  placeholder="e.g., 4k, IMAX, etc."
                  variant="bordered"
                  name="screen_quality"
                  value={formData.screen_quality}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  labelPlacement="outside"
                  label="Sound System"
                  placeholder="e.g., Dolby 3.0, etc."
                  variant="bordered"
                  name="screen_sound"
                  value={formData.screen_sound}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  labelPlacement="outside"
                  label="Number of Rows"
                  placeholder="Enter the number of rows"
                  variant="bordered"
                  type="number"
                  name="rows"
                  value={formData.rows}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  labelPlacement="outside"
                  label="Number of Columns"
                  placeholder="Enter the number of columns"
                  variant="bordered"
                  type="number"
                  name="cols"
                  value={formData.cols}
                  onChange={handleInputChange}
                  required
                />
                <label className="text-sm">Screen image</label>
                <input
                  type="file"
                  name="screen_image"
                  id="file-input"
                  className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4 dark:file:bg-neutral-700 dark:file:text-neutral-400"
                  onChange={handleInputChange}
                />
                <label className="text-sm">Add section</label>
                {formData.sections.map((section, index) => (
                  <div key={index} className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <Input
                      type="text"
                      label="Section Name"
                      size="sm"
                      variant="bordered"
                      name="name"
                      value={section.name}
                      onChange={e => handleSectionChange(index, e)}
                      className="max-w-[10rem]"
                    />
                    <Input
                      type="number"
                      label="Rows"
                      size="sm"
                      variant="bordered"
                      name="rows"
                      value={section.rows}
                      onChange={e => handleSectionChange(index, e)}
                      className="max-w-[10rem]"
                    />
                    <Input
                      type="number"
                      label="Price"
                      size="sm"
                      variant="bordered"
                      name="price"
                      value={section.price}
                      onChange={e => handleSectionChange(index, e)}
                      className="max-w-[10rem]"
                    />
                    <Button color="danger" onPress={() => removeSection(index)}>
                      <i className="fa-solid fa-trash"></i>
                    </Button>
                  </div>
                ))}
                <p className="mt-3 text-start">
                  <button
                    type="button"
                    className="py-1.5 px-2 inline-flex items-center gap-x-1 text-xs font-medium rounded-full border border-dashed border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700"
                    onClick={addSection}
                  >
                    <svg
                      className="flex-shrink-0 size-3.5"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14"></path>
                      <path d="M12 5v14"></path>
                    </svg>
                    Add Section
                  </button>
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleSubmit}>
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

export default TheatreScreenAddList;
