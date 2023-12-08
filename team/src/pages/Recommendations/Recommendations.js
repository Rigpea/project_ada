import React, { useEffect, useState } from 'react';
import fetchArticles from '../../components/newsAPI';
import fetchTopBooks from '../../components/bookAPI'; 
import './Recommendations.css';  // Adjust the import path as needed
import Navbar from "../../components/navbar.js";

const Recommendations = () => {
  const [articles, setArticles] = useState([]);
  const [books, setBooks] = useState([]); // Define state for books
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const articlesResult = await fetchArticles();  // Fetch articles for the US
      setArticles(articlesResult);
      
      const booksResult = await fetchTopBooks();  // Fetch the top books
      setBooks(booksResult);

      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="podcastsandbooks">
    <Navbar/>
      <div className="headerpodcast">
        <h1>Top Ten Best-Selling Books:</h1>
        <div className="recommendations-containerB">
          {loading ? <p>Loading...</p> : (
            <ul>
              {books.map((book, index) => (
                <li key={index}>
                  <h2>{book.title}</h2>
                  <p>{book.description}</p>
                  <p>Author: {book.author}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="header">
        <h1>Top ten headlines:</h1>
        <div className="recommendations-container">
          {loading ? <p>Loading...</p> : (
            <ul>
              {articles.map((article, index) => (
                <li key={index}>
                  <h2>{article.title}</h2>
                  <p>{article.description}</p>
                  <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Recommendations;