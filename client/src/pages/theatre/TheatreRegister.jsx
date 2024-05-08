import React from 'react';

function TheatreRegister() {
  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="max-w-3xl mx-auto p-8 bg-gray-800 rounded-lg shadow-xl flex flex-col md:flex-row">
        <div className="md:w-1/2 pr-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Theatre Information</h2>
          <div className="mb-4">
            <label className="block text-white">Theatre Name</label>
            <input type="text" className="form-input dark rounded-lg bg-[#7b6e6e33] border-gray-300 shadow-md placeholder-text-base focus:scale-105 focus:border-gray-300 focus:bg-white focus:ring focus:ring-gray-200" />
          </div>
          <div className="mb-4">
            <label className="block text-white">Owner Name</label>
            <input type="text" className="form-input dark rounded-lg bg-[#7b6e6e33] border-gray-300 shadow-md placeholder-text-base focus:scale-105 focus:border-gray-300 focus:bg-white focus:ring focus:ring-gray-200" />
          </div>
          <div className="mb-4">
            <label className="block text-white">Theatre Email</label>
            <input type="email" className="form-input dark rounded-lg bg-[#7b6e6e33] border-gray-300 shadow-md placeholder-text-base focus:scale-105 focus:border-gray-300 focus:bg-white focus:ring focus:ring-gray-200" />
          </div>
          <div className="mb-4">
            <label className="block text-white">Theatre Mobile</label>
            <input type="number" className="form-input dark rounded-lg bg-[#7b6e6e33] border-gray-300 shadow-md placeholder-text-base focus:scale-105 focus:border-gray-300 focus:bg-white focus:ring focus:ring-gray-200" />
          </div>
          <div className="mb-4">
            <label className="block text-white">Password</label>
            <input type="password" className="form-input dark rounded-lg bg-[#7b6e6e33] border-gray-300 shadow-md placeholder-text-base focus:scale-105 focus:border-gray-300 focus:bg-white focus:ring focus:ring-gray-200" />
          </div>
          <div className="mb-4">
            <label className="block text-white">Confirm Password</label>
            <input type="password" className="form-input dark rounded-lg bg-[#7b6e6e33] border-gray-300 shadow-md placeholder-text-base focus:scale-105 focus:border-gray-300 focus:bg-white focus:ring focus:ring-gray-200" />
          </div>
        </div>
        <div className="md:w-1/2 ">
          <h2 className="text-2xl font-semibold text-white mb-4">Address Information</h2>
          <div className="mb-4">
            <label className="block text-white">Address</label>
            <input type="text" className="form-input dark rounded-lg bg-[#7b6e6e33] border-gray-300 shadow-md placeholder-text-base focus:scale-105 focus:border-gray-300 focus:bg-white focus:ring focus:ring-gray-200" />
          </div>
          <div className="mb-4">
            <label className="block text-white">State</label>
            <input type="text" className="form-input dark rounded-lg bg-[#7b6e6e33] border-gray-300 shadow-md placeholder-text-base focus:scale-105 focus:border-gray-300 focus:bg-white focus:ring focus:ring-gray-200" />
          </div>
          <div className="mb-4">
            <label className="block text-white">District</label>
            <input type="text" className="form-input dark rounded-lg bg-[#7b6e6e33] border-gray-300 shadow-md placeholder-text-base focus:scale-105 focus:border-gray-300 focus:bg-white focus:ring focus:ring-gray-200" />
          </div>
          <div className="mb-4">
            <label className="block text-white">City</label>
            <input type="text" className="form-input dark rounded-lg bg-[#7b6e6e33] border-gray-300 shadow-md placeholder-text-base focus:scale-105 focus:border-gray-300 focus:bg-white focus:ring focus:ring-gray-200" />
          </div>
          <div className="mb-4">
            <label className="block text-white">Pincode</label>
            <input type="number" className="form-input dark rounded-lg bg-[#7b6e6e33] border-gray-300 shadow-md placeholder-text-base focus:scale-105 focus:border-gray-300 focus:bg-white focus:ring focus:ring-gray-200" />
          </div>
          <div className="mb-4">
            <label className="block text-white">Google Map Link</label>
            <input type="url" className="form-input dark rounded-lg bg-[#7b6e6e33] border-gray-300 shadow-md placeholder-text-base focus:scale-105 focus:border-gray-300 focus:bg-white focus:ring focus:ring-gray-200" />
          </div>

          <button type="submit" className="bg-gradient-to-r from-[#427EF5] to-[#274A8F] text-white mt-4 font-medium py-2 px-4 rounded-md shadow-sm float-end mr-4">Register</button>
          
          
        </div>
        
      </div>
    </div>
  );
}

export default TheatreRegister;
