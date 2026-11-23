import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api/api";


// GET - Fetch categories
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/categories/");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch categories",
      );
    }
  },
);

// POST - Create category
export const addCategory = createAsyncThunk(
  "categories/addCategory",
  async (categoryData, { rejectWithValue }) => {
    try {
      const response = await api.post("/categories/", categoryData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to create category",
      );
    }
  },
);

// PATCH - Update category
export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/categories/${id}/`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to update category",
      );
    }
  },
);

// DELETE - Remove category
export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/categories/${id}/`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to delete category",
      );
    }
  },
);

const categorySlice = createSlice({
  name: "categories",

  initialState: {
    items: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addCategory.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (category) => category.id === action.payload.id,
        );

        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (category) => category.id !== action.payload,
        );
      });
  },
});

export default categorySlice.reducer;
