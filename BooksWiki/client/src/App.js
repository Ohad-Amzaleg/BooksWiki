// App.js
import React, { useEffect, useState } from 'react';
import BookListing from './BookListing';
import BookDetails from './BookDetails';
import { BrowserRouter as Router, Route, Routes, } from "react-router-dom";
import axios from "axios";
import { AppBar } from "@mui/material";
import FilterOptions from "./FilterOptions";

const App = () => {
    axios.defaults.withCredentials = true;
    const baseURL = "http://localhost:3080";

    const [userId, setUserId] = useState([])
    const [books, setBooks] = useState([]);
    const [badgeReviewers, setBadgeReviewers] = useState({});
    const [badge, setBadge] = useState(false);


    useEffect(() => {
        getUser();
        getBooks();
        getBadgeReviewers();
    }, []);

    useEffect(() => {
        const isBadge = badgeReviewers[userId]?.reviewsNumber > 5;
        console.log(`The badge list chnaged , this is the current status:${isBadge}`);
        setBadge(isBadge);
    }, [badgeReviewers]);


    const getBadgeReviewers = () => {
        axios.get(`${baseURL}/usersData`)
            .then((response) => setBadgeReviewers(response.data.UsersData))
            .catch((error) => console.error(error));
    }


    const getBooks = () => {
        axios.get(`${baseURL}/books`)
            .then((response) => setBooks(response.data.Books))
            .catch((error) => console.error(error));
    }

    const postBook = (title, author, publicationYear, description) => {
        axios.post(`${baseURL}/books`, {
            book: { title, author, publicationYear, description }
        }, {
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            setBooks([...books, response.data.book])
        }).catch(error => {
            console.log(error)
        });

    }

    const getUser = () => {
        axios.get(`${baseURL}/user`).then((response) => {
            setUserId(response.data.id);
        }).catch(error => {
            console.log(error)
        });
    }


    const postReview = (bookId, userName, userContent, userRating) => {
        axios.post(`${baseURL}/reviews`, {
            review: { bookId, userName, userContent, userRating }
        }, {
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            if (!badgeReviewers[userId]?.userBooks.includes(bookId)) {
                getBadgeReviewers();
            }
        }).catch(error => {
            console.log(error)
        });

    }


    const handleFilterChange = (publicationYear, rating, searchTerm) => {
        const params = [];
        if (searchTerm) {
            params.push(`search=${searchTerm}`)
        }

        if (publicationYear) {
            params.push(`after=${publicationYear[0]}&before=${publicationYear[1]}`)

        }
        if (rating) {
            params.push(`rating=${rating}`)
        }

        let url = `${baseURL}/books${params ? `?${params.join('&')}` : ``}`;
        axios.get(url)
            .then((response) => {
                setBooks(response.data.Books)
            })
            .catch((error) => console.error(error));
    }

    const renderToolBar = () => {
        return (
            <AppBar position="sticky" color='inherit'>
                <FilterOptions
                    handleFilterChange={handleFilterChange}
                />
            </AppBar>
        );
    }

    return (
        <div className="App">
            {renderToolBar()}
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <BookListing
                                books={books}
                                postBook={postBook}
                                showTopReviewerBadge={badge} />
                        }
                    />
                    <Route
                        path="/book/:bookId"
                        element={
                            <BookDetails
                                postReview={postReview}
                            />
                        }
                    />
                </Routes>
            </Router>
        </div>
    );
};

export default App;

