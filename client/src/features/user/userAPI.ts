import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_URL } from "../../config/config";

console.log(SERVER_URL)
export const getUserByCookieMain = createAsyncThunk("get-user-by-cookie", async (_, thunkApi) => {
 try {
    const { data } = await axios.get(`${SERVER_URL}/api/user/retrieve/get-user-by-cookie`);
    if (!data) throw new Error("Couldn't receive data from axios GET '/get-user-by-cookie' from: userAPI ");
    const { userData } = data;
    return userData;
  } catch (error: any) {
    console.error(error.response.data.error);
    return thunkApi.rejectWithValue({
      error: error.response.data.error,
      message: error.response.data.error,
    });
  }
 }
);
