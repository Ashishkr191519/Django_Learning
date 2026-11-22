import api from "../../../api/api";


export const getAllTransactions = async () => {
  const response = await api.get("/all/");
  return response.data;
};
export const addTransactionApi = async (transactionData) => {
  const response = await api.post("/add/", transactionData);
  return response.data;
};
export const deleteTransactionApi = async (id) => {
  await api.delete(`/delete/${id}/`);
};
export const updateTransactionApi = async (id, transactionData) => {
  const response = await api.patch(
    `/update/${id}/`,
    transactionData
  );

  return response.data;
};