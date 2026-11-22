import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTransactions } from "../api/expenseApi";
import { setTransactions } from "../state/transactionSlice";

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

  return { transactions };
};

export default useTransactions;
