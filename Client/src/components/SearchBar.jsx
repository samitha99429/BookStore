import React, { useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';

const App = () => {
  const [books, setBooks] = useState([]);

  const handleSearch = async (query) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/books/search`, {
        params: { query },
      });
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
      alert('Failed to fetch books. Please try again later.');
    }
  };

  console.log('Passing handleSearch to Navbar:', handleSearch);

  return (
    <div>
      <Navbar
        isAuthenticated={true}
        onLogout={() => console.log('Logged out')}
        onSearch={handleSearch} 
      />
      <div>
        <h1>Search Results</h1>
        {books.length > 0 ? (
          <ul>
            {books.map((book) => (
              <li key={book.id}>{book.volumeInfo.title}</li>
            ))}
          </ul>
        ) : (
          <p>No books found</p>
        )}
      </div>
    </div>
  );
};

export default App;
