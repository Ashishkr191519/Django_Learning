import api from '../../../api/api'

export const sendChatMessage = async (query) => {
  const response = await api.post("/ai/chat/", {
    query: query,
  });

  return response.data;
};
