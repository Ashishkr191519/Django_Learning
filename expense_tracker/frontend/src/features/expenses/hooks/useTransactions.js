import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTransactionApi,
  getAllTransactions,
  deleteTransactionApi,
  updateTransactionApi,
} from "../api/expenseApi";
import {
  addTransaction,
  setTransactions,
  removeTransaction,
  updateTransaction,
} from "../state/transactionSlice";

const useTransactions = () => {
  const dispatch = useDispatch();

  const transactions = useSelector((store) => store.transactions.transactions);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getAllTransactions();

        dispatch(setTransactions(data));
      } catch (error) {
        console.error("Transaction API Error:", error);
      }
    };

    fetchTransactions();
  }, [dispatch]);

  // CREATE - Add transaction
  const createTransaction = async (transactionData) => {
    try {
      const newTransaction = await addTransactionApi(transactionData);

      dispatch(addTransaction(newTransaction));

      return true;
    } catch (error) {
      console.error("Add Transaction Error:", error);
      return false;
    }
  };
  const deleteTransaction = async (id) => {
    try {
      await deleteTransactionApi(id);

      dispatch(removeTransaction(id));

      return true;
    } catch (error) {
      console.error("Delete Transaction Error:", error);
      return false;
    }
  };
  const editTransaction = async (id, transactionData) => {
    try {
      const updatedTransaction = await updateTransactionApi(
        id,
        transactionData,
      );

      dispatch(updateTransaction(updatedTransaction));

      return true;
    } catch (error) {
      console.error("Update Transaction Error:", error);
      return false;
    }
  };

  return { transactions, createTransaction, deleteTransaction, editTransaction };
};

export default useTransactions;
