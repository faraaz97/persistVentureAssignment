import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // Default search term
    const [selectedBook, setSelectedBook] = useState(null);

    // Fetch books based on search term
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/books?q=${searchTerm}`);
                setBooks(response.data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };
        fetchBooks();
    }, [searchTerm]); // Runs when searchTerm changes

    return (
        <div className="App">
            <h1>📚 Book Buddy</h1>

            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search for books..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-bar"
            />

            {/* Book Grid */}
            <div className="book-grid">
                {books.map((book) => (
                    <div 
                        className="book-card" 
                        key={book.id} 
                        onClick={() => setSelectedBook(book)}
                    >
                        <img 
                            src={book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150'}
                            alt={book.volumeInfo.title} 
                        />
                        <h2>{book.volumeInfo.title}</h2>
                    </div>
                ))}
            </div>

            {/* Modal for Book Details */}
            {selectedBook && (
                <div className="modal-overlay" onClick={() => setSelectedBook(null)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={() => setSelectedBook(null)}>✖</button>
                        <img 
                            src={selectedBook.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150'} 
                            alt={selectedBook.volumeInfo.title} 
                        />
                        <h2>{selectedBook.volumeInfo.title}</h2>
                        <p>{selectedBook.volumeInfo.description || 'No description available.'}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
