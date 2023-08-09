import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  checkInstructor,
  createInstructor,
  fetchLoggedInInstructor,
  fetchLoggedInInstructorOrders,
  signOutInstructor,
} from "./instructorAPI";

const initialState = {
  loggedInInstructor: null,
  instructorInfo: null,
  status: "idle",
  error: null,
};

export const createInstructorAsync = createAsyncThunk(
  "instructor/createInstructor",
  async (instructorData) => {
    const response = await createInstructor(instructorData);

    return response.data;
  }
);

export const checkInstructorAsync = createAsyncThunk(
  "instructor/checkInstructor",
  async (loginInfo, { rejectWithValue }) => {
    try {
      const response = await checkInstructor(loginInfo);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const signOutInstructorAsync = createAsyncThunk(
  "instructor/signOut",
  async (loginInfo) => {
    const response = await signOutInstructor(loginInfo);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchLoggedInInstructorAsync = createAsyncThunk(
  "instructor/fetchLoggedInInstructor",
  async (userId) => {
    const response = await fetchLoggedInInstructor(userId);

    return response.data;
  }
);

export const fetchLoggedInInstructorOrdersAsync = createAsyncThunk(
  "instructor/fetchLoggedInInstructorOrders",
  async (userId) => {
    const response = await fetchLoggedInInstructorOrders(userId);

    return response.data;
  }
);
export const instructorSlice = createSlice({
  name: "instructor",
  initialState,

  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createInstructorAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createInstructorAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInInstructor = action.payload;
      })
      .addCase(checkInstructorAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkInstructorAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInInstructor = action.payload;
      })
      .addCase(checkInstructorAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(signOutInstructorAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signOutInstructorAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInInstructor = null;
      })
      .addCase(fetchLoggedInInstructorAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInInstructorAsync.fulfilled, (state, action) => {
        state.status = "idle";
        // this info can be different or more from logged-in User info
        state.instructorInfo = action.payload;
      });
  },
});

export const { clearError } = instructorSlice.actions;

// export const selectCount = (state) => state.counter.value;
export const selectLoggedInInstructor = (state) =>
  state.instructor.loggedInInstructor;

export const selectInstructorOrders = (state) =>
  state.instructor.instructorInfo.orders;
export const selectInstructorInfo = (state) => state.instructor.instructorInfo;
export const selectError = (state) => state.instructor.error;

export default instructorSlice.reducer;
