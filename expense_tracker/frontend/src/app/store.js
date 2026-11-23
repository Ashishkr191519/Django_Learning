import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/state/authSlice'
import transactionReducer from '../features/expenses/state/transactionSlice'
import categoryReducer from '../features/categories/state/categorySlice'
import budgetReducer from '../features/Budget/state/budgetSlice'

export const store = configureStore({
  reducer: {
    auth:authReducer,
    transactions: transactionReducer,
    categories: categoryReducer,
     budgets: budgetReducer,
  }
})