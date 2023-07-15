import axios from "axios";
import { SERVER_URL } from "../config/config";

export const newBooking = async (data: any) => {
  try {
  const res: any = await axios.post(`${SERVER_URL}/api/booking`, { movie: data.movie, seatNumber: data.seatNumber, date: data.date, user: data.userID })
    .catch((err: any) => console.log(err.response.data.error));

  if (res.status !== 200 && res.status !== 201) {
    return console.log("Unexpected Error");
  }
  const resData = await res.data;
  return resData;
} catch (error: any) {
  console.error(error.response.data.error);
}
}

export async function getAllMovies() {
  try {
    const { data } = await axios.get(`${SERVER_URL}/api/movie`);
    return data;
  } catch (error: any) {
    console.error(error.response.data.error);
  }
}

export async function getMovieDetails(id: any) {
  try {
    const { data } = await axios.get(`${SERVER_URL}/api/movie/${id}`);
    return data;
  } catch (error: any) {
    console.error(error.response.data.error);
  }
}





