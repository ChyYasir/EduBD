import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  checkInstructor,
  createInstructor,
  signOutInstructor,
} from "./instructorAPI";

const initialState = {
  loggedInInstructor: null,
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
      });
  },
});

export const { clearError } = instructorSlice.actions;

// export const selectCount = (state) => state.counter.value;
export const selectLoggedInInstructor = (state) =>
  state.instructor.loggedInInstructor;
export const selectError = (state) => state.instructor.error;

export default instructorSlice.reducer;
