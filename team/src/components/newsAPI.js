const fetchArticles = async (query) => {
    try {
        const url = `http://localhost:8080/api/articles`;;
        const response = await fetch(url, { method: "GET" });
        if (!response.ok) {
            throw new Error('HTTP error! Status: ' + response.status);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching articles:', error);
        return []; // Return an empty array on error
    }
};

export default fetchArticles;
