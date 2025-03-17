function getCollections() {
    const url = "https://api.artic.edu/api/v1/artworks?fields=id,title,artist_display,date_display,main_reference_number,thumbnail&limit=25";
    try {
        fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json(); 
            } else {
                throw new Error('Network response was not ok'); 
            }
        })
        .then(data => {console.log(data); return data;})
        .catch(error => console.error('There was a problem with the fetch operation:', error));
    } catch (error) {
      console.error(error.message);
    }
  }
  export { getCollections };