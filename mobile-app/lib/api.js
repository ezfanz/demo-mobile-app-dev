import axios from 'axios';

const API_BASE_URL = 'http://192.168.100.9:8000/api/v1'; 

export const getMovies = async () => {
  const response = await axios.get(`${API_BASE_URL}/movies`);
  return response.data;
};

export const getMovieById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/movies/${id}`);
  return response.data.data; 
};

export const getSeats = async () => {
  const response = await axios.get(`${API_BASE_URL}/seats`);
  return response.data.data; 
};
