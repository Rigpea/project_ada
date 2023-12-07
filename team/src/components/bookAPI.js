const fetchTopPodcasts = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/top-books');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        return [];  // Return an empty array on error
    }
};

export default fetchTopPodcasts;