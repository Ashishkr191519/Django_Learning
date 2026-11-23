
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import {
  fetchCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../state/categorySlice";

const useCategories = () => {
  const dispatch = useDispatch();

  const { items, loading, error } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const createCategory = async (data) => {
    return dispatch(addCategory(data)).unwrap();
  };

  const editCategory = async (id, data) => {
    return dispatch(updateCategory({ id, data })).unwrap();
  };

  const removeCategory = async (id) => {
    return dispatch(deleteCategory(id)).unwrap();
  };

  return {
    categories: items,
    loading,
    error,
    createCategory,
    editCategory,
    removeCategory,
  };
};

export default useCategories;
