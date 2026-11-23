
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api/api";


// GET - Fetch budgets
export const fetchBudgets = createAsyncThunk(
  "budgets/fetchBudgets",
  async (month, { rejectWithValue }) => {
    try {
      const response = await api.get("/budgets/", {
        params: month ? { month } : {},
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch budgets"
      );
    }
  }
);

// POST - Create budget
export const addBudget = createAsyncThunk(
  "budgets/addBudget",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/budgets/", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to create budget"
      );
    }
  }
);

// PATCH - Update budget
export const updateBudget = createAsyncThunk(
  "budgets/updateBudget",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/budgets/${id}/`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to update budget"
      );
    }
  }
);

// DELETE - Remove budget
export const deleteBudget = createAsyncThunk(
  "budgets/deleteBudget",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/budgets/${id}/`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to delete budget"
      );
    }
  }
);

const budgetSlice = createSlice({
  name: "budgets",

  initialState: {
    items: [],
    loading: false,
    error: null,
  },

  reducers: {
    clearBudgets: (state) => {
      state.items = [];
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchBudgets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBudgets.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchBudgets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addBudget.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      .addCase(updateBudget.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (budget) => budget.id === action.payload.id
        );

        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })

      .addCase(deleteBudget.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (budget) => budget.id !== action.payload
        );
      });
  },
});

export const { clearBudgets } = budgetSlice.actions;
export default budgetSlice.reducer;
