import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactions: [],
  loading: false,
  error: null,
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,

  reducers: {
    setTransactions: (state, action) => {
      state.transactions = action.payload;
    },

    addTransaction: (state, action) => {
      state.transactions.push(action.payload);
    },

    removeTransaction: (state, action) => {
      state.transactions = state.transactions.filter(
        (transaction) => transaction.id !== action.payload,
      );
    },
    updateTransaction: (state, action) => {
      const updatedTransaction = action.payload;

      const index = state.transactions.findIndex(
        (transaction) => transaction.id === updatedTransaction.id,
      );

      if (index !== -1) {
        state.transactions[index] = updatedTransaction;
      }
    },
  },
});

export const { setTransactions, addTransaction, removeTransaction,updateTransaction } =
  transactionSlice.actions;

export default transactionSlice.reducer;
