import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

const initialState = {
  data: null,
  status: "loading",
};

export const fetchAuth = createAsyncThunk("auth/fetchAuth", async (obj, { rejectWithValue }) => {
  try {
    const { data } = await axios.post("/auth/login", obj);
    console.log(data);
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async (obj, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/auth/register", obj);
      console.log(data);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async () => {
  const { data } = await axios.get("/auth/me");
  return data;
});

export const fetchAuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
      state.status = "loading";
    },
  },
  extraReducers: (builder) => {
    //AUTH USER
    builder.addCase(fetchAuth.pending, (state) => {
      state.data = null;
      state.status = "loading";
    });
    builder.addCase(fetchAuth.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    });
    builder.addCase(fetchAuth.rejected, (state, action) => {
      state.data = null;
      state.status = "loading";
    });
    //REGISTER USER
    builder.addCase(fetchRegister.pending, (state) => {
      state.data = null;
      state.status = "loading";
    });
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    });
    builder.addCase(fetchRegister.rejected, (state, action) => {
      state.data = null;
      state.status = "loading";
    });
    //GET USER ME
    builder.addCase(fetchAuthMe.pending, (state) => {
      state.data = null;
      state.status = "loading";
    });
    builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    });
    builder.addCase(fetchAuthMe.rejected, (state) => {
      state.data = null;
      state.status = "loading";
    });
  },
});

export const isAuthSelect = (state) => Boolean(state.user.data);
export const { logout } = fetchAuthSlice.actions;

export default fetchAuthSlice.reducer;
