export const fetchCharacters = async (page = 1) => {
  try {
    const response = await axios.get(`${API_URL}/character`, {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error('Errore nel fetching dei personaggi:', error);
    return { results: [], info: {} };
  }
};
