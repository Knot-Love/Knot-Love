import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa6';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';

const RegisterModal = ({ onClose, setShowLoginModal }) => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const validValue = Object.values(data).every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      toast.error('Password and Confirm Password must be the same');
      return;
    }

    try {
      const response = await Axios({
        ...SummaryApi.register,
        data
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        setData({
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
        });

        onClose(); // Close register modal
        setShowLoginModal(true); // ✅ Automatically open login modal
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
      <div className='bg-white p-6 rounded-lg w-96 relative'>
        <h2 className='text-xl font-semibold text-center mb-4'>Welcome To Knot&Love</h2>
        <button
          onClick={onClose}
          className='absolute top-2 right-2 text-xl text-gray-500 hover:text-black'
        >
          &times;
        </button>
        <form className='grid gap-4' onSubmit={handleSubmit}>
          <div className='grid gap-1'>
            <label htmlFor='name'>Name :</label>
            <input
              type='text'
              id='name'
              className='bg-blue-50 p-2 border rounded outline-none focus:border-primary-200'
              name='name'
              value={data.name}
              onChange={handleChange}
              placeholder='Enter your name'
              autoFocus
            />
          </div>
          <div className='grid gap-1'>
            <label htmlFor='email'>Email :</label>
            <input
              type='email'
              id='email'
              className='bg-blue-50 p-2 border rounded outline-none focus:border-primary-200'
              name='email'
              value={data.email}
              onChange={handleChange}
              placeholder='Enter your email'
            />
          </div>
          <div className='grid gap-1'>
            <label htmlFor='password'>Password :</label>
            <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200'>
              <input
                type={showPassword ? 'text' : 'password'}
                id='password'
                className='w-full outline-none'
                name='password'
                value={data.password}
                onChange={handleChange}
                placeholder='Enter your password'
              />
              <div onClick={() => setShowPassword((prev) => !prev)} className='cursor-pointer'>
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
          </div>
          <div className='grid gap-1'>
            <label htmlFor='confirmPassword'>Confirm Password :</label>
            <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200'>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id='confirmPassword'
                className='w-full outline-none'
                name='confirmPassword'
                value={data.confirmPassword}
                onChange={handleChange}
                placeholder='Confirm your password'
              />
              <div onClick={() => setShowConfirmPassword((prev) => !prev)} className='cursor-pointer'>
                {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
          </div>

          <button
            disabled={!validValue}
            className={`${validValue ? 'bg-cyan-800 hover:bg-cyan-700' : 'bg-gray-500'} text-white py-2 rounded font-semibold tracking-wide`}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
