import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchBudgets,
  addBudget,
  updateBudget,
  deleteBudget,
} from "../state/budgetSlice";

const useBudgets = (month) => {
  const dispatch = useDispatch();

  const { items, loading, error } = useSelector((state) => state.budgets);

  // Fetch budgets when component mounts or month changes
  useEffect(() => {
    dispatch(fetchBudgets(month));
  }, [dispatch, month]);

  // Create new budget
  const createBudget = async (data) => {
    const result = await dispatch(addBudget(data)).unwrap();

    // Refresh selected month's budgets
    await dispatch(fetchBudgets(month)).unwrap();

    return result;
  };

  // Update existing budget
  const editBudget = async (id, data) => {
    const result = await dispatch(updateBudget({ id, data })).unwrap();

    await dispatch(fetchBudgets(month)).unwrap();

    return result;
  };

  // Delete budget
  const removeBudget = async (id) => {
    await dispatch(deleteBudget(id)).unwrap();

    await dispatch(fetchBudgets(month)).unwrap();

    return true;
  };

  // Manually refresh budgets
  const refreshBudgets = async () => {
    return dispatch(fetchBudgets(month)).unwrap();
  };

  return {
    budgets: items,
    loading,
    error,
    createBudget,
    editBudget,
    removeBudget,
    refreshBudgets,
  };
};

export default useBudgets;
