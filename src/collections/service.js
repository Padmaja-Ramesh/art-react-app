const API_BASE_URL = 'https://api.artic.edu/api/v1/artworks';

const apiService = {
  async fetchColletions() {
    const response = await fetch(`${API_BASE_URL}?fields=id,title,image_id,thumbnail&limit=25`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  },

  async fetchCollectionDetails (title){
    const detailResponse = await fetch(`${API_BASE_URL}/${title}`);
    if (!detailResponse.ok) throw new Error("Failed to fetch collection details");

    return await detailResponse.json();
  }
};

export default apiService;